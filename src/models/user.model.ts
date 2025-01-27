import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    default:'https://icons.veryicon.com/png/o/miscellaneous/standard/avatar-15.png',
  },
  role: {
    type: String,
    default: 'user',
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  phone: {
    type: String,
  },
  vehicle: {
    color: {
      type: String,
      minlength: [3, 'Color must be at least 3 characters long'],
    },
    plate: {
      type: String,
      minlength: [3, 'Plate must be at least 3 characters long'],
    },
    vehicleType: {
      type: String,
    },
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
