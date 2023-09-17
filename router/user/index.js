const express = require('express')
const router = express.Router()
const { getalldata, createdata, getonedata, updatedata, deletedata} = require('../../controller/userController');

// getdata 
router.get('/',getalldata)

// adddata
router.post('/',createdata)

// get one data
router.get('/:id',getonedata)

// update data
router.post('/:id',updatedata)

//delete data
router.delete('/:id',deletedata)

module.exports = router
