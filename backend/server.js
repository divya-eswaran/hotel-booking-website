const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

/* ==============================
   MongoDB Connection
============================== */

mongoose.connect("mongodb://127.0.0.1:27017/hotelDB")
.then(() => console.log("MongoDB Connected 💗"))
.catch(err => console.log(err));


/* ==============================
   SCHEMAS (All in One File)
============================== */

// Hotel Schema
const hotelSchema = new mongoose.Schema({
    name: String,
    location: String
});
const Hotel = mongoose.model("Hotel", hotelSchema);

// Room Schema
const roomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    roomType: String,
    price: Number
});
const Room = mongoose.model("Room", roomSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});
const Customer = mongoose.model("Customer", customerSchema);

// Booking Schema
const bookingSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room" },
    checkIn: Date,
    checkOut: Date,
    totalAmount: Number
});
const Booking = mongoose.model("Booking", bookingSchema);


/* ==============================
   ROUTES
============================== */

// 📌 Add Booking
app.post("/book", async (req, res) => {
    try {
        const { name, email, phone, roomType, checkIn, checkOut } = req.body;

        // Save Customer
        const customer = new Customer({ name, email, phone });
        await customer.save();

        // Find Room
        const room = await Room.findOne({ roomType });

        if (!room) {
            return res.json({ message: "Room not found ❌" });
        }

        // Create Booking
        const booking = new Booking({
            customerId: customer._id,
            roomId: room._id,
            checkIn,
            checkOut,
            totalAmount: room.price
        });

        await booking.save();

        res.json({ message: "Booking Successful 💗" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// 📌 View All Bookings (JOIN using populate)
app.get("/bookings", async (req, res) => {

    const bookings = await Booking.find()
        .populate("customerId")
        .populate({
            path: "roomId",
            populate: { path: "hotelId" }
        });

    res.json(bookings);
});


/* ==============================
   START SERVER
============================== */

app.listen(5000, () => {
    console.log("Server running on port 5000 🚀");
});