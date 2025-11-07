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
  },
  {
    name: "Gujarat Titans",
    shortName: "GT",
    city: "Ahmedabad",
    primaryColor: "#1C6DD0",
    secondaryColor: "#F5C518"
  },
  {
    name: "Lucknow Super Giants",
    shortName: "LSG",
    city: "Lucknow",
    primaryColor: "#004C93",
    secondaryColor: "#FFC72C"

  }
];

const players = [
  // BATSMEN (70 players)
  // Indian Batsmen
  { name: "Virat Kohli", category: "Batsman", basePrice: 2.0, isOverseas: false, country: "India", age: 35, stats: { matches: 237, runs: 7600, average: 37.3, strikeRate: 130.4 } },
  { name: "Rohit Sharma", category: "Batsman", basePrice: 2.0, isOverseas: false, country: "India", age: 36, stats: { matches: 257, runs: 6211, average: 31.2, strikeRate: 130.8 } },
  { name: "KL Rahul", category: "Batsman", basePrice: 1.5, isOverseas: false, country: "India", age: 32, stats: { matches: 132, runs: 4683, average: 46.8, strikeRate: 135.5 } },
  { name: "Shikhar Dhawan", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 39, stats: { matches: 222, runs: 6769, average: 35.2, strikeRate: 127.0 } },
  { name: "Shubman Gill", category: "Batsman", basePrice: 1.5, isOverseas: false, country: "India", age: 25, stats: { matches: 98, runs: 3204, average: 34.0, strikeRate: 132.7 } },
  { name: "Ruturaj Gaikwad", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 27, stats: { matches: 70, runs: 2380, average: 36.9, strikeRate: 137.5 } },
  { name: "Prithvi Shaw", category: "Batsman", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 79, runs: 2088, average: 23.5, strikeRate: 147.5 } },
  { name: "Yashasvi Jaiswal", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 23, stats: { matches: 50, runs: 1771, average: 36.9, strikeRate: 163.6 } },
  { name: "Shreyas Iyer", category: "Batsman", basePrice: 1.0, isOverseas: false, country: "India", age: 29, stats: { matches: 115, runs: 3127, average: 31.9, strikeRate: 128.7 } },
  { name: "Suryakumar Yadav", category: "Batsman", basePrice: 1.5, isOverseas: false, country: "India", age: 34, stats: { matches: 79, runs: 2644, average: 35.3, strikeRate: 147.5 } },
  { name: "Manish Pandey", category: "Batsman", basePrice: 0.5, isOverseas: false, country: "India", age: 35, stats: { matches: 173, runs: 3808, average: 28.9, strikeRate: 122.3 } },
  { name: "Devdutt Padikkal", category: "Batsman", basePrice: 0.75, isOverseas: false, country: "India", age: 24, stats: { matches: 46, runs: 1356, average: 29.5, strikeRate: 125.9 } },
  { name: "Rahul Tripathi", category: "Batsman", basePrice: 0.75, isOverseas: false, country: "India", age: 33, stats: { matches: 88, runs: 2154, average: 28.4, strikeRate: 140.5 } },
  { name: "Mayank Agarwal", category: "Batsman", basePrice: 0.5, isOverseas: false, country: "India", age: 33, stats: { matches: 93, runs: 2442, average: 27.7, strikeRate: 135.4 } },
  { name: "Ajinkya Rahane", category: "Batsman", basePrice: 0.5, isOverseas: false, country: "India", age: 36, stats: { matches: 178, runs: 4642, average: 28.6, strikeRate: 121.3 } },

  // Australian Batsmen
  { name: "David Warner", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "Australia", age: 38, stats: { matches: 184, runs: 6565, average: 40.5, strikeRate: 140.7 } },
  { name: "Steve Smith", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "Australia", age: 35, stats: { matches: 121, runs: 2832, average: 28.0, strikeRate: 128.9 } },
  { name: "Travis Head", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "Australia", age: 31, stats: { matches: 28, runs: 785, average: 30.2, strikeRate: 152.3 } },
  { name: "Matthew Short", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Australia", age: 29, stats: { matches: 12, runs: 298, average: 24.8, strikeRate: 145.1 } },
  { name: "Josh Inglis", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "Australia", age: 29, stats: { matches: 18, runs: 442, average: 27.6, strikeRate: 147.3 } },
  { name: "Jake Fraser-McGurk", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Australia", age: 22, stats: { matches: 9, runs: 330, average: 36.7, strikeRate: 234.0 } },

  // English Batsmen
  { name: "Jos Buttler", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "England", age: 34, stats: { matches: 107, runs: 3582, average: 35.8, strikeRate: 148.9 } },
  { name: "Jonny Bairstow", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "England", age: 35, stats: { matches: 48, runs: 1304, average: 28.4, strikeRate: 142.2 } },
  { name: "Phil Salt", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "England", age: 28, stats: { matches: 33, runs: 965, average: 31.1, strikeRate: 168.2 } },
  { name: "Harry Brook", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "England", age: 25, stats: { matches: 21, runs: 544, average: 34.0, strikeRate: 141.9 } },
  { name: "Dawid Malan", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "England", age: 37, stats: { matches: 38, runs: 896, average: 26.4, strikeRate: 131.8 } },
  { name: "Will Jacks", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "England", age: 26, stats: { matches: 15, runs: 377, average: 25.1, strikeRate: 165.4 } },
  { name: "Alex Hales", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "England", age: 36, stats: { matches: 78, runs: 2322, average: 29.9, strikeRate: 148.9 } },

  // South African Batsmen
  { name: "Faf du Plessis", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 40, stats: { matches: 119, runs: 3546, average: 32.2, strikeRate: 137.8 } },
  { name: "Reeza Hendricks", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 35, stats: { matches: 42, runs: 1052, average: 25.0, strikeRate: 128.2 } },
  { name: "Rassie van der Dussen", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "South Africa", age: 35, stats: { matches: 31, runs: 768, average: 29.5, strikeRate: 134.5 } },
  { name: "Tristan Stubbs", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "South Africa", age: 24, stats: { matches: 35, runs: 718, average: 27.6, strikeRate: 158.4 } },
  { name: "Dewald Brevis", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 21, stats: { matches: 8, runs: 161, average: 20.1, strikeRate: 142.5 } },

  // New Zealand Batsmen
  { name: "Devon Conway", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "New Zealand", age: 33, stats: { matches: 45, runs: 1570, average: 38.3, strikeRate: 128.9 } },
  { name: "Kane Williamson", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "New Zealand", age: 34, stats: { matches: 98, runs: 2536, average: 36.2, strikeRate: 126.1 } },
  { name: "Glenn Phillips", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "New Zealand", age: 28, stats: { matches: 51, runs: 1089, average: 24.8, strikeRate: 142.1 } },
  { name: "Tim Seifert", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 30, stats: { matches: 15, runs: 258, average: 21.5, strikeRate: 141.8 } },

  // West Indian Batsmen
  { name: "Nicholas Pooran", category: "Batsman", basePrice: 1.5, isOverseas: true, country: "West Indies", age: 29, stats: { matches: 91, runs: 2061, average: 26.2, strikeRate: 152.8 } },
  { name: "Shimron Hetmyer", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "West Indies", age: 28, stats: { matches: 72, runs: 1439, average: 24.0, strikeRate: 151.4 } },
  { name: "Rovman Powell", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "West Indies", age: 31, stats: { matches: 58, runs: 1183, average: 25.2, strikeRate: 144.8 } },
  { name: "Brandon King", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 30, stats: { matches: 18, runs: 386, average: 24.1, strikeRate: 137.1 } },
  { name: "Johnson Charles", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 36, stats: { matches: 24, runs: 457, average: 20.8, strikeRate: 125.6 } },
  { name: "Evin Lewis", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 33, stats: { matches: 52, runs: 1318, average: 25.9, strikeRate: 149.5 } },

  // Sri Lankan Batsmen
  { name: "Kusal Mendis", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "Sri Lanka", age: 29, stats: { matches: 44, runs: 888, average: 21.7, strikeRate: 136.6 } },
  { name: "Pathum Nissanka", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 26, stats: { matches: 12, runs: 288, average: 24.0, strikeRate: 125.2 } },
  { name: "Charith Asalanka", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 27, stats: { matches: 8, runs: 196, average: 24.5, strikeRate: 111.4 } },
  { name: "Bhanuka Rajapaksa", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 33, stats: { matches: 27, runs: 526, average: 22.9, strikeRate: 163.4 } },

  // Pakistani Batsmen
  { name: "Babar Azam", category: "Batsman", basePrice: 2.0, isOverseas: true, country: "Pakistan", age: 30, stats: { matches: 38, runs: 986, average: 32.9, strikeRate: 124.8 } },
  { name: "Fakhar Zaman", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "Pakistan", age: 34, stats: { matches: 27, runs: 576, average: 21.3, strikeRate: 131.8 } },
  { name: "Mohammad Rizwan", category: "Batsman", basePrice: 1.0, isOverseas: true, country: "Pakistan", age: 32, stats: { matches: 24, runs: 498, average: 24.9, strikeRate: 127.9 } },
  { name: "Shan Masood", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Pakistan", age: 35, stats: { matches: 15, runs: 278, average: 19.9, strikeRate: 115.8 } },

  // Bangladeshi Batsmen
  { name: "Litton Das", category: "Batsman", basePrice: 0.75, isOverseas: true, country: "Bangladesh", age: 30, stats: { matches: 42, runs: 805, average: 22.4, strikeRate: 124.8 } },
  { name: "Najmul Hossain Shanto", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Bangladesh", age: 26, stats: { matches: 9, runs: 188, average: 20.9, strikeRate: 118.2 } },
  { name: "Towhid Hridoy", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Bangladesh", age: 24, stats: { matches: 6, runs: 127, average: 21.2, strikeRate: 145.9 } },

  // Afghan Batsmen
  { name: "Ibrahim Zadran", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 23, stats: { matches: 17, runs: 303, average: 18.9, strikeRate: 121.7 } },
  { name: "Hazratullah Zazai", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 26, stats: { matches: 9, runs: 215, average: 26.9, strikeRate: 163.6 } },

  // Other Countries Batsmen
  { name: "Paul Stirling", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "Ireland", age: 34, stats: { matches: 41, runs: 927, average: 23.2, strikeRate: 135.5 } },
  { name: "Max O'Dowd", category: "Batsman", basePrice: 0.2, isOverseas: true, country: "Netherlands", age: 30, stats: { matches: 8, runs: 178, average: 22.3, strikeRate: 118.7 } },
  { name: "George Munsey", category: "Batsman", basePrice: 0.2, isOverseas: true, country: "Scotland", age: 31, stats: { matches: 7, runs: 127, average: 18.1, strikeRate: 140.7 } },
  { name: "Colin Munro", category: "Batsman", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 37, stats: { matches: 89, runs: 1942, average: 23.1, strikeRate: 148.3 } },
  { name: "JP Kotze", category: "Batsman", basePrice: 0.2, isOverseas: true, country: "Namibia", age: 35, stats: { matches: 5, runs: 98, average: 19.6, strikeRate: 112.6 } },

  // BOWLERS (70 players)
  // Indian Bowlers
  { name: "Jasprit Bumrah", category: "Bowler", basePrice: 2.0, isOverseas: false, country: "India", age: 31, stats: { matches: 133, wickets: 165, average: 23.4, strikeRate: 137.8 } },
  { name: "Mohammed Shami", category: "Bowler", basePrice: 1.5, isOverseas: false, country: "India", age: 34, stats: { matches: 112, wickets: 127, average: 27.1, strikeRate: 140.3 } },
  { name: "Yuzvendra Chahal", category: "Bowler", basePrice: 1.0, isOverseas: false, country: "India", age: 34, stats: { matches: 159, wickets: 201, average: 24.1, strikeRate: 139.5 } },
  { name: "Bhuvneshwar Kumar", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 35, stats: { matches: 176, wickets: 181, average: 26.9, strikeRate: 138.5 } },
  { name: "Arshdeep Singh", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 65, wickets: 76, average: 28.3, strikeRate: 145.2 } },
  { name: "Kuldeep Yadav", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 30, stats: { matches: 78, wickets: 78, average: 26.4, strikeRate: 141.3 } },
  { name: "Harshal Patel", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 34, stats: { matches: 87, wickets: 106, average: 24.6, strikeRate: 137.4 } },
  { name: "T Natarajan", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 33, stats: { matches: 54, wickets: 65, average: 27.8, strikeRate: 140.1 } },
  { name: "Ravi Bishnoi", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 24, stats: { matches: 43, wickets: 48, average: 24.2, strikeRate: 138.9 } },
  { name: "Umran Malik", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 25, stats: { matches: 29, wickets: 31, average: 28.9, strikeRate: 151.8 } },
  { name: "Khaleel Ahmed", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 27, stats: { matches: 44, wickets: 54, average: 24.7, strikeRate: 145.2 } },
  { name: "Mohit Sharma", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 36, stats: { matches: 109, wickets: 109, average: 25.4, strikeRate: 139.8 } },
  { name: "Avesh Khan", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 28, stats: { matches: 56, wickets: 66, average: 26.1, strikeRate: 141.2 } },
  { name: "Prasidh Krishna", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 28, stats: { matches: 56, wickets: 61, average: 28.2, strikeRate: 142.5 } },
  { name: "Mukesh Kumar", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 31, stats: { matches: 23, wickets: 24, average: 29.1, strikeRate: 146.8 } },
  { name: "Rahul Chahar", category: "Bowler", basePrice: 0.5, isOverseas: false, country: "India", age: 25, stats: { matches: 54, wickets: 60, average: 25.8, strikeRate: 137.1 } },
  { name: "Varun Chakravarthy", category: "Bowler", basePrice: 0.75, isOverseas: false, country: "India", age: 33, stats: { matches: 61, wickets: 73, average: 22.5, strikeRate: 133.8 } },

  // Australian Bowlers
  { name: "Pat Cummins", category: "Bowler", basePrice: 2.0, isOverseas: true, country: "Australia", age: 31, stats: { matches: 59, wickets: 71, average: 26.8, strikeRate: 142.1 } },
  { name: "Mitchell Starc", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "Australia", age: 35, stats: { matches: 41, wickets: 51, average: 22.8, strikeRate: 139.8 } },
  { name: "Josh Hazlewood", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "Australia", age: 34, stats: { matches: 26, wickets: 32, average: 25.3, strikeRate: 151.2 } },
  { name: "Adam Zampa", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Australia", age: 32, stats: { matches: 36, wickets: 44, average: 24.8, strikeRate: 147.2 } },
  { name: "Nathan Ellis", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Australia", age: 30, stats: { matches: 17, wickets: 20, average: 26.5, strikeRate: 149.3 } },
  { name: "Sean Abbott", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Australia", age: 32, stats: { matches: 18, wickets: 17, average: 31.2, strikeRate: 152.8 } },
  { name: "Jason Behrendorff", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Australia", age: 34, stats: { matches: 22, wickets: 29, average: 24.6, strikeRate: 138.5 } },
  { name: "Riley Meredith", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Australia", age: 28, stats: { matches: 27, wickets: 27, average: 31.9, strikeRate: 158.1 } },
  { name: "Jhye Richardson", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Australia", age: 28, stats: { matches: 27, wickets: 35, average: 26.1, strikeRate: 146.2 } },

  // English Bowlers
  { name: "Mark Wood", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "England", age: 35, stats: { matches: 42, wickets: 48, average: 29.1, strikeRate: 153.2 } },
  { name: "Chris Jordan", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "England", age: 36, stats: { matches: 53, wickets: 49, average: 30.4, strikeRate: 144.9 } },
  { name: "Adil Rashid", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "England", age: 36, stats: { matches: 39, wickets: 31, average: 30.8, strikeRate: 143.1 } },
  { name: "Tymal Mills", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "England", age: 32, stats: { matches: 18, wickets: 17, average: 31.2, strikeRate: 154.8 } },
  { name: "Reece Topley", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "England", age: 31, stats: { matches: 22, wickets: 23, average: 29.8, strikeRate: 144.6 } },
  { name: "Jofra Archer", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "England", age: 29, stats: { matches: 35, wickets: 46, average: 21.3, strikeRate: 138.4 } },

  // South African Bowlers
  { name: "Kagiso Rabada", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 29, stats: { matches: 76, wickets: 102, average: 21.3, strikeRate: 131.2 } },
  { name: "Anrich Nortje", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 31, stats: { matches: 42, wickets: 56, average: 20.8, strikeRate: 135.4 } },
  { name: "Lungi Ngidi", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "South Africa", age: 28, stats: { matches: 51, wickets: 57, average: 27.3, strikeRate: 144.8 } },
  { name: "Tabraiz Shamsi", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "South Africa", age: 34, stats: { matches: 41, wickets: 41, average: 28.7, strikeRate: 142.1 } },
  { name: "Gerald Coetzee", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 24, stats: { matches: 13, wickets: 17, average: 26.8, strikeRate: 152.4 } },
  { name: "Marco Jansen", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "South Africa", age: 24, stats: { matches: 33, wickets: 35, average: 31.4, strikeRate: 155.2 } },
  { name: "Keshav Maharaj", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 34, stats: { matches: 16, wickets: 14, average: 31.9, strikeRate: 141.8 } },

  // New Zealand Bowlers
  { name: "Trent Boult", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "New Zealand", age: 35, stats: { matches: 88, wickets: 106, average: 25.4, strikeRate: 132.9 } },
  { name: "Tim Southee", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "New Zealand", age: 36, stats: { matches: 61, wickets: 67, average: 29.8, strikeRate: 142.1 } },
  { name: "Lockie Ferguson", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "New Zealand", age: 33, stats: { matches: 51, wickets: 67, average: 23.7, strikeRate: 143.5 } },
  { name: "Matt Henry", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 33, stats: { matches: 25, wickets: 28, average: 28.1, strikeRate: 148.9 } },
  { name: "Ish Sodhi", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 32, stats: { matches: 24, wickets: 20, average: 34.1, strikeRate: 145.2 } },
  { name: "Adam Milne", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 32, stats: { matches: 44, wickets: 48, average: 28.9, strikeRate: 147.8 } },

  // West Indian Bowlers
  { name: "Alzarri Joseph", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "West Indies", age: 28, stats: { matches: 24, wickets: 25, average: 30.2, strikeRate: 152.4 } },
  { name: "Obed McCoy", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 28, stats: { matches: 18, wickets: 19, average: 31.5, strikeRate: 153.8 } },
  { name: "Akeal Hosein", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 31, stats: { matches: 10, wickets: 9, average: 35.2, strikeRate: 144.1 } },
  { name: "Sheldon Cottrell", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 35, stats: { matches: 30, wickets: 28, average: 32.1, strikeRate: 148.2 } },

  // Sri Lankan Bowlers
  { name: "Wanindu Hasaranga", category: "Bowler", basePrice: 1.0, isOverseas: true, country: "Sri Lanka", age: 27, stats: { matches: 48, wickets: 67, average: 18.3, strikeRate: 135.7 } },
  { name: "Maheesh Theekshana", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Sri Lanka", age: 24, stats: { matches: 27, wickets: 29, average: 27.8, strikeRate: 141.2 } },
  { name: "Dushmantha Chameera", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 32, stats: { matches: 36, wickets: 36, average: 31.2, strikeRate: 149.8 } },
  { name: "Lahiru Kumara", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 28, stats: { matches: 21, wickets: 19, average: 34.8, strikeRate: 155.2 } },
  { name: "Matheesha Pathirana", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Sri Lanka", age: 22, stats: { matches: 20, wickets: 27, average: 22.1, strikeRate: 136.8 } },

  // Pakistani Bowlers
  { name: "Shaheen Afridi", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "Pakistan", age: 24, stats: { matches: 29, wickets: 33, average: 28.7, strikeRate: 151.2 } },
  { name: "Haris Rauf", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Pakistan", age: 31, stats: { matches: 26, wickets: 32, average: 25.8, strikeRate: 146.8 } },
  { name: "Naseem Shah", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Pakistan", age: 21, stats: { matches: 5, wickets: 6, average: 26.7, strikeRate: 149.1 } },
  { name: "Mohammad Amir", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Pakistan", age: 32, stats: { matches: 50, wickets: 30, average: 46.8, strikeRate: 143.2 } },

  // Bangladeshi Bowlers
  { name: "Mustafizur Rahman", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Bangladesh", age: 29, stats: { matches: 70, wickets: 90, average: 22.7, strikeRate: 138.4 } },
  { name: "Taskin Ahmed", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Bangladesh", age: 29, stats: { matches: 16, wickets: 14, average: 35.1, strikeRate: 151.2 } },
  { name: "Shoriful Islam", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Bangladesh", age: 23, stats: { matches: 9, wickets: 10, average: 31.2, strikeRate: 145.8 } },

  
  // ALL-ROUNDERS (35 players)
  { name: "Hardik Pandya", category: "All-Rounder", basePrice: 2.0, isOverseas: false, country: "India", age: 31, stats: { matches: 132, runs: 2525, wickets: 58, average: 28.5, strikeRate: 150.2 } },
  { name: "Ravindra Jadeja", category: "All-Rounder", basePrice: 1.5, isOverseas: false, country: "India", age: 36, stats: { matches: 240, runs: 2959, wickets: 161, average: 27.6, strikeRate: 128.1 } },
  { name: "Axar Patel", category: "All-Rounder", basePrice: 1.0, isOverseas: false, country: "India", age: 31, stats: { matches: 75, runs: 839, wickets: 71, average: 28.2, strikeRate: 142.3 } },
  { name: "Washington Sundar", category: "All-Rounder", basePrice: 0.75, isOverseas: false, country: "India", age: 25, stats: { matches: 52, runs: 388, wickets: 43, average: 25.9, strikeRate: 124.7 } },
  { name: "Krunal Pandya", category: "All-Rounder", basePrice: 0.5, isOverseas: false, country: "India", age: 34, stats: { matches: 107, runs: 1432, wickets: 72, average: 25.3, strikeRate: 135.8 } },
  { name: "Venkatesh Iyer", category: "All-Rounder", basePrice: 0.5, isOverseas: false, country: "India", age: 30, stats: { matches: 54, runs: 1108, wickets: 15, average: 26.4, strikeRate: 139.6 } },
  { name: "Shivam Dube", category: "All-Rounder", basePrice: 0.75, isOverseas: false, country: "India", age: 31, stats: { matches: 50, runs: 924, wickets: 7, average: 24.3, strikeRate: 145.3 } },
  { name: "Deepak Hooda", category: "All-Rounder", basePrice: 0.5, isOverseas: false, country: "India", age: 29, stats: { matches: 98, runs: 1648, wickets: 16, average: 20.1, strikeRate: 136.2 } },
  { name: "Glenn Maxwell", category: "All-Rounder", basePrice: 1.5, isOverseas: true, country: "Australia", age: 36, stats: { matches: 135, runs: 3089, wickets: 32, average: 26.4, strikeRate: 155.3 } },
  { name: "Marcus Stoinis", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "Australia", age: 35, stats: { matches: 85, runs: 1468, wickets: 31, average: 25.8, strikeRate: 142.2 } },
  { name: "Mitchell Marsh", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "Australia", age: 33, stats: { matches: 51, runs: 961, wickets: 25, average: 30.8, strikeRate: 135.2 } },
  { name: "Cameron Green", category: "All-Rounder", basePrice: 1.5, isOverseas: true, country: "Australia", age: 25, stats: { matches: 23, runs: 452, wickets: 12, average: 28.3, strikeRate: 156.9 } },
  { name: "Sam Curran", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "England", age: 26, stats: { matches: 62, runs: 677, wickets: 66, average: 29.4, strikeRate: 138.7 } },
  { name: "Moeen Ali", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "England", age: 37, stats: { matches: 74, runs: 1162, wickets: 42, average: 23.2, strikeRate: 141.8 } },
  { name: "Liam Livingstone", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "England", age: 31, stats: { matches: 39, runs: 679, wickets: 16, average: 24.3, strikeRate: 146.7 } },
  { name: "Ben Stokes", category: "All-Rounder", basePrice: 1.5, isOverseas: true, country: "England", age: 33, stats: { matches: 45, runs: 935, wickets: 28, average: 23.4, strikeRate: 134.5 } },
  { name: "Chris Woakes", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "England", age: 35, stats: { matches: 35, runs: 183, wickets: 40, average: 30.1, strikeRate: 139.8 } },
  { name: "Dwaine Pretorius", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 35, stats: { matches: 27, runs: 199, wickets: 22, average: 31.4, strikeRate: 153.1 } },
  { name: "Aiden Markram", category: "All-Rounder", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 30, stats: { matches: 68, runs: 1843, wickets: 8, average: 29.1, strikeRate: 138.1 } },
  { name: "Andre Russell", category: "All-Rounder", basePrice: 1.5, isOverseas: true, country: "West Indies", age: 36, stats: { matches: 140, runs: 2517, wickets: 102, average: 29.7, strikeRate: 174.9 } },
  { name: "Jason Holder", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "West Indies", age: 33, stats: { matches: 54, runs: 492, wickets: 55, average: 30.8, strikeRate: 142.8 } },
  { name: "Kyle Mayers", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 32, stats: { matches: 26, runs: 382, wickets: 14, average: 23.8, strikeRate: 144.7 } },
  { name: "Romario Shepherd", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "West Indies", age: 30, stats: { matches: 18, runs: 186, wickets: 13, average: 34.2, strikeRate: 149.2 } },
  { name: "Shakib Al Hasan", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "Bangladesh", age: 37, stats: { matches: 83, runs: 891, wickets: 73, average: 22.7, strikeRate: 121.8 } },
  { name: "Mehidy Hasan", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "Bangladesh", age: 27, stats: { matches: 11, runs: 73, wickets: 7, average: 35.4, strikeRate: 108.9 } },
  { name: "Mohammad Nabi", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 39, stats: { matches: 26, runs: 232, wickets: 17, average: 27.8, strikeRate: 129.0 } },
  { name: "Gulbadin Naib", category: "All-Rounder", basePrice: 0.2, isOverseas: true, country: "Afghanistan", age: 33, stats: { matches: 7, runs: 43, wickets: 4, average: 42.3, strikeRate: 126.5 } },
  { name: "Daryl Mitchell", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "New Zealand", age: 33, stats: { matches: 16, runs: 298, wickets: 3, average: 24.8, strikeRate: 130.1 } },
  { name: "Jimmy Neesham", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 34, stats: { matches: 24, runs: 195, wickets: 15, average: 32.1, strikeRate: 134.5 } },
  { name: "Mitchell Santner", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "New Zealand", age: 32, stats: { matches: 33, runs: 173, wickets: 29, average: 30.8, strikeRate: 125.4 } },
  { name: "Dhananjaya de Silva", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 33, stats: { matches: 39, runs: 573, wickets: 8, average: 19.8, strikeRate: 111.3 } },
  { name: "Dasun Shanaka", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 33, stats: { matches: 58, runs: 670, wickets: 13, average: 17.2, strikeRate: 130.1 } },
  { name: "Imad Wasim", category: "All-Rounder", basePrice: 0.5, isOverseas: true, country: "Pakistan", age: 36, stats: { matches: 23, runs: 191, wickets: 12, average: 29.8, strikeRate: 144.7 } },
  { name: "Shadab Khan", category: "All-Rounder", basePrice: 0.75, isOverseas: true, country: "Pakistan", age: 26, stats: { matches: 19, runs: 154, wickets: 21, average: 26.1, strikeRate: 131.6 } },
  { name: "Vijay Shankar", category: "All-Rounder", basePrice: 0.5, isOverseas: false, country: "India", age: 34, stats: { matches: 65, runs: 939, wickets: 9, average: 20.4, strikeRate: 129.9 } },

  // Afghan Bowlers
  { name: "Rashid Khan", category: "Bowler", basePrice: 1.5, isOverseas: true, country: "Afghanistan", age: 26, stats: { matches: 136, wickets: 158, average: 19.5, strikeRate: 129.8 } },
  { name: "Mujeeb Ur Rahman", category: "Bowler", basePrice: 0.75, isOverseas: true, country: "Afghanistan", age: 23, stats: { matches: 29, wickets: 26, average: 30.1, strikeRate: 143.8 } },
  { name: "Naveen-ul-Haq", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 25, stats: { matches: 29, wickets: 31, average: 27.9, strikeRate: 147.2 } },
  { name: "Fazalhaq Farooqi", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 24, stats: { matches: 16, wickets: 19, average: 28.4, strikeRate: 142.1 } },
  { name: "Noor Ahmad", category: "Bowler", basePrice: 0.5, isOverseas: true, country: "Afghanistan", age: 19, stats: { matches: 14, wickets: 16, average: 26.8, strikeRate: 138.4 } },

  // WICKET-KEEPERS (25 players)
  { name: "MS Dhoni", category: "Wicket-keeper", basePrice: 2.0, isOverseas: false, country: "India", age: 43, stats: { matches: 264, runs: 5243, average: 38.1, strikeRate: 135.9 } },
  { name: "Rishabh Pant", category: "Wicket-keeper", basePrice: 1.5, isOverseas: false, country: "India", age: 27, stats: { matches: 111, runs: 3284, average: 35.3, strikeRate: 147.9 } },
  { name: "Ishan Kishan", category: "Wicket-keeper", basePrice: 1.0, isOverseas: false, country: "India", age: 26, stats: { matches: 89, runs: 2326, average: 28.7, strikeRate: 135.9 } },
  { name: "Sanju Samson", category: "Wicket-keeper", basePrice: 1.0, isOverseas: false, country: "India", age: 30, stats: { matches: 152, runs: 3888, average: 29.5, strikeRate: 136.1 } },
  { name: "KS Bharat", category: "Wicket-keeper", basePrice: 0.5, isOverseas: false, country: "India", age: 31, stats: { matches: 21, runs: 333, average: 18.5, strikeRate: 114.0 } },
  { name: "Dhruv Jurel", category: "Wicket-keeper", basePrice: 0.5, isOverseas: false, country: "India", age: 23, stats: { matches: 15, runs: 197, average: 19.7, strikeRate: 137.1 } },
  { name: "Quinton de Kock", category: "Wicket-keeper", basePrice: 1.5, isOverseas: true, country: "South Africa", age: 32, stats: { matches: 98, runs: 2960, average: 32.1, strikeRate: 135.4 } },
  { name: "Heinrich Klaasen", category: "Wicket-keeper", basePrice: 1.0, isOverseas: true, country: "South Africa", age: 33, stats: { matches: 49, runs: 1088, average: 29.4, strikeRate: 146.8 } },
  { name: "Alex Carey", category: "Wicket-keeper", basePrice: 0.75, isOverseas: true, country: "Australia", age: 33, stats: { matches: 14, runs: 187, average: 18.7, strikeRate: 116.1 } },
  { name: "Matthew Wade", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "Australia", age: 37, stats: { matches: 36, runs: 472, average: 19.7, strikeRate: 129.7 } },
  { name: "Tom Blundell", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "New Zealand", age: 34, stats: { matches: 3, runs: 23, average: 11.5, strikeRate: 88.5 } },
  { name: "Nurul Hasan", category: "Wicket-keeper", basePrice: 0.2, isOverseas: true, country: "Bangladesh", age: 31, stats: { matches: 12, runs: 111, average: 13.9, strikeRate: 130.6 } },
  { name: "Kusal Perera", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 34, stats: { matches: 52, runs: 1140, average: 23.2, strikeRate: 142.5 } },
  { name: "Shai Hope", category: "Wicket-keeper", basePrice: 0.75, isOverseas: true, country: "West Indies", age: 31, stats: { matches: 29, runs: 585, average: 22.5, strikeRate: 123.7 } },
  { name: "Andre Fletcher", category: "Wicket-keeper", basePrice: 0.2, isOverseas: true, country: "West Indies", age: 37, stats: { matches: 10, runs: 152, average: 16.9, strikeRate: 120.6 } },
  { name: "Kyle Verreynne", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 27, stats: { matches: 8, runs: 116, average: 19.3, strikeRate: 126.1 } },
  { name: "Ben McDermott", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "Australia", age: 30, stats: { matches: 14, runs: 220, average: 18.3, strikeRate: 140.1 } },
  { name: "Mohammad Haris", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "Pakistan", age: 23, stats: { matches: 11, runs: 166, average: 15.1, strikeRate: 147.8 } },
  { name: "Lorcan Tucker", category: "Wicket-keeper", basePrice: 0.2, isOverseas: true, country: "Ireland", age: 28, stats: { matches: 3, runs: 31, average: 15.5, strikeRate: 106.9 } },
  { name: "Ben Duckett", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "England", age: 30, stats: { matches: 18, runs: 396, average: 23.3, strikeRate: 133.8 } },
  { name: "Ryan Rickelton", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "South Africa", age: 28, stats: { matches: 6, runs: 95, average: 19.0, strikeRate: 114.5 } },
  { name: "Scott Edwards", category: "Wicket-keeper", basePrice: 0.2, isOverseas: true, country: "Netherlands", age: 28, stats: { matches: 4, runs: 48, average: 16.0, strikeRate: 109.1 } },
  { name: "Rahmanullah Gurbaz", category: "Wicket-keeper", basePrice: 1.0, isOverseas: true, country: "Afghanistan", age: 23, stats: { matches: 35, runs: 746, average: 21.3, strikeRate: 151.7 } },
  { name: "Dinesh Chandimal", category: "Wicket-keeper", basePrice: 0.5, isOverseas: true, country: "Sri Lanka", age: 35, stats: { matches: 66, runs: 1301, average: 22.8, strikeRate: 116.1 } },
  { name: "Jitesh Sharma", category: "Wicket-keeper", basePrice: 0.5, isOverseas: false, country: "India", age: 31, stats: { matches: 40, runs: 730, average: 22.8, strikeRate: 151.6 } },

];

console.log(players.length);


// Export for use in your application
export default players;

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

// const seedDatabase = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("✅ MongoDB Connected");

//     // Clear existing data
//     const deleteFranchises = await Franchise.deleteMany({});
//     const deletePlayers = await Player.deleteMany({});
//     console.log(`🗑️  Cleared ${deletePlayers.deletedCount} players and ${deleteFranchises.deletedCount} franchises`);

//     // Check for duplicates in source data
//     console.log("\n🔍 Checking for duplicates in source data...");
//     const playerNames = {};
//     const duplicates = [];
    
//     players.forEach((player, index) => {
//       if (playerNames[player.name]) {
//         duplicates.push({
//           name: player.name,
//           firstIndex: playerNames[player.name].index,
//           firstCategory: playerNames[player.name].category,
//           secondIndex: index,
//           secondCategory: player.category
//         });
//       } else {
//         playerNames[player.name] = { index, category: player.category };
//       }
//     });

//     if (duplicates.length > 0) {
//       console.log("⚠️  Found duplicate players:");
//       duplicates.forEach(dup => {
//         console.log(`   - "${dup.name}" appears as ${dup.firstCategory} (index ${dup.firstIndex}) and ${dup.secondCategory} (index ${dup.secondIndex})`);
//       });
      
//       // Remove duplicates - keep first occurrence
//       const uniquePlayers = [];
//       const seenNames = new Set();
      
//       players.forEach(player => {
//         if (!seenNames.has(player.name)) {
//           uniquePlayers.push(player);
//           seenNames.add(player.name);
//         }
//       });
      
//       console.log(`📊 After removing duplicates: ${uniquePlayers.length} unique players (from ${players.length} total)`);
//       players = uniquePlayers; // Use the deduplicated array
//     }

//     // Insert franchises
//     const insertedFranchises = await Franchise.insertMany(franchises);
//     console.log(`✅ Inserted ${insertedFranchises.length} franchises`);

//     // Insert players with better error handling
//     console.log(`\n📤 Attempting to insert ${players.length} players...`);
    
//     try {
//       // Use ordered: false to continue inserting even if some fail
//       const insertedPlayers = await Player.insertMany(players, { 
//         ordered: false,
//         rawResult: true 
//       });
      
//       console.log(`✅ Successfully inserted ${insertedPlayers.insertedCount || insertedPlayers.length} players`);
      
//     } catch (bulkError) {
//       // Handle bulk write errors
//       if (bulkError.code === 11000) { // Duplicate key error
//         console.log("⚠️  Some players failed due to duplicate keys");
        
//         const inserted = bulkError.insertedDocs?.length || 0;
//         const failed = bulkError.writeErrors?.length || 0;
        
//         console.log(`✅ Inserted: ${inserted} players`);
//         console.log(`❌ Failed: ${failed} players`);
        
//         if (bulkError.writeErrors && bulkError.writeErrors.length > 0) {
//           console.log("\nFailed players:");
//           bulkError.writeErrors.slice(0, 10).forEach(error => {
//             const failedPlayer = players[error.index];
//             console.log(`   - ${failedPlayer?.name} (${failedPlayer?.category}): ${error.errmsg}`);
//           });
//           if (bulkError.writeErrors.length > 10) {
//             console.log(`   ... and ${bulkError.writeErrors.length - 10} more`);
//           }
//         }
//       } else {
//         throw bulkError; // Re-throw if it's not a duplicate key error
//       }
//     }

//     // Verify final counts
//     const finalPlayerCount = await Player.countDocuments();
//     const finalFranchiseCount = await Franchise.countDocuments();
    
//     console.log("\n📊 Final Database Status:");
//     console.log(`   - Players in DB: ${finalPlayerCount}`);
//     console.log(`   - Franchises in DB: ${finalFranchiseCount}`);
//     console.log(`   - Expected players: ${players.length}`);
    
//     if (finalPlayerCount !== players.length) {
//       console.log(`⚠️  Warning: ${players.length - finalPlayerCount} players were not inserted`);
//     } else {
//       console.log("🎉 All players inserted successfully!");
//     }

//     process.exit(0);
//   } catch (error) {
//     console.error("❌ Error seeding database:", error);
//     process.exit(1);
//   }
// };

// seedDatabase();