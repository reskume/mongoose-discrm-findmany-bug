const mongoose = require('mongoose');
const Ats = require('./ats-model');
const mongooseLeanVirtualsPlugin = require('mongoose-lean-virtuals');

const ats3Schema = new mongoose.Schema({
    serialNumber: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: function (value) {
                return new RegExp(/^ats-3.*/).test(value);
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

ats3Schema.plugin((schema) => {
    schema.set('toJSON', {
        virtuals: false,
        versionKey: false,
    });

    schema.set('toObject', {
        virtuals: false,
        versionKey: false,
    });
});
ats3Schema.plugin(mongooseLeanVirtualsPlugin);

const Ats3Model = Ats.discriminator('Ats3', ats3Schema);

module.exports = Ats3Model;
