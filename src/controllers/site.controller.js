const Account = require('../models/account.m');
const db = require('../database/db');
const jwt = require('jsonwebtoken')


const maxAge =  3*24*60*60*1000;
const createToken = (user_id) => {
    return jwt.sign({user_id}, 'mySecretKey', {
        expiresIn: maxAge
    })
}
class SiteController {
    async login_post(req, res) {
        const { account_email, account_password } = req.body;
        const accounts = await Account.getAll();
        const account = accounts.find((acc) => acc.account_email === account_email )
        // console.log('account', account);
        // console.log('req.body', req.body);
        var response = null;
        if (account) {
            if (account.account_password !== account_password){
                response = { account_email: '', account_password: 'Wrong password'};
                res.json(response);
            }
            else { //Đúng tài khoản mật khẩu
                const user = await db.getUserWithAccountId(account.account_id)
                const token = createToken(user.user_id);
                // console.log('token', token);    
                res.cookie('jwt', token, {httpOnly: false, maxAge: maxAge})
                res.json(user);
            }
        }
        else {
            response = { account_email: 'Wrong email', account_password: ''};
             res.json(response);

        }
    }
    login_get(req, res) {
        res.render('login');
    }
    logout_get(req, res) {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/login')
    }
}
module.exports = new SiteController;