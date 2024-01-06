const mongoose = require("mongoose"); // import mongoose
const Schema = mongoose.Schema; // initialize schema
const bcrypt = require("bcrypt"); // import bcrypt
const validator = require("validator"); // import validator

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true, // unique username
    required: true,
  },
  email: {
    type: String,
    unique: true, // unique email
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
userSchema.statics.register = async function(name, username, email, password) {
 // validate 
 if(!name || !username || !email || !password) {
    throw Error("All fields are required");
}

if(!validator.isEmail(email)) {
    throw Error("Invalid email");
}

if(!validator.isStrongPassword(password)) {
    throw Error("Password must be at least 8 characters long and contain at least 1 lowercase, uppercase, number and special character");
}

  const exists = await this.findOne({ email , username });

  if (exists) {
    throw Error("User already exists");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ name, username, email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function(email, password) {
    // validate
    if (!email || !password) {
        throw Error("All fields are required!");
    }
    
    const user = await this.findOne({ email });

    if(!user) {
        throw Error("User does not exist");
    }

    const match = await bcrypt.compare(password, user.password);

    if(!match) {
        throw Error("Incorrect password");
    }   

    return user;
}

module.exports = mongoose.model("User", userSchema); // export model
