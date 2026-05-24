const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = require("../lib/prisma");

const router = express.Router();


// SIGNUP
router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK EXISTING USER
    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {

      return res.json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const hash =
      await bcrypt.hash(password, 10);

    // CREATE USER
    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash: hash
        }
      });

    res.json({
      message: "Signup successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Signup failed"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {

      return res.json({
        message: "User not found"
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!valid) {

      return res.json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { id: user.id },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true
    });

    res.json({
      message: "Login successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Login failed"
    });
  }
});

module.exports = router;