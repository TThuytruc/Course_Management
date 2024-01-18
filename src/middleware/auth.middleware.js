const jwt = require('jsonwebtoken')

module.exports = {
    requireAuth: (req, res, next) => {
        const token = req.cookies.jwt;
        if (req.url === '/login') {
            next();
        }
        else if (token) {
            jwt.verify(token, 'mySecretKey', (err, decodedToken) => {
                req.session.user_id = decodedToken.user_id;
                if (err) {
                    console.log(err.message)
                    res.redirect('/login')
                } else {
                    next();
                }
            })
        }
        else {
            res.redirect('/login');
        }
    }
}