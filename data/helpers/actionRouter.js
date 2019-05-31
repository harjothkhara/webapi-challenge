const express = require("express");

const db = require("./actionModel.js"); //bringing in data

const router = express.Router(); //declaring router

//Route Handlers

//Read
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

//Read by id
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

//Create
router.post("/", validateAction, async (req, res) => {
    try {
      const newAction = await db.insert(req.body);
        res.status(200).json(newAction);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: "There was an error while saving the action to the database."});
    }
  
});

//Delete
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

//Update
router.put("/:id", validateActionId, async (req, res) => {
    try {
        res.status(200).json(await db.update(req.params.id, req.body));
    } catch (error) {
     console.log(error); 
    res.status(500).json({message: "Something went wrong when you made your request."})
    }
});

//middleware for CRUD

function validateAction (req, res, next) {
    if (!req.body.project_id) {
        res.status(400).json({ message: "Please correct your action id."})
    } else if (!req.body.description) {
        res.status(400).json({message: "Please provide a description for your action."})
    } else if (!req.body.notes) {
       res.status(400).json({message: "Please add some notes about the action!"})
    } next(); 
   }

// making sure the action we want to update or delete actually exists

function validateActionId(req, res, next) {
    if (!req.params.id) {
        res.status(400).json({message: "invalid action id"});
    } else {
        req.action = `${req.params.id}`; 
        next(); 
    }
}


module.exports = router;