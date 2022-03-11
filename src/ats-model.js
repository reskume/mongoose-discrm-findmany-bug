const mongoose = require('mongoose');

const atsSchema = new mongoose.Schema(
    {
        // if true, document cannot be edited anymore unless set to false
        readOnly: { type: Boolean, required: true, default: false },
        deviceId: { type: String, trim: true },
    },
    { discriminatorKey: 'kind', collection: 'ats' }
);

// Indexes

atsSchema.index({ readOnly: 1 });
atsSchema.index({ serialNumber: 1 }, { unique: true, sparse: true });
atsSchema.index(
    { serialNumber: 1 },
    { name: 'serialNumber_insensitive_1', unique: true, sparse: true, collation: { locale: 'en', strength: 2 } }
);
atsSchema.index({ serialNumber: 1, kind: 1 }, { name: 'serialNumber_1-kind_1', unique: true, sparse: true });
atsSchema.index({ deviceId: 1 });
atsSchema.index({ deviceId: 1 }, { name: 'deviceId_insensitive_1', collation: { locale: 'en', strength: 2 } });

// all methods / statics / validators removed for simplicity...

const AtsModel = mongoose.model('Ats', atsSchema);

module.exports = AtsModel;
