const express = require("express");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require("body-parser");
const { ObjectId } = require("bson");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/user", { useUnifiedTopology: true, useNewUrlParser: true });

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

const tweetSchema = new Schema({
    user_id: ObjectId,
    title: String,
    text: String
})

const User = mongoose.model('user', userSchema);
const Tweet = mongoose.model('tweet', tweetSchema);

app.post('/users/registration', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    user.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(user);
        }
    });
})

app.post('/users/:id/post', (req, res) => {
    const tweet = new Tweet({
        user_id: req.params.id,
        title: req.body.title,
        text: req.body.text
    })

    tweet.save((err) => {
        if (err) {
            res.send(err);
        } else {
            res.send(tweet);
        }
    });
})

app.get('/users/:id/tweets', (req, res) => {
    Tweet.find({ "user_id": req.params.id }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
})

app.delete('/users/:user_id/:post_id/tweet', (req, res) => {
    Tweet.findByIdAndDelete({ "_id": req.params.post_id, "user_id": req.params.user_id }, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send("deleted");
        }
    })
})

app.listen(3000, () => {
    console.log("server listens to 3000 port");
});
