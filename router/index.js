const express = require('express')
const router = express.Router()
const fs = require('fs');


router.get('/getuser',async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
})

const readFiledata = (path, encoding) => {
    return new Promise((myResolve, myReject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (err) {
                myReject(err);
            } else {
                myResolve(data);
            }
        })
    });
}

module.exports = router