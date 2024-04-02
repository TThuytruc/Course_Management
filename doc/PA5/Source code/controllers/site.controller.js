const Account = require('../models/account.m');
const User = require('../models/users.m')
const db = require('../database/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const maxAge = 60*60*1000;
const createToken = (user_id) => {
    return jwt.sign({ user_id }, 'mySecretKey', {
        expiresIn: maxAge
    })
}

class SiteController {
    async login_post(req, res) {
        const { account_email, account_password } = req.body;
        const accounts = await Account.getAll();
        const account = accounts.find((acc) => acc.account_email === account_email)
        var response = null;
        if (account) {
            let auth = false 
            if (account.account_password === '123') {
                if (account_password === '123') {
                    auth = true;
                }
                else {
                    auth = false
                }
            }
            else { 
                if (await bcrypt.compare(account_password, account.account_password)) {
                    auth = true;
                }
                else {
                    auth = false;
                }
            }
            if (auth) { 
                const user = await db.getUserWithAccountId(account.account_id)
                const token = createToken(user.user_id); 
                res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge })
                req.session.user_id = user.user_id; 
                res.json(user);
            }
            else {
                response = { account_email: '', account_password: 'Wrong password' };
                res.json(response);
            }
        }
        else {
            response = { account_email: 'Wrong email', account_password: '' };
            res.json(response);

        }
    }
    login_get(req, res) {
        res.render('login');
    }
    logout_get(req, res) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/login')
    }
    async password_change_get(req, res) {
        const user_id = req.session.user_id;
        const user = await User.getAccount(user_id);
        res.render('password_change', {username: user[0].user_name});
    }
    async password_change_post(req, res) {
        try {
            const user_id = req.session.user_id;
            let account = await Account.getCondition('account_id', user_id);
            account = account[0];
            const { currentPassword, newPassword, confirmNewPassword } = req.body;
            let isHashedPassword = account.account_password !== '123';
            let regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;

            if (!isHashedPassword && currentPassword !== '123') {
                res.json({ currentPassword: 'Wrong current password!', newPassword: '', confirmNewPassword: '' })
            }
            else if (isHashedPassword && !await bcrypt.compare(currentPassword, account.account_password)) {
                res.json({ currentPassword: 'Wrong current password!', newPassword: '', confirmNewPassword: '' })
            }
            else if (!newPassword.match(regex) || newPassword === currentPassword) {
                res.json({ currentPassword: '', newPassword: 'New password has at least 6 letters, including at least one number, one character and being different from current password', confirmNewPassword: '' })

            }
            else if (confirmNewPassword !== newPassword) {
                res.json({ currentPassword: '', newPassword: '', confirmNewPassword: 'Confirm wrong password!' });

            }
            else { 
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                account.account_password = hashedPassword;
                await Account.update(account);
                res.json({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
            }

        } catch (e) {
            throw e;
        }
    }
}

module.exports = new SiteController;