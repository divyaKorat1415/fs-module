const express = require('express')
const router = express.Router()
const fs = require('fs');
const { getalldata, createdata, getonedata, deletedata, updatedata } = require('../../Controller/ClientController');


router.get('/getclientdata',getalldata);
router.get('/getOneclientdata/:id', createdata);
router.post('/addclientdata', getonedata);
router.delete('/deleteclientdata/:id', deletedata);
router.put('/editclientdata/:id', updatedata);


module.exports = router