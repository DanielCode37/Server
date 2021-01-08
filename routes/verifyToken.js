const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.send("access denied");
    }
    try {
        const verified = jwt.verify(token, "nonOSGnsognasbfins08i3bakng");
        req.user = verified;
    }
    catch (error) {
        res.send("invalid token");
    }
}