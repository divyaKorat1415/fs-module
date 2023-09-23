

const express = require('express');
const app = express();
const port = 3006;
app.use(express.json())
const fs = require('fs');


app.get('/getstudentata', async (req, res) => {
    let data = await readFiledata("./Data/FileRead-Write.json", "utf8");
    return res.status(200).json({ status: true, data: JSON.parse(data), message: "data get successfully" })
})
app.get('/getOnestudentata/:id', async (req, res) => {
    let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
    let data = JSON.parse(readdata);
    let user = data.find((x) => x.id == req.params.id);
    return res.status(200).json({ status: true, data: user, Message: "Data got Successfully" }); //with params ..in url use have to direct write id
});
app.post('/addStudentData', async (req, res) => {
    let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
    let data = JSON.parse(readdata);
    let id =data[data.length-1].id;
    data.push({ ...req.body, id: id +1});
    WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
    return res.status(200).json({ status: true, data, Message: "Data added Successfully" });
});
app.delete('/deleteStudentData/:id', async (req, res) => {
    let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
    let data = JSON.parse(readdata);
    let index = data.findIndex((x) => x.id == req.params.id);
    data.splice(index, 1);
    WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
    return res.status(200).json({ status: true, Message: "Data deleted Successfully" });
});
app.put('/editStudentData/:id', async (req, res) => {
    let readdata = await readFiledata("./Data/FileRead-Write.json", "utf8");
    let data = JSON.parse(readdata);
    let index = data.findIndex((x) => x.id == req.params.id);
    data.splice(index, 1, { ...req.body, id: Number(req.params.id) });
    WriteFileData("./Data/FileRead-Write.json", JSON.stringify(data));
    return res.status(200).json({ status: true, data: req.body, Message: "Data updated Successfully" });
});

app.listen(port, () => {
    console.log('Example app listening at port:%s', port);
});

const readFiledata = (path, encoding) => {
    return new Promise((myResolve, myReject) => {
        fs.readFile(path, encoding, (err, data) => {
            if (!err) {
                myResolve(data);
            }
            else {
                myReject(err);
            }
        });

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
