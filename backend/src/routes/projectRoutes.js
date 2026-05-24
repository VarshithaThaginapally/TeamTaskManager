const express = require("express");

const prisma = require("../lib/prisma");

const router = express.Router();


// CREATE PROJECT
router.post("/", async (req, res) => {

  const { name, description } = req.body;

  const project =
    await prisma.project.create({
      data: {
        name,
        description
      }
    });

  res.json({
    message: "Project created",
    project
  });
});


// GET PROJECTS
router.get("/", async (req, res) => {

  const projects =
    await prisma.project.findMany();

  res.json(projects);
});

module.exports = router;