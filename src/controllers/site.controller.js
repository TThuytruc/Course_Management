const Account = require('../models/account.m');
const db = require('../database/db');
class SiteController {
    async login_post(req, res, next) {
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
                res.json(user);
            }
        }
        else {
            response = { account_email: 'Wrong email', account_password: ''};
             res.json(response);

        }
    }
    login_get(req, res ,next) {
        res.render('login');
    }
    logout_get() {

    }
}
module.exports = new SiteController;