const mongoose = require('mongoose')
const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')

const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mail = require('../services/Mailer')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

const Survey = mongoose.model('surveys')

module.exports = (app) => {
    app.get('/api/v1/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false })
            .exec()
        res.send(surveys)
    })

    app.get('/api/v1/surveys/:surveyId/:choice', (req, res) => {
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

    app.post('/api/v1/surveys/webhooks', async (req, res) => {
        const p = new Path('/api/v1/surveys/:surveyId/:choice')
        _.chain(req.body)
            .map(({ email, url }) => {
                const match = p.test(new URL(url).pathname)
                if (match) {
                    return { 
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .each(({ choice, email, surveyId }) => Survey.updateOne({
                _id: surveyId,
                recipients: {
                    $elemMatch: { 
                        email,
                        responded: false
                    }
                }
            }, {
                $inc: { 
                    [choice]: 1 
                },
                $set: { 
                    'recipients.$.responded': true 
                },
                lastResponded: new Date()
            }).exec())
            .value()
        res.send({})
    })
}