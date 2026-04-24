const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

/* ======================
   DATABASE CONNECTION
====================== */
mongoose.connect("mongodb://127.0.0.1:27017/hotelDB")
.then(() => console.log("MongoDB Connected 💗"))
.catch(err => console.log(err));

/* ======================
   USER MODEL
====================== */
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);

/* ======================
   BOOKING MODEL
====================== */
const bookingSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    roomType: String,
    checkIn: Date,
    checkOut: Date,
    totalAmount: Number
});
const Booking = mongoose.model("Booking", bookingSchema);

/* ======================
   REGISTER
====================== */
app.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: "User already exists ❌" });
    }

    await new User({ email, password }).save();
    res.json({ message: "Registered 💗" });
});

/* ======================
   LOGIN
====================== */
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });

    if (!user) {
        return res.status(401).json({ message: "Invalid email or password ❌" });
    }

    res.json({ message: "Login success 💗" });
});

/* ======================
   BOOK ROOM
====================== */
app.post("/book", async (req, res) => {
    const { name, email, phone, roomType, checkIn, checkOut } = req.body;

    // validation
    if (!/^\d{10}$/.test(phone)) {
        return res.status(400).json({ message: "Invalid phone ❌" });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
        return res.status(400).json({ message: "Invalid dates ❌" });
    }

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const pricePerDay = 2000;
    const totalAmount = days * pricePerDay;

    await new Booking({
        name,
        email,
        phone,
        roomType,
        checkIn,
        checkOut,
        totalAmount
    }).save();

    res.json({
        message: "Booking Successful 💗",
        totalAmount,
        days
    });
});

/* ======================
   GET BOOKINGS
====================== */
app.get("/bookings", async (req, res) => {
    res.json(await Booking.find());
});

/* ======================
   DELETE BOOKING
====================== */
app.delete("/bookings/:id", async (req, res) => {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted ❌" });
});

/* ======================
   SERVER START
====================== */
app.listen(5000, () => console.log("Server running 🚀"));