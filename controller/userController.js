const fs = require('fs');


const getalldata = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
const createdata  = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
const getonedata  = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
const updatedata  =async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
const deletedata  =async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
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


module.exports = {
    getalldata,
    createdata,
    getonedata,
    updatedata,
    deletedata
};