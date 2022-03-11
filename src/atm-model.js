const mongoose = require('mongoose');

const atmSchema = new mongoose.Schema(
    {
        // if true, document cannot be edited anymore unless set to false
        readOnly: { type: Boolean, required: true, default: false },
        deviceId: { type: String, trim: true },
        serialNumber: {
            type: String,
            trim: true,
            required: true,
        },
        partNumber: {
            type: String,
            trim: true,
            required: true,
        },
    },
    { discriminatorKey: 'kind', collection: 'atm' }
);

// all methods / statics / validators removed for simplicity...

const AtmModel = mongoose.model('Atm', atmSchema);

module.exports = AtmModel;
