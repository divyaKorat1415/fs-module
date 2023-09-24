const express = require('express')
const router = express.Router()
const { getalldata, createdata, getoneuser, update, deletedata} = require('../../controller/userController');

// getdata 
router.get('/', getalldata)

// adddata
router.post('/', createdata)

//get one data
router.get('/:id', getoneuser)

// uapdate data
router.patch('/:id', update)

// delete data
router.delete('/:id', deletedata)


module.exports = router
