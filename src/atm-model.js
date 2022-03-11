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

// Indexes

atmSchema.index({ readOnly: 1 });
atmSchema.index({ serialNumber: 1 }, { unique: true, sparse: true });
atmSchema.index(
    { serialNumber: 1 },
    { name: 'serialNumber_insensitive_1', unique: true, sparse: true, collation: { locale: 'en', strength: 2 } }
);
atmSchema.index({ serialNumber: 1, kind: 1 }, { name: 'serialNumber_1-kind_1', unique: true, sparse: true });
atmSchema.index({ deviceId: 1 });
atmSchema.index({ deviceId: 1 }, { name: 'deviceId_insensitive_1', collation: { locale: 'en', strength: 2 } });

// all methods / statics / validators removed for simplicity...

const AtmModel = mongoose.model('Atm', atmSchema);

module.exports = AtmModel;
