const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blogRoutes')


const app = express()


// connect to mongodb
const dbURI = 'add database connection link here'
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

// app.use((req, res, next) => {
//     console.log('new request made: ')
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path)
//     console.log('method: ', req.method)
//     next()
// })

app.use(morgan('dev'))

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'New Blog',
//         snippet: 'About my new blog',
//         body: 'More about my new blog'
//     })

//     blog.save().then((result) => {
//         res.send(result)
//     }).catch((err) => console.log(err))
// }) 

// app.get('/all-blogs', (req, res) => {
//     Blog.find().then((result) => {
//         res.send(result)
//     }).catch((err) => console.log(err))
// })


// app.get('/single-blog', (req, res) => {
//     Blog.findById('').then((result) => {
//         res.send(result)
//     }).catch((err) => console.log(err))
// })


app.get('/', (req, res) => {
    res.redirect('/blogs')
})


// app.get('/', (req, res) => {
//     // res.send('<h1>Hello Express!</h1>')
//     res.sendFile('./views/index.html', { root: __dirname})
// })

app.get('/about', (req, res) => {
    // res.send('<h1>About Page!</h1>')
    res.render('about', { title: 'About'})
})


app.use('/blogs', blogRoutes)


// // redirects
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404'})
})