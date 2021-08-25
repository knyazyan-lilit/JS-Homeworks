const express = require('express');
const u_id = require('uuid');
const multer = require('multer');
const bp = require('body-parser');
const fs = require('fs');
const { text } = require('express');
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
const path = require('path');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const upload = multer({ dest: 'images/' });

app.put('/users/:id/photos',upload.single('image'),function (req, res, err) {
    let file_path = 'home/lilit/Instagram/'+req.file.path;
    let id=req.params.id;
    let ob={
        id:id,
        photo:file_path
    }
    let json = JSON.stringify(ob);
    fs.writeFileSync('photos.json',json);
    let extention = req.file.originalname.split('.').pop();
    if(extention!='jpg' && extention!='jpeg' && extention!='png'&& extention!='gif'){
        res.send("err");
    }
    else{
        res.send("uploaded");
    }
})

app.post('/users/registration', (req,res)=>{
    let users_array = JSON.parse(fs.readFileSync('users.json'));
    users_array.push(req.body);
    fs.writeFileSync('users.json',JSON.stringify(users_array))
    res.send('ok');
});

app.get('/users/name',(req,res)=>{
    const file = fs.readFileSync('users.json');
    const users_array = JSON.parse(file);
    const users = [];
    for(elem of users_array){
        users.push(elem.name);
    }
    res.send(users);
});

app.get('/users',(req,res)=>{
    const file = fs.readFileSync('users.json');
    const users_array = JSON.parse(file);
    const users = [];
    res.send(users_array);
});

app.listen(3000,()=>{
    console.log("server listens to 3000 port");
})
