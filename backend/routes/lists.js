const express = require('express');
const router = express.Router(); // initialize express router
const { getAllLists, getSingleList , createList, deleteList, updateList } = require('../controllers/listsController'); // import controller
const requireAuth = require('../middleware/requireAuth'); // import middleware

router.use(requireAuth); // use middleware

// Get all lists
router.get('/', getAllLists);

//Get Single list
router.get('/:id', getSingleList);

// Post new list
router.post('/', createList);

//Delete list
router.delete('/:id', deleteList);

//Update list
router.patch('/:id', updateList);

module.exports = router; // export router