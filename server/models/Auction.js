import mongoose from "mongoose";

const auctionSchema = new mongoose.Schema({
  currentPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    default: null
  },
  currentSet: {
    type: String,
    enum: ["Batsman", "Bowler", "All-Rounder", "Wicket-Keeper", null],
    default: null
  },
  isActive: {
    type: Boolean,
    default: false
  },
  auctionHistory: [{
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player"
    },
    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team"
    },
    soldPrice: Number,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  spinHistory: [{
    category: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

const Auction = mongoose.model("Auction", auctionSchema);

export default Auction;