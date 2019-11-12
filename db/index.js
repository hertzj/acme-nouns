const db = require('./connections.js');
const seed = require('./seed');
const {
    Place,
    Thing,
    Person,
} = require('./models/index.js');

Person.belongsTo(Place);
Place.hasMany(Person);

Thing.belongsTo(Person);
Person.hasMany(Thing);

module.exports = {
    db,
    seed,
    models: {
        Place,
        Thing,
        Person,
    }
}