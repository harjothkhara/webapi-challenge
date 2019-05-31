const express = require("express");
const router = express.Router;
const db = require("./data/helpers/projectModel.js")

router.get("/", async (req, res) => {
    try {
        const projects = await db.get();
        res.status(200).json(projects);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const project = await db.get(id);
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
        const newProject = await db.insert(project);
        if (newProject) {
            res.status(200).json(newProject);
        }else {
            res.status(500).json({ message: "error "})
        }
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const project = await db.get(id);
        if (project) {
            const deleted = await db.remove(id);
            if (deleted) {
                res.status(200).json(project);
            } else {
                res.status(500).json({ message: "could not delete" });
            }
        } else {
            res.status(404).json({ message: "error"})
        }
       
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const project = req.body;
    try {
        const edited = await db.update(id, project);
        if (edited) {
            res.status(200).json(edited);
        } else {
            res.status(404).json({ message: "error"})
        }
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

module.exports = router;