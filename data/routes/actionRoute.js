const express = require('express');

const Projects = require('../helpers/projectModel')
const Actions = require('../helpers/actionModel');
const router = express.Router();

router.get('/:id', validateActionId, (req, res) => {
    const id = req.params.id;
    Actions.get(id)
    .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: "failed to retrieve action" });
      });
})


router.post("/", (req, res) => {
    const newAction = req.body
    console.log(req.body)
    console.log(newAction)
    console.log(Actions)
    Actions.insert(newAction)
      .then(user => {
        console.log(user)
        res.status(200).json(user);
      })
      .catch(err => {
        console.log("post error", err);
        res.status(500).json({ error: "action not added" });
      });
});


router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Actions.remove(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "cant delete" });
      });
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    Actions.update(id, changes)
      .then(updated => {
        res.status(200).json(updated);
      })
      .catch(err => {
        res.status(500).json({ error: "did not get changed" });
      });
});


function validateActionId(req, res, next) {
  let actions = req.params.id;

  Actions.get(actions)
    .then(action => {
      if (action) {
        next();
        req.action = action;
      } else {
        res.status(400).json({ message: "action not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "no way, jose" });
    });
  }

module.exports = router;