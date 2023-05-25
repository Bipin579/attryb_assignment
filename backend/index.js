const express = require("express");
const { connectMongoose } = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/UserRoute");
const OEMRoutes = require("./routes/OEMspecsRoute");
const DealerRoute = require("./routes/dealerInventoryRoutes")
const MarketplaceInventoryRoute = require("./routes/marketplaceInventoryRoute");

// Connect to the database
connectMongoose();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/oem", OEMRoutes);
app.use("/api/v2/dealer", DealerRoute);
app.use("/api/v2/market", MarketplaceInventoryRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Attryb!");
});

// Start the server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
