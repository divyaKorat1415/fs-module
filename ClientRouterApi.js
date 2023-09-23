const express = require('express');
const app = express();
const port = 3007;
const router = require('./Router/ClientRouter/ClientRouter')
app.use(express.json());
app.use("/", router);
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
