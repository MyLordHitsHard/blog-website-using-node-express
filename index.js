const functions = require("firebase-functions");
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')

const app = express()

// connect to mongodb
const dbURI = 'mongodb+srv://bloguser:1234qwer@nodeblog.hre6dk7.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true}).then((result) => {
    app.listen(3000, () => {
        console.log('Server is up on port 3000.')
    })
}).catch((err) => console.log(err))
// register view engine

app.set('view engine', 'ejs')


// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



app.use(morgan('dev'))




app.get('/', (req, res) => {
    res.redirect('/blogs')
})



app.get('/about', (req, res) => {
    // res.send('<h1>About Page!</h1>')
    res.render('about', { title: 'About'})
})


app.use('/blogs', blogRoutes)


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})


exports.app = functions.https.onRequest(app)


