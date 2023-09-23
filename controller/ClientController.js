const fs = require('fs');


const getalldata = async (req, res) => {
    try {
        let data = await readFiledata("./Data/FileRead-Write.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
const createdata=async (req, res) => {
    try {
        let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
        let data = JSON.parse(readdata);
        let user = data.find((x) => x.id == req.params.id);
        return res.status(200).json({ status: true, data: user, Message: "Data got Successfully" }); //with params ..in url use have to direct write id
    }
    catch (error) {
        console.log("error", error)
    }
}
const getonedata=async (req, res) => {

    try {
        let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
        let data = JSON.parse(readdata);
        data.push({ ...req.body, id: await Dataid() });
        WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
        return res.status(200).json({ status: true, data, Message: "Data added Successfully" });
    }
    catch (error) {
        console.log("error", error)
    }
}
const deletedata=async (req, res) => {
    try {
        let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
        let data = JSON.parse(readdata);
        let index = data.findIndex((x) => x.id == req.params.id);
        data.splice(index, 1);
        WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
        return res.status(200).json({ status: true, Message: "Data deleted Successfully" });
    }
    catch (error) {
        console.log("error", error)
    }
}
const updatedata=async (req, res) => {
    try {
        let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
        let data = JSON.parse(readdata);
        let index = data.findIndex((x) => x.id == req.params.id);
        data.splice(index, 1, { ...req.body, id: Number(req.params.id) });
        WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
        return res.status(200).json({ status: true, data: req.body, Message: "Data updated Successfully" });
    }
    catch (error) {
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
const WriteFileData = (path, content) => {
    return new Promise((myResolve, myReject) => {
        fs.writeFile(path, content, (err) => {
            if (!err) {
                myResolve(true);
            }
            else {
                myReject(err);
            }
        });
    });
}
const Dataid = async () => {
    let str = 0;
    var idarr = '1234567890';
    for (i = 0; i < 6; i++) {
        str += idarr[Math.trunc(Math.random() * (idarr.length))];
    }
    let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
    let data = JSON.parse(readdata);
    let obj = data.find(x => x.id == Number(str));
    if (obj != undefined) {
        await Dataid();
    }
    else {
        return Number(str);
    }

}
module.exports = {
    getalldata,
    createdata,
    getonedata,
    updatedata,
    deletedata
};