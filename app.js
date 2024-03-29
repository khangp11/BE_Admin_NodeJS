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
const siteRouter = require("./src/routers/admin/site");
const slideShowRouter = require("./src/routers/admin/slideShow");
const uploadRouter = require("./src/routers/upload");
const listmenuRouter = require("./src/routers/admin/listmenu");



const checkPermission = require("./src/Middleware/permissionsMiddleware");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "*"
    })
);

app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api', dashboardRouter);
app.use('/api', menuRouter);
app.use('/api/lang', langsRouter);
app.use('/api/site', siteRouter);
app.use('/api/slideshow', slideShowRouter);
app.use('/api/media', uploadRouter);
app.use('/api', listmenuRouter);


app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});