const express = require('express');
const path = require('path');

const {
    db,
    models,
    seed
} = require('./db/index.js');

const { Person, Place, Thing } = models;

const PORT = 3000;
const app = express();

app.use(express.json()); // don't forget this for posts!! (and maybe puts)

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, './index.html'))
});

app.get('/api/places', (req, res, next) => {
    Place.findAll({
        include: [Person]
    })
    .then(places => {
        res.send(places)
    })
    .catch(e => console.log('error getting places', e))
});

app.get('/api/people', (req, res, next) => {
    Person.findAll({
        include: [Thing]
    })
    .then(persons => {
        res.send(persons)
    })
    .catch(e => console.log('error getting persons', e))
});

app.post('/api/people', (req, res, next) => {
    Person.create(req.body)
        .then(() => Person.findAll({
            include: [Thing]
        }))
        .then(persons => {
            res.send(persons)
        })
        .catch(e => console.log('error posting a person', e))
});

app.get('/api/things', (req, res, next) => {
    Thing.findAll()
    .then(things => {
        res.send(things)
    })
    .catch(e => console.log('error getting things', e))
});

db.sync({force: true})
    .then(() => {
        seed()
        // .then(stuff => {'stuff', console.log(stuff[1])})
    })
    .then((placesAndPersonsAndThings) => {
        // console.log(placesAndPersonsAndThings);
        app.listen(PORT, () => {
            console.log('application has started')
        })
    })