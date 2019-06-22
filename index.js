const express = require('express')

const app = express()
const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send({ 
        hi: 'there',
        bye: 'buddy'
    })
})

app.listen(PORT, (err) => err ? console.warn(err): console.log(`Listening on port: ${PORT}`))