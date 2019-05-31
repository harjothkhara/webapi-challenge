const express = require("express");
const router = express.Router;
const db = require("./data/helpers/projectModel")

router.get("/", async (req, res) => {
    try {
        const projects = await db.get();
        projects.status(200).json(projects);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const project = db.get(id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: "error"})
        }
    } catch(error) {
        res.status(500).json({ message: "error"})
    }
});

router.post("/", async (req, res) => {
    const project = req.body;
    try {
        db.insert(project);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        db.remove(id);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const project = req.body;
    try {
        db.update(id, project);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

module.exports = router;