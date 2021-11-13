const express = require('express')
const ejs=require('ejs')
const https = require('https')
const request = require('sync-request');

const app=express();
const res = request('GET', 'https://reqres.in/api/users?page=1');
const res2 = request('GET', 'https://reqres.in/api/users?page=2');
let member=JSON.parse(res.getBody('utf8'))
let member2=JSON.parse(res2.getBody('utf8'))
let data=member.data
//console.log(member2.data)
for(i=0;i<member2.data.length;i++){
   data.push(member2.data[i])
}

app.set("view engine","ejs")


app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req,res)=>{
    
    const page=req.query.page||1
    res.render('index',{
        data
    })
})
app.get('/member', (req,res)=>{
    let veri
    let kont=req.query
    for(i=0;i<data.length;i++){
        if(data[i].id==kont.userid){
            veri=data[i]
        }
    }
    res.render('member',{
        veri
    })
})

app.get('/created',(req,res)=>{
    res.render('created')
})

app.post('/created',(req,res)=>{
    let data=req.body
    var a = request('POST', 'https://reqres.in/api/users', {data
}
);

res.jsonp(JSON.parse(a.getBody()))

})
const port=3000;
app.listen(port,()=>{
    console.log("Sunucu Çalıştı")
})