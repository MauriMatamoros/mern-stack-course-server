const passport = require('passport')

module.exports = (app) => {
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )
    
    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/api/v1/logout', (req, res) => {
        req.logout()
        res.send(req.user)
    })

    app.get('/api/v1/current_user', (req, res) => {
        res.send(req.user)
    })
}
