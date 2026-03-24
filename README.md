# 🏨 Hotel Room Booking System

A full‑stack **Hotel Room Booking web application** built with HTML, CSS, JavaScript (frontend) and Node.js, Express, MongoDB (backend).  
This project allows users to book hotel rooms online, store reservations in a database, and view/manage bookings.

---

## ✨ Features
### Frontend
- 📋 **Reservation Form**: Collects personal details, booking info, and special requests.
- 🛏 **Room Selection**: Choose between Single, Double, or Suite.
- 📅 **Date Picker**: Select check‑in and check‑out dates.
- 🖨 **Print Receipt**: Generate a printable booking receipt.
- 🎨 **Modern UI**: Responsive card layout with hover effects.

### Backend
- 💾 **MongoDB Integration**: Stores hotels, rooms, customers, and bookings.
- 🔗 **REST API Endpoints**:
  - `POST /book` → Create a new booking
  - `GET /bookings` → View all bookings (with populated customer, room, and hotel details)
- 🛠 **Schemas**:
  - Hotel
  - Room
  - Customer
  - Booking
- 🚀 **Express Server**: Runs on port `5000`.

---

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Other**: CORS, Fetch API


