const express = require('express')
const app = express()
const port = 3001
const fs = require('fs');

app.use(express.json())

app.get('/api/getuser', async (req, res) => {
    let data = await readFiledata("./data/user.json", "utf8");
    return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
})
app.post('/api/adduser',async (req, res) => {
    let readdata = await readFiledata("./data/user.json", "utf8");
    let data = JSON.parse(readdata)
    data.push(req.body)
    await writefiledata("./data/user.json", JSON.stringify(data));

    return res.status(200).json({ status: true, data, message: "data add successfully" })
})
app.get('/api/getoneuser/:id', async (req, res) => {
    let readdata = await readFiledata("./data/user.json", "utf8");
    let data = JSON.parse(readdata)
    let user = data.find((post) => post.id == req.params.id)
    return res.status(200).json({ status: true, data: user, message: "data get successfully" })
})
app.post('/api/update/:id', (req, res) => {
    let index = data.findIndex((post) => post.id == req.params.id)
    let updateuser = data.splice(index, 1, { ...req.body, id: Number(req.params.id) });
    return res.status(200).json({ status: true, data: req.body, message: "data update successfully" })
})
app.delete('/api/delete/:id', (req, res) => {
    let index = data.findIndex((post) => post.id == req.params.id)
    let updateuser = data.splice(index, 1);
    return res.status(200).json({ status: true, message: "data delete successfully" })
})
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
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

const writefiledata = (path, content) => {
    return new Promise((myResolve, myReject) => {
        fs.writeFile(path, content, (err) => {
            if (err) {
                myReject(err);
            } else {
                myResolve(true);
            }
        })
    });
}