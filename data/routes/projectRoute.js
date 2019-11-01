const router = require('express').Router()

const Projects = require('../helpers/projectModel')
const Actions = require('../helpers/actionModel')



router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No project found by that ID!"})
        } else {
            res.status(200).json(project)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.post('/', (req, res) => {
    Projects.insert(req.body)
    .then(project => {
        res.status(201).json(project)({message: "good job"})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)({message: "get good"})
    })
})

router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No dude NO project exists by that ID!"})
        } else {
            res.Status(200)({message: "deleted"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})


router.put('/:id', (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(project => {
        if (!project) {
            res.status(404).json({message: "No dude NO project exists by that ID!"})
        } else {
            res.status(201).json(project)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

router.get("/:id/actions",  (req, res) => {
    const id = req.params.id;
    const all = {...req.body, project_Id:id}
    Projects.getProjectActions(id)
      .then(actions => {
        //   console.log(actions)
        if(actions){
            res.status(200).json(actions)
        } else{
            res.status(404).json({ message: "The action with the specified ID does not exist." })
       }
      })
      .catch(err => {
        res.status(500).json({ error: "did not get action" });
      });
});

module.exports = router;