const express = require('express');
require('dotenv').config();
const cors = require('cors')
const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

const authRouter = require("./src/routers/authen/auth");
const userRouter = require("./src/routers/admin/user");
const categoryRouter = require("./src/routers/admin/category");
const dashboardRouter = require("./src/routers/admin/dashboard");
const menuRouter = require("./src/routers/admin/menu");
const langsRouter = require("./src/routers/admin/langs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*"
    })
);

app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api', dashboardRouter);
app.use('/api/menu', menuRouter);
app.use('/api/lang', langsRouter);


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});