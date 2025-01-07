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
  },
  role: {
    type: String,
    default: 'user',
  },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
