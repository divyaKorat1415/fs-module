const express = require('express')
const app = express()
const port = 3001
const router = require('./router')
app.use(express.json())


app.use("/api",router)

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
