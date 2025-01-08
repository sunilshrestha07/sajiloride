import mongoose from 'mongoose';

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    min: [5, 'Email must be at least 4 characters long'],
  },
  password: {
    type: String,
    required: true,
    min: [5, 'Password must be at least 5 characters long'],
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    default: 'captain',
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  phone:{
    type: String,
  },
  vehicle: {
    color: {
        type: String,
        required: true,
        minlength: [ 3, 'Color must be at least 3 characters long' ],
    },
    plate: {
        type: String,
        required: true,
        minlength: [ 3, 'Plate must be at least 3 characters long' ],
    },
    vehicleType: {
        type: String,
        required: true,
    }
},
});

const Captain = mongoose.models.Captain || mongoose.model('Captain', captainSchema);

export default Captain;
