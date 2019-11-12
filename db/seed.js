const {
    Place,
    Thing,
    Person,
} = require('./models/index.js');

const seed = () => {
    const thingsToBe = [
        {
            name: 'Harry Potter',
        },
        {
            name: 'Lord of the Rings',
        },
        {
            name: 'Green Eggs and Ham',
        },
        {
            name: 'The Golden Compass',
        },
        {
            name: 'The Subtle Knife',
        },
        {
            name: 'The Amber Spyglass',
        }
    ];

    const personsToBe = [
        {
            name: 'Seuss',
        },
        {
            name: 'Pullman',
        },
        {
            name: 'Rowling',
        },
        {
            name: 'Tolkein',
        }
    ];

    const placesToBe = [
        {
            name: 'England',
        },
        {
            name: 'Scotland',
        },
        {
            name: 'USA',
        }
    ];

    // place => person => thing;
    // async await the following
    const createNouns = async () => {
        const placePromises = await Promise.all(placesToBe.map(place => Place.create(place)));
        // console.log('places', placePromises[0].dataValues.id);
        const newPersonsToBe = personsToBe.map(person => {
            let num = Math.floor(Math.random() * 2)
            let PlaceId = placePromises[num].dataValues.id
            return {
                ...person,
                PlaceId,
            }
        });
        // console.log('persons', newPersonsToBe)
        const personPromises = await Promise.all(newPersonsToBe.map(person => Person.create(person)));
        const newThingsToBe = thingsToBe.map(thing => {
            let num = Math.floor(Math.random() * 3);
            let PersonId = personPromises[num].dataValues.id;
            return {
                ...thing,
                PersonId,
            }
        });
        // console.log(newThingsToBe)
        const thingPromises = await Promise.all(newThingsToBe.map(thing => Thing.create(thing)));
        return Promise.all([placePromises, personPromises, thingPromises])
    }
    
    return createNouns()
    

    // need to create data and foreign keys
    // Promise.all([placePromises, personPromises, thingPromises])


}

module.exports = seed;