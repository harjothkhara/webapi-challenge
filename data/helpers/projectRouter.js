const express = require("express");

const db = require("./projectModel.js"); //bringing in data

const router = express.Router(); //declaring router

//Route Handlers

//Read
router.get("/", async (req, res) => {
  try {
    const projects = await db.get();
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "The projects' information could not be retrieved." });
  }
});

//Read by id
router.get("/:id/actions", async (req, res) => {
  try {
    const project = await db.getProjectActions(req.params.id);
    res.status(200).json(project);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "The projects' information could not be retrieved." });
  }
});

//Create
router.post("/",validateProject, async (req, res) => {
    try {
      const newProject = await db.insert(req.body);
      res.status(200).json(newProject);  
    } catch(error) {
      console.log(error)
      res.status(500).json({ message: "There was an error while saving the project to the database." });
    }
});

//Delete
router.delete("/:id", validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await db.remove(req.params.id));   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing project!" });
  }
});

//Update
router.put("/:id", validateProjectId, async (req, res) => {
  try {
    res.status(200).json(await db.update(req.params.id, req.body))
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating your project" });
    }
  
});

//middleware for CRUD

function validateProject(req, res, next) {
  if (!req.body.name) {
      res.status(400).json({message: "Please add your project name"})
  } else if (!req.body.description) {
      res.status(400).json({message: "Please add a project description"})
  } next(); 
};

// making sure the project we want to update or delete actually exists

function validateProjectId(req, res, next) {
  if (!req.params.id) {
      res.status(400).json({message: "Invalid project id."})
  } else {
      req.project = `${req.params.id}`;
  } next(); 
}

module.exports = router;