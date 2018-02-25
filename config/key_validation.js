// PROTECT ALL ROUTES THAT FOLLOW
// ensure .dotenv is required
// require('dotenv').config();
//
// or use passport-localapikey
// https://www.npmjs.com/package/passport-localapikey

app.use((req, res, next) => {
    const apiKey = req.get('API-Key')
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: 'unauthorised' })
    } else {
        next()
    }
})

// unprotected root route
app.get('/normal', (req, res) => {
    res.status(200).json({ message: 'This is NOT secret information' })
})

// PROTECT ALL ROUTES THAT FOLLOW
app.use((req, res, next) => {
    const apiKey = req.get('API-Key')
    if (!apiKey || apiKey !== process.env.API_KEY) {
        res.status(401).json({ error: 'unauthorised' })
    } else {
        next()
    }
})

// secret routes
app.get('/secret', (req, res) => {
    res.status(200).json({ message: 'This is secret information' })