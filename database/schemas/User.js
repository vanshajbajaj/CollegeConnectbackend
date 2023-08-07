const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  sexuality: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
  handleType: {
    type: String,
    required: true,
    enum: ["whatsapp", "instagram", "snapchat", "twitter", "facebook"],
  },
  handle: {
    type: String,
    required: true,
  },
  preferredSexuality: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "default.png",
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  interests: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      option: {
        type: Number,
        required: true,
      },
    },
  ],
  matches: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      compatibility: {
        type: Number,
        required: true,
      },
    },
  ],
  swipes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        index: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
      flag: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
