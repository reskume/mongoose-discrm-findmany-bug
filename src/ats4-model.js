const mongoose = require('mongoose');
const Ats = require('./ats-model');
const mongooseLeanVirtualsPlugin = require('mongoose-lean-virtuals');

const ats4Schema = new mongoose.Schema({
    serialNumber: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return new RegExp(/^ats-4.*/).test(value);
            },
            message: 'Provided serial number is invalid.',
        },
    },
    partNumber: {
        type: String,
        trim: true,
        required: true,
    },
});

// all methods / statics / validators removed for simplicity...

ats4Schema.plugin((schema) => {
    schema.set('toJSON', {
        virtuals: false,
        versionKey: false,
    });

    schema.set('toObject', {
        virtuals: false,
        versionKey: false,
    });
});
ats4Schema.plugin(mongooseLeanVirtualsPlugin);

const Ats4Model = Ats.discriminator('Ats4', ats4Schema);

module.exports = Ats4Model;
