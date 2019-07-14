const { redirectDomain } = require('../../config/keys')

module.exports = ({ body, id }) => {
    return `
        <html>
            <body>
                <div style="text-align: center;">
                    <h3>I'd like your input!</h3>
                    <p>Please answer the following question:</p>
                    <p>${body}</p>
                    <div>
                        <a href="${redirectDomain}/api/v1/surveys/${id}/yes">Yes</a>
                    </div>
                    <div>
                        <a href="${redirectDomain}/api/v1/surveys/${id}/no">No</a>
                    </div>
                </div>
            </body>
        </html>
    `
}