//requiring libaries
const express = require('express');
const mongoose = require('mongoose')
const res = require('express/lib/response');
const shortUrl = require('./models/shortUrl');
const app = express();

//mongodb connection
mongoose.connect('mongodb://127.0.0.1:27017/urlShortener',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs')
//.use is for middleware
app.use(express.urlencoded({extended: false}))
app.get('/',(req,resp)=>{
    resp.render('index')
})

app.post('/shortUrls',async (req,resp)=>{
    await shortUrl.create({full: req.body.longUrl})
    resp.redirect('/')
})

app.listen(process.env.PORT || 5000);
