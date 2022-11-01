const mongoose = require('mongoose');

export const connectDB = async () => {
  const conn = await mongoose.connect(
    'mongodb://kommuneadvisorUser:kommuneadvisorUserPw@it2810-22.idi.ntnu.no:27017/kommuneadvisor_dev'
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};
