const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkPermission = (requiredPermission) => {
    return (req, res, next) => {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ message: 'ko có token.' });
        }

        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {

            const user = decoded.role_id;

            if (user == requiredPermission) {

                req.companyInfo = decoded.company_id;
                req.user_id = decoded.id;
                next();
            } else {
                res.status(403).send('Forbidden');
            }
        });
    };
}
module.exports = checkPermission;
