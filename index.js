const mongoose = require('mongoose');
const Atm = require('./src/atm-model');
const Ats = require('./src/ats-model');
const Ats3 = require('./src/ats3-model');
const Ats4 = require('./src/ats4-model');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/discrm-bug-db', {
            // enable automatic index creation
            autoIndex: true,
        });
        mongoose.set('debug', true);
        await createFixtures();
        console.log('Result for "find" on collection WITHOUT inheritance:');
        const findSimpleResult = await Atm.find({ serialNumber: 'atm-2' });
        // returns exactly ONE document in the result list
        console.log(findSimpleResult);
        console.log('-----------------------------------');
        console.log('Result for "find one" on collection WITH inheritance:');
        const findOneResult = await Ats.findOne({ serialNumber: 'ats-3-1' });
        console.log(findOneResult);
        console.log('-----------------------------------');
        console.log('Result for "find" on collection WITH inheritance => returns all items in collection!:');
        // this should return exactly ONE document in the result list
        const findManyResult = await Ats.find({ serialNumber: 'ats-3-1' });
        // but ALL items in the collection are returned instead
        console.log(findManyResult);
    } catch (e) {
        throw new Error(e);
    }
})();


async function createFixtures() {
    // clear db
    await Atm.collection.drop();
    await Ats.collection.drop();

    // Atm (does not use inheritance)
    const aAtm = new Atm({deviceId: '1', serialNumber: 'atm-1', partNumber: 'atm-111'});
    const bAtm = new Atm({deviceId: '2', serialNumber: 'atm-2', partNumber: 'atm-222'});
    const cAtm = new Atm({deviceId: '3', serialNumber: 'atm-3', partNumber: 'atm-333'});
    // Ats3 ( inherits from base model using discriminator functionality)
    const aAts3 = new Ats3({deviceId: '1', serialNumber: 'ats-3-1', partNumber: 'ats3-111'});
    const bAts3 = new Ats3({deviceId: '2', serialNumber: 'ats-3-2', partNumber: 'ats3-222'});
    const cAts3 = new Ats3({deviceId: '3', serialNumber: 'ats-3-3', partNumber: 'ats3-333'});
    // Ats4 ( inherits from base model using discriminator functionality)
    const aAts4 = new Ats4({deviceId: '1', serialNumber: 'ats-4-1', partNumber: 'ats4-111'});
    const bAts4 = new Ats4({deviceId: '2', serialNumber: 'ats-4-2', partNumber: 'ats4-222'});
    const cAts4 = new Ats4({deviceId: '3', serialNumber: 'ats-4-3', partNumber: 'ats4-333'});

    // persist to db
    // Atm
    await aAtm.save();
    await bAtm.save();
    await cAtm.save();
    // Ats3
    await aAts3.save();
    await bAts3.save();
    await cAts3.save();
    // Ats4
    await aAts4.save();
    await bAts4.save();
    await cAts4.save();
}
