const mongoose = require('mongoose');
const Ats = require('./src/ats-model');
const Ats3 = require('./src/ats3-model');
const Ats4 = require('./src/ats4-model');

(async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/discrm-bug-db', {
            // enable automatic index creation
            autoIndex: true,
        });
        await createFixtures();

        console.log('Result for "find one":');
        const findOneResult = await Ats.findOne({ serialNumber: 'ats-3-1' });
        console.log(findOneResult);
        console.log('-----------------------------------');
        console.log('Result for "find many" => returns all items in collection!:');
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
    await Ats.collection.drop();
    // Ats3
    const aAts3 = new Ats3({deviceId: '1', serialNumber: 'ats-3-1', partNumber: 'ats3-111'});
    const bAts3 = new Ats3({deviceId: '2', serialNumber: 'ats-3-2', partNumber: 'ats3-222'});
    const cAts3 = new Ats3({deviceId: '3', serialNumber: 'ats-3-3', partNumber: 'ats3-333'});
    // Ats4
    const aAts4 = new Ats4({deviceId: '4', serialNumber: 'ats-4-1', partNumber: 'ats4-111'});
    const bAts4 = new Ats4({deviceId: '5', serialNumber: 'ats-4-2', partNumber: 'ats4-222'});
    const cAts4 = new Ats4({deviceId: '6', serialNumber: 'ats-4-3', partNumber: 'ats4-333'});
    // persist to db
    await aAts3.save();
    await bAts3.save();
    await cAts3.save();
    await aAts4.save();
    await bAts4.save();
    await cAts4.save();
}
