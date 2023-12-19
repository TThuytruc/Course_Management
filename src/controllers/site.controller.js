const Account = require('../models/account.m');
const db = require('../database/db');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const maxAge = 60 * 60 * 1000;
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
        // console.log('account', account);
        // console.log('req.body', req.body);
        var response = null;
        if (account) {
            let auth = false //
            if (account.account_password === '123') {
                if (account_password === '123') {
                    auth = true;
                }
                else {
                    auth = false
                }
            }
            else { //Changed password more than once
                if (await bcrypt.compare(account_password, account.account_password)) {
                    auth = true;
                }
                else {
                    auth = false;
                }
            }
            if (auth) { //Đúng tài khoản mật khẩu
                const user = await db.getUserWithAccountId(account.account_id)
                const token = createToken(user.user_id);
                // console.log('token', token);    
                res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge })
                req.session.user_id = user.user_id; //assign session then bring it to auth.middlware
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
        // console.log('req.session.user_id', req.session.user_id);

        res.render('password_change');
    }
    async password_change_post(req, res) {
        try {
            const user_id = req.session.user_id;
            const account = await db.getAccountWithId(user_id);
            // console.log(account);
            // console.log(req.body);
            const { currentPassword, newPassword, confirmNewPassword } = req.body;

            let isHashedPassword = account.account_password !== '123';
            console.log('isHashedPassword', isHashedPassword);

            //The first time changepassword
            let regex = /^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$/;
            // (?=.*[0-9]): This part asserts that somewhere in the string (.*) there must be at least one digit ([0-9]).

            // (?=.*[a-zA-Z]): This part asserts that somewhere in the string (.*) there must be at least one character, which can be any letter (lowercase or uppercase) ([a-zA-Z]).
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
            else { //Authenticated
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