const express = require('express');
const res = require('express/lib/response');
const app = express();

app.set('view engine', 'ejs')
app.get('/',(req,resp)=>{
    resp.render('index')
})

app.listen(process.env.PORT || 5000);
