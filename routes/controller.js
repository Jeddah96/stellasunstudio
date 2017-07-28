var fs       = require('fs'),
    express  = require('express'),
    passport = require('passport'),
    Category = require("../models/category");

var router  = express.Router();

// INDEX
router.get("/", function(req, res){
    res.render("index");
});

// CATEGORY ROUTING
router.get("/:category", function(req, res){
    Category.findOne({url: req.params.category}, function(err, category){
        if (err) {
            colsole.log(err);
            res.redirect("/");
        } else {
            if(!category) {
                res.render("404");
            } else {
                res.redirect("/" + req.params.category + "/" + category.pages[0].url);
                // res.render("category/show", {category:category});
            }   
        }
    })
});

// PAGE ROUTING
router.get("/:category/:page", function(req, res){
    var page;
    Category.findOne({url: req.params.category}, function(err, category){
        if(!category) {
            res.render("404");
        } else {
            for(var i = 0; i < category.pages.length; i++){
                if (category.pages[i].url ==  req.params.page){
                    page = category.pages[i];
                }
            }
            if (!page) {
                res.render("404");
            } else {
                fs.readFile(__dirname + './../views/page/bodies/'+ page.body, 'utf-8', function(err, body){
                    if (err){
                        console.log(err);
                        res.render("page/show", {category: category, page: page, body: "<h1> PageFile loading error - 404 </h1>"});
                    } else {
                        res.render("page/show", {category: category, page: page, body: body});
                    }
                });
            }
        }
    })
});

router.get("/*", function(req, res){
    res.render("cms/404");
});

module.exports = router;
