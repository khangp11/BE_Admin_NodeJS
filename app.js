const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const userRouter = require("./src/routers/user");
const categoryRouter = require("./src/routers/category");
const dashboardRouter = require("./src/routers/dashboard");
const menuRouter = require("./src/routers/menu");
const langsRouter = require("./src/routers/langs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(
    cors({
        origin: "*"
    })
);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/menu', menuRouter);
app.use('/api/lang', langsRouter);


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});