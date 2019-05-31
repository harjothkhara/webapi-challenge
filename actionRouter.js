const express = require("express");
const router = express.Router;
const db = require("./data/helpers/actionModel.js");

router.get("/", async (req, res) => {
    try {
        const actions = await db.get();
        actions.status(200).json(actions);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        const action = db.get(id);
        if(action){
            res.status(200).json(action);
        } else {
            res.status(404).json({ message: "error"})
        }
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.post("/", async (req, res) => {
    const action = req.body;
    try {
        db.insert(action);
    } catch(error){
        res.status(500).json({ message: "error"})
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try{
        db.remove(id);
    } catch(error){
        res.status(500).json({ message: "error"});
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const action = req.body;
    try {
        db.update(id, action);
    } catch(error) {
        res.status(500).json({ message: "error"})
    }
});

module.exports = router;