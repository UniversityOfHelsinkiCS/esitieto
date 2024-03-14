const startUpMiddleware = (startUp) => {
    
    return (req, res, next) => {
        console.log("startUp: ", startUp);
        req.kirjauduttu = startUp ? true : req.kirjauduttu;
        res.kirjauduttu = startUp ? true : req.kirjauduttu;

        console.log("req.kirjauduttu: ", req.kirjauduttu);
        console.log("res.kirjauduttu: ", res.kirjauduttu);

        startUp = false;
        next();
    };
};

module.exports = startUpMiddleware;