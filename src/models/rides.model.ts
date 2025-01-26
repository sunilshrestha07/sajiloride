import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    pickuplocation:{
        type:String,
        required: true
    },
    droplocation:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    distance:{
        type: Number,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true});

const Ride = mongoose.models.Ride || mongoose.model('Ride', rideSchema);

export default Ride;
