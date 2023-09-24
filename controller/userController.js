const fs = require('fs');


exports.getalldata = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
exports.getoneuser = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        let users = JSON.parse(data)
        let oneuser = users.find(x => x.id == req.params.id)
        if (oneuser) {
            return res.status(200).json({ status: true, data: oneuser, message: "data get successfully" })
        } else {
            return res.status(200).json({ status: true, data: {}, message: "user not found" })
        }
    } catch (error) {
        console.log("error", error)
    }
}
exports.createdata = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        let newdata = JSON.parse(data)
        let newid = newdata[newdata.length - 1].id + 1
        let newobj = {
            ...req.body,
            id: newid
        }
        newdata.push(newobj)
        await writefiledata("./data/user.json", JSON.stringify(newdata));
        return res.status(200).json({ status: true, data: newobj, message: "data add successfully" })
    } catch (error) {
        console.log("error", error)
    }
}
exports.update = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        let users = JSON.parse(data)
        let oneuser = users.find(x => x.id == req.params.id)
        if (oneuser) {
            if (req.body.name || req.body.email) {
                let newobj = {
                    id: oneuser.id,
                    name: req.body.name ? req.body.name : oneuser.name,
                    email: req.body.email ? req.body.email : oneuser.email,
                }
                users.splice(users.findIndex(x => x.id == oneuser.id), 1, newobj)
                await writefiledata("./data/user.json", JSON.stringify(users));
                return res.status(200).json({ status: true, data: newobj, message: "data update successfully" })
            } else {
                return res.status(401).json({ status: false, data: {}, message: "require only name or email key" })
            }
        } else {
            return res.status(401).json({ status: false, data: {}, message: "user not found" })
        }
    } catch (error) {
        console.log("error", error)
    }
}
exports.deletedata = async (req, res) => {
    try {
        let data = await readFiledata("./data/user.json", "utf8");
        let users = JSON.parse(data)
        let oneuser = users.find(x => x.id == req.params.id)
        if (oneuser) {
            users.splice(users.findIndex(x => x.id == oneuser.id), 1)
            await writefiledata("./data/user.json", JSON.stringify(users));
            return res.status(200).json({ status: true, data: {},message: "data delete successfully" })
        } else {
            return res.status(401).json({ status: false, data: {}, message: "user not found" })
        }
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
const writefiledata = (path, data) => {
    return new Promise((myResolve, myReject) => {
        fs.writeFile(path, data, (err, data) => {
            if (err) {
                myReject(err);
            } else {
                myResolve(true);
            }
        })
    });
}
