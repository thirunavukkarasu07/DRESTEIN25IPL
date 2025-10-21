import mongoose from "mongoose";
import dotenv from "dotenv";
import Franchise from "./models/Franchise.js";
import Player from "./models/Player.js";
import Team from "./models/Team.js";

dotenv.config();

const franchises = [
  {
    name: "Mumbai Indians",
    shortName: "MI",
    city: "Mumbai",
    primaryColor: "#004BA0",
    secondaryColor: "#0099FF"
  },
  {
    name: "Chennai Super Kings",
    shortName: "CSK",
    city: "Chennai",
    primaryColor: "#FFFF00",
    secondaryColor: "#1C75BC"
  },
  {
    name: "Royal Challengers Bangalore",
    shortName: "RCB",
    city: "Bangalore",
    primaryColor: "#D32F2F",
    secondaryColor: "#000000"
  },
  {
    name: "Kolkata Knight Riders",
    shortName: "KKR",
    city: "Kolkata",
    primaryColor: "#3A225D",
    secondaryColor: "#C9A651"
  },
  {
    name: "Delhi Capitals",
    shortName: "DC",
    city: "Delhi",
    primaryColor: "#004C93",
    secondaryColor: "#EF1B23"
  },
  {
    name: "Rajasthan Royals",
    shortName: "RR",
    city: "Jaipur",
    primaryColor: "#EA1A85",
    secondaryColor: "#254AA5"
  },
  {
    name: "Punjab Kings",
    shortName: "PBKS",
    city: "Mohali",
    primaryColor: "#DD1F2D",
    secondaryColor: "#C0C0C0"
  },
  {
    name: "Sunrisers Hyderabad",
    shortName: "SRH",
    city: "Hyderabad",
    primaryColor: "#FF822A",
    secondaryColor: "#000000"
  }
];

const players = [
  // Batsmen
  { name: "Virat Kohli", category: "Batsman", basePrice: 2.0, isOverseas: false, country: "India", age: 35, stats: { matches: 237, runs: 7600, average: 37.3, strikeRate: 130.4 } },
  { name: "Rohit Sharma", category: "Batsman", basePrice: 2.0, isOverseas: false, country: "India", age: 37, stats: { matches: 257, runs: 6211, average: 31.3, strikeRate: 130.8 } },
  { name: "KL Rahul", category: "Batsman", basePrice: 1.5, isOverseas: false, country: "India", age: 32, stats: { matches: 132, runs: 4683, average: 46.8, strikeRate: 135.5 } },
  { name: "David Warner", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "Australia", age: 38, stats: { matches: 184, runs: 6565, average: 40.5, strikeRate: 140.1 } },
  { name: "Jos Buttler", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "England", age: 34, stats: { matches: 107, runs: 3582, average: 35.8, strikeRate: 148.9 } },
  { name: "Shikhar Dhawan", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 39, stats: { matches: 222, runs: 6769, average: 35.2, strikeRate: 127.9 } },
  { name: "Faf du Plessis", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 40, stats: { matches: 119, runs: 3546, average: 32.2, strikeRate: 130.0 } },
  { name: "Prithvi Shaw", category: "Batsman", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 79, runs: 1892, average: 25.5, strikeRate: 147.5 } },
  { name: "Ruturaj Gaikwad", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 27, stats: { matches: 70, runs: 2380, average: 36.9, strikeRate: 137.5 } },
  { name: "Shubman Gill", category: "Batsman", basePrice: 1.5, isOverseas: false, country: "India", age: 25, stats: { matches: 98, runs: 3204, average: 34.0, strikeRate: 132.7 } },
  
  // Bowlers
  { name: "Jasprit Bumrah", category: "Bowler", basePrice: 2.0, isOverseas: false, country: "India", age: 31, stats: { matches: 133, wickets: 165, average: 23.4, strikeRate: 137.5 } },
  { name: "Rashid Khan", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "Afghanistan", age: 26, stats: { matches: 119, wickets: 157, average: 19.5, strikeRate: 125.8 } },
  { name: "Yuzvendra Chahal", category: "Bowler", basePrice: 1.0, isOverseas: false, country: "India", age: 34, stats: { matches: 159, wickets: 201, average: 24.1, strikeRate: 138.2 } },
  { name: "Mohammed Shami", category: "Bowler", basePrice: 1.5, isOverseas: false, country: "India", age: 34, stats: { matches: 112, wickets: 127, average: 27.1, strikeRate: 140.5 } },
  { name: "Trent Boult", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "New Zealand", age: 35, stats: { matches: 88, wickets: 106, average: 25.4, strikeRate: 132.9 } },
  { name: "Kagiso Rabada", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 29, stats: { matches: 76, wickets: 102, average: 21.3, strikeRate: 128.7 } },
  { name: "Bhuvneshwar Kumar", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 35, stats: { matches: 176, wickets: 181, average: 26.9, strikeRate: 139.8 } },
  { name: "Mitchell Starc", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "Australia", age: 35, stats: { matches: 41, wickets: 51, average: 24.9, strikeRate: 132.4 } },
  { name: "Arshdeep Singh", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 65, wickets: 76, average: 28.3, strikeRate: 145.2 } },
  { name: "Kuldeep Yadav", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 30, stats: { matches: 78, wickets: 78, average: 26.4, strikeRate: 141.3 } },
  
  // All-Rounders
  { name: "Hardik Pandya", category: "All-Rounder", basePrice: 2.0, isOverseas: false, country: "India", age: 31, stats: { matches: 132, runs: 2525, wickets: 58, average: 28.5, strikeRate: 142.7 } },
  { name: "Ravindra Jadeja", category: "All-Rounder", basePrice: 1.5, isOverseas: false, country: "India", age: 36, stats: { matches: 240, runs: 2809, wickets: 161, average: 27.6, strikeRate: 127.8 } },
  { name: "Glenn Maxwell", category: "All-Rounder", basePrice: 1.5, isOverseas: true, country: "Australia", age: 36, stats: { matches: 135, runs: 3089, wickets: 32, average: 26.4, strikeRate: 154.3 } },
  { name: "Marcus Stoinis", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "Australia", age: 35, stats: { matches: 85, runs: 1468, wickets: 31, average: 25.8, strikeRate: 135.9 } },
  { name: "Sam Curran", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "England", age: 26, stats: { matches: 62, runs: 677, wickets: 66, average: 29.4, strikeRate: 145.2 } },
  { name: "Washington Sundar", category: "All-Rounder", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 86, runs: 695, wickets: 63, average: 34.7, strikeRate: 133.2 } },
  { name: "Axar Patel", category: "All-Rounder", basePrice: 1.0, isOverseas: false, country: "India", age: 31, stats: { matches: 132, runs: 1256, wickets: 118, average: 30.2, strikeRate: 136.8 } },
  { name: "Moeen Ali", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "England", age: 37, stats: { matches: 49, runs: 842, wickets: 26, average: 31.8, strikeRate: 141.9 } },
  { name: "Shakib Al Hasan", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "Bangladesh", age: 38, stats: { matches: 93, runs: 1628, wickets: 73, average: 26.7, strikeRate: 121.9 } },
  { name: "Venkatesh Iyer", category: "All-Rounder", basePrice: 0.75, isOverseas: false, country: "India", age: 29, stats: { matches: 50, runs: 1326, wickets: 15, average: 32.8, strikeRate: 136.4 } },
  
  // Wicket-Keepers
  { name: "MS Dhoni", category: "Wicket-Keeper", basePrice: 2.0, isOverseas: false, country: "India", age: 43, stats: { matches: 264, runs: 5243, average: 38.2, strikeRate: 135.9 } },
  { name: "Rishabh Pant", category: "Wicket-Keeper", basePrice: 2.0, isOverseas: false, country: "India", age: 27, stats: { matches: 111, runs: 3284, average: 34.8, strikeRate: 147.9 } },
  { name: "Quinton de Kock", category: "Wicket-Keeper", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 32, stats: { matches: 101, runs: 3019, average: 31.6, strikeRate: 135.9 } },
  { name: "Ishan Kishan", category: "Wicket-Keeper", basePrice: 1.0, isOverseas: false, country: "India", age: 26, stats: { matches: 105, runs: 2644, average: 28.1, strikeRate: 137.8 } },
  { name: "Sanju Samson", category: "Wicket-Keeper", basePrice: 1.0, isOverseas: false, country: "India", age: 30, stats: { matches: 166, runs: 4392, average: 29.2, strikeRate: 137.5 } },
  { name: "Nicholas Pooran", category: "Wicket-Keeper", basePrice: 0.75, isOverseas: true, country: "West Indies", age: 29, stats: { matches: 43, runs: 1060, average: 28.6, strikeRate: 149.2 } },
  { name: "Phil Salt", category: "Wicket-Keeper", basePrice: 0.75, isOverseas: true, country: "England", age: 28, stats: { matches: 32, runs: 884, average: 31.5, strikeRate: 153.6 } },
  { name: "Jitesh Sharma", category: "Wicket-Keeper", basePrice: 0.5, isOverseas: false, country: "India", age: 30, stats: { matches: 45, runs: 831, average: 27.7, strikeRate: 152.1 } },
  { name: "KS Bharat", category: "Wicket-Keeper", basePrice: 0.5, isOverseas: false, country: "India", age: 31, stats: { matches: 42, runs: 612, average: 22.6, strikeRate: 119.8 } },
  { name: "Tom Banton", category: "Wicket-Keeper", basePrice: 0.5, isOverseas: true, country: "England", age: 26, stats: { matches: 22, runs: 356, average: 19.7, strikeRate: 138.0 } }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Clear existing data
    await Franchise.deleteMany({});
    await Player.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Insert franchises
    const insertedFranchises = await Franchise.insertMany(franchises);
    console.log(`✅ Inserted ${insertedFranchises.length} franchises`);

    // Insert players
    const insertedPlayers = await Player.insertMany(players);
    console.log(`✅ Inserted ${insertedPlayers.length} players`);

    console.log("🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();