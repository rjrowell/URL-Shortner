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

//route for index file
app.get('/',async (req,resp)=>{
    const shortUrls = await shortUrl.find()
    resp.render('index',{shortUrls: shortUrls})
})

//route for creating short url and adding to db
app.post('/shortUrls',async (req,resp)=>{
    await shortUrl.create({full: req.body.longUrl})
    resp.redirect('/')
})

//route for the shortUrl
app.get('/:shortUrl',async (req,resp)=>{
    const newUrl = await shortUrl.findOne({
        short:req.params.shortUrl
    })
    if (newUrl == null){
        resp.sendStatus(404)
    }
    resp.redirect(newUrl.full)
})

app.listen(process.env.PORT || 5000);
