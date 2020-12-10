module.exports =
    {
        initE: initExpress
    }

const bodyParser = require('body-parser')


function initExpress(app) {
    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

    app.use(function (req,res, next){
        req.resources = req.resources || {};
        next();
    })
}

