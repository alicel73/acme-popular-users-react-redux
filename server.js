const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const { User } = db.models;

app.use(require('body-parser').json());

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next);
})

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next);
})

app.put('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            Object.assign(user, req.body)
            return user.save();
        })
        .then(user => res.send(user))
        .catch(next);
})

app.delete('/api/users/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            return user.destroy()
        })
        .then(() => res.sendStatus(204))
        .catch(next);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on ${port}`));

db.sync()
    .then (() => db.seed());