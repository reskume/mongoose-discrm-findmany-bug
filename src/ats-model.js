const mongoose = require('mongoose');

const atsSchema = new mongoose.Schema(
    {
        // if true, document cannot be edited anymore unless set to false
        readOnly: { type: Boolean, required: true, default: false },
        deviceId: { type: String, trim: true },
    },
    { discriminatorKey: 'kind', collection: 'ats' }
);

// all methods / statics / validators removed for simplicity...

const AtsModel = mongoose.model('Ats', atsSchema);

module.exports = AtsModel;
