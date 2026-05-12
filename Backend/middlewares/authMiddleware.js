// const User = require("../models/userModel");

// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const authMiddleware = asyncHandler(async (req, res, next) => {
//   let token;
//   if (req?.headers?.authorization?.startsWith("Bearer")) {
//     token = req.headers.authorization.split(" ")[1];

//     try {
//       if (token) {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         // console.log(decoded);
//         if (!user) {
//   throw new Error("User not found");
// }
// req.user = user;
// next();
//       }
//     } catch (error) {
//       throw new Error("Not Authorized token expired,Please Login again");
//     }
//   } else {
//     throw new Error("THere is no token attached to header");
//   }
// });

const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ FIX: fetch user from DB
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      message: "No token provided",
    });
  }
});

// const isAdmin = asyncHandler(async (req, res, next) => {
//   const { email } = req.user;
//   const adminUser = await User.findOne({ email });

//   if (adminUser.role !== "admin") {
//     throw new Error("Your are not an admin");
//   } else {
//     next();
//   }
// });


const isAdmin = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (user.role !== "admin") {
    return res.status(403).json({ message: "You are not an admin" });
  }

  next();
});

module.exports = { authMiddleware, isAdmin };
