// require("dotenv").config({ debug: false });
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// const cors = require('cors');
// const fs = require('fs');
// var app = express();

// var employeeRouter = require('./routes/EmployeeRoute');
// var eventRouter = require('./routes/eventsRoutes');
// var bannerRoute = require('./routes/BannerRoute');
// var postRoute = require('./routes/PostRoute');
// var authRoute = require('./routes/AuthRoutes');

// // ===== Setup Upload Directory =====
// const UPLOAD_DIR = path.join(__dirname, 'uploads');
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// // ===== CORS Configuration =====
// const allowedOrigins = [
//   'https://people-connect-1xsa2d3ow-atasi-kulkarnis-projects.vercel.app',
//   'https://people-connect-backend.onrender.com',
//   'http://localhost:5173',
//   'http://localhost:3000'
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   optionsSuccessStatus: 200
// }));

// // ===== View Engine =====
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// // ===== Middleware =====
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/public', express.static(UPLOAD_DIR));

// // ===== Routes =====
// app.use('/api/employees', employeeRouter);
// app.use('/api/event', eventRouter);
// app.use('/api/banner', bannerRoute);
// app.use('/api/engage', postRoute);
// app.use('/api/auth', authRoute);

// // ===== Error Handling =====
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

require("dotenv").config({ debug: false });
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
const fs = require("fs");
var app = express();
const Banners = require("./migrations/Banners");
const Employee = require("./migrations/Employee");
const EventsTable = require("./migrations/EventTable");
const Leaves = require("./migrations/Leaves");
const LikePost = require("./migrations/LikePost");
const PostTable = require("./migrations/PostTable");
const SavePost = require("./migrations/SavePost");
// ===== DATABASE INITIALIZATION =====
const pool = require("./config/db");

async function initializeDatabase() {
  // try {
  //   const createTableQuery = `
  //     CREATE TABLE IF NOT EXISTS Banners (
  //       id SERIAL PRIMARY KEY,
  //       title VARCHAR(255) NOT NULL,
  //       description TEXT,
  //       image_url TEXT NOT NULL,
  //       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //     );
  //   `;

  //   const createEmployeeQuery = `
  //   CREATE TABLE IF NOT EXISTS Banners (
  //     id SERIAL PRIMARY KEY,
  //     first_name VARCHAR(255) NOT NULL,
  //     last_name TEXT,
  //     profile_picture TEXT NOT NULL,
  //      gender TEXT,
  //     employee_id TEXT,
  //       designation TEXT,
  //        department TEXT,
  //         email TEXT,
  //                mobile TEXT,
  //                 office_location TEXT,
  //                   dob TEXT,
  //                     doj TEXT,
  //                       martial_status TEXT,
  //                        reporting_manager TEXT,
  //                          delivery_head TEXT,
  //                            emergency_contact_name TEXT,
  //                                                         emergency_contact TEXT,
  //                                                           emergency_contact_relation TEXT,
  //                                                           blood_group TEXT,
  //                                                           total_experence TEXT,
  //                                                            current_company_experence TEXT,
  //                                                             aadhar TEXT,
  //                                                              pan TEXT,
  //                                                               passport TEXT,
  //                                                               current_address TEXT,
  //                                                               permanent_address TEXT,
  //                                                               resume TEXT,
                                                               

  //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  //   );
  // `;

  //   await pool.query(createTableQuery, createEmployeeQuery);
  //   console.log("✅ Table 'Banners' initialized successfully");
  // } catch (err) {
  //   console.error("❌ Error initializing Banners table:", err.message);
  // }
  Banners();
  Employee();
  EventsTable();
  Leaves();
  LikePost();
  PostTable();
  SavePost();
}

// Initialize on app start
initializeDatabase();

// ===== REST OF YOUR APP CODE =====
var employeeRouter = require("./routes/EmployeeRoute");
var eventRouter = require("./routes/EventsRoutes");
var bannerRoute = require("./routes/BannerRoute");
var postRoute = require("./routes/PostRoute");
var authRoute = require("./routes/AuthRoutes");

// ===== Setup Upload Directory =====
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// ===== CORS Configuration =====
const allowedOrigins = [
  "https://people-connect-1xsa2d3ow-atasi-kulkarnis-projects.vercel.app",
  "https://people-connect-backend.onrender.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
  })
);

// ===== View Engine =====
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// ===== Middleware =====
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(UPLOAD_DIR));

// ===== Routes =====
app.use("/api/employees", employeeRouter);
app.use("/api/event", eventRouter);
app.use("/api/banner", bannerRoute);
app.use("/api/engage", postRoute);
app.use("/api/auth", authRoute);

// ===== Error Handling =====
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
