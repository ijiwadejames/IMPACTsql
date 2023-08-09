/** @format */

require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
// const allowedOrigins = require("./backend/config/allowedOrigins");
const { logger } = require("./backend/middleware/logEvents");
const errorHandler = require("./backend/middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./backend/middleware/credentials");
const PORT = process.env.PORT || 4000;
// const morgan = require("morgan");

// Connect to MySQL
require("./database/connection");

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
// app.use(credentials);

// Cross Origin Resource Sharing
// app.use(cors(allowedOrigins));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "./client/public")));

const allowedOrigins = ["http://localhost:3000"];

const corsOptions = {
  origin: allowedOrigins,
  methods: ["GET", "POST", "UPDATE", "DELETE", "PUT", "DESTROY"],
};

app.use(cors(corsOptions));

// Cross Origin Resource Sharing
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         const msg =
//           "The CORS policy for this site does not access the specified origin";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );

// routes
app.use("/api/user", require("./backend/routes/user"));
app.use("/api/post", require("./backend/routes/post"));
app.use("/api/commentsandlikes", require("./backend/routes/candl"));
app.use("/api/connection", require("./backend/routes/connection"));
app.use("/api/messaging", require("./backend/routes/messaging"));
app.use("/api/profile", require("./backend/routes/profile"));
app.use("/api/engagement", require("./backend/routes/engagement"));
app.use("/api/mail", require("./backend/routes/mail"));

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "client/public", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
