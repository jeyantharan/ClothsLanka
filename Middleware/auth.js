const jwt = require("jsonwebtoken");

const User = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(authHeader == null){
        res.status(401).send("unauthorized");
    }else{
        const decoded = jwt.verify(token, 'ClothsLanka');
        req.user = decoded;
        next();
    }
  };

  module.exports = { User };
