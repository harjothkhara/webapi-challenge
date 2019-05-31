const express = require("express");

const router = express.Router();
const db = require("./data/helpers/actionModel.js");

router.get("/", async (req, res) => {
  try {
    const actions = await db.get();
    res.status(200).json(actions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The actions' information could not be retrieved." });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.get(id);
    if (action) {
      res.status(200).json(action);
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "The action's information could not be retrieved." });
  }
});

router.post("/", async (req, res) => {
  const action = req.body;
  if (!action.project_id || action.description || action.ntoes) {
    res.status(400).json({
      message: "Please provide a project ID, notes and a description."
    });
  } else {
    try {
      const newAction = await db.insert(action);
      if (newAction) {
        res.status(200).json(newAction);
      } else {
        res.status(500).json({
          message: "There was an error while saving the action to the database."
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong when you made your request." });
    }
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const action = await db.get(id);
    if (action) {
      const deleted = await db.remove(id);
      if (deleted) {
        res.status(200).json(action);
      } else {
        res.status(500).json({ message: "The action could not be removed." });
      }
    } else {
      res
        .status(404)
        .json({ message: "The action with the specified ID does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong when you made your request." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const action = req.body;
  if (!action.project_id || action.description || action.notes) {
    res
      .status(400)
      .json({
        message: "Please provide a project ID, notes and a description."
      });
  } else {
    try {
      const edited = await db.update(id, action);
      if (edited) {
        res.status(200).json(edited);
      } else {
        res
          .status(500)
          .json({ message: "The post information could not be modified." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong when you made your request." });
    }
  }
});

module.exports = router;