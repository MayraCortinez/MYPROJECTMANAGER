const express = require('express');
const router = express.Router();

const { list, store, detail, update, remove, addCollaborator, removeCollaborator } = require('../controllers/projectsController')

/* /api/projects */

router
        .get('/', list)
        .post('/', store) 
        .get('/:id', detail)
        .put('/:id', update)
        .delete('/:id', remove) 
        .get('/collaborator/add', addCollaborator)
        .delete('/collaborator/remove', removeCollaborator) 



module.exports = router;
