const mongoose = require('mongoose')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mail = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = (app) => {
    app.get('/api/v1/surveys/thanks', (req, res) => {
        res.send('Thanks for voting!')
    })
    app.post('/api/v1/surveys', requireLogin, requireCredits,  async (req, res) => {
        const { title, subject, body, recipients } = req.body
        const survey = await new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })
        const mailer = new Mail(survey, surveyTemplate(survey))
        try {
            await mailer.send()
            await survey.save()
            req.user.credits -= 1
            const user = await req.user.save()
            res.send(user)
        } catch (error) {
            res.status(422).send(error)
        }
    })
}