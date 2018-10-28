import mongoose, { Schema } from "mongoose";

const TrasnactionSchema = new Schema({
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sender: {
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
  purpose: {
    type: String,
    required: true
  }
});

export default mongoose.model("Trasnaction", TrasnactionSchema);
