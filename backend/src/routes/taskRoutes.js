const express = require("express");

const prisma =
  require("../lib/prisma");

const router = express.Router();


// GET TASKS
router.get("/", async (req, res) => {

  const tasks =
    await prisma.task.findMany({
      include: {
        assignedTo: true
      }
    });

  res.json(tasks);
});


// CREATE TASK
router.post("/", async (req, res) => {

  try {

    const {
      title,
      description,
      assignedToId,
      dueDate
    } = req.body;

    const task =
      await prisma.task.create({
        data: {
          title,
          description,
          assignedToId,
          dueDate: new Date(dueDate)
        }
      });

    res.json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Task creation failed"
    });
  }
});


// COMPLETE TASK
router.put("/:id", async (req, res) => {

  const id =
    Number(req.params.id);

  const task =
    await prisma.task.update({
      where: { id },

      data: {
        status: "DONE"
      }
    });

  res.json(task);
});


// DELETE TASK
router.delete("/:id", async (req, res) => {

  const id =
    Number(req.params.id);

  await prisma.task.delete({
    where: { id }
  });

  res.json({
    message: "Task deleted"
  });
});

module.exports = router;