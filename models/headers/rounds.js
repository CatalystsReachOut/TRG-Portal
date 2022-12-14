import mongoose from "mongoose";

const roundsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  status: {
    type: String,
    enum: ["ACTIVE", "INACTIVE","DELETED"],
    default: "ACTIVE",
  },
});

const Round = mongoose.model("Round", roundsSchema);

export default Round;
