import mongoose, { Schema } from "mongoose";

const LoadSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    required: true
  },
  remark: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  }
});

export default mongoose.model("Load", LoadSchema);
