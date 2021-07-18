const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

//Item Model
const Item = require('../../models/Item');

// @router GET api/items
// @desc   Get all items
// @access Public
router.get('/', (req, res) => { // refer to server.js line 5 and 22 (the '/' represents the GET "api/items" endpoint)
    Item.find()
        .sort({ date: -1 }) // descendings
        .then(items => res.json(items))
}); 

// @router POST api/items
// @desc   Create an item
// @access Private
router.post('/', (req, res) => { // refer to server.js (the '/' represents the GET "api/items" endpoint)
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
}); 

// @router Delete api/items:id
// @desc   Delete an item 
// @access Private
router.delete('/:id', (req, res) => { // refer to server.js (the '/' represents the GET "api/items" endpoint)
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json( {success: false} ));
});

module.exports = router;