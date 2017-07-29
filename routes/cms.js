var express = require('express');
    router  = express.Router(),
    fs       = require('fs'),
    passport = require('passport'),
    middleware = require("../middleware");



router.get("/", middleware.isLoggedIn, function(req, res){
    res.render("cms/index");
});

// CMS LOGIN SYSTEM
router.get("/login", function(req, res){
    res.render("cms/login");
});
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/cms/", 
        failureRedirect: "/cms/login"
    }), function(req, res){
});
router.get("/logout", middleware.isLoggedIn, function(req, res){
    req.logout();
    res.redirect("/cms/login");
});

// CATEGORY ROUTING
router.get("/categories", middleware.isLoggedIn, function(req, res){
    Category.find({}, function(err, categories){
        if (err){
            console.log(err);
            res.redirect("/cms");
        } else {
            res.render("cms/categories/index", {categories: categories});
        }
    })
});

router.get("/categories/new", middleware.isLoggedIn, function(req, res){
    res.render("cms/categories/new");
});
router.post("/categories", middleware.isLoggedIn, function(req, res){
    var _name = req.body.name,
        _url = req.body.url;
    Category.find({url: _url}, function(err, category){
        if (category) {
            res.redirect("/cms/categories");
        } else {
            var uniq_url = "page_example" + Math.floor(Math.random() * 100),
            pagePlate = {
                url: uniq_url,
                name: "Page Example",
                description: "This is a basic template of a page",
                image: "/static/images/example.jpg",
                body: "template.html"
            },
            pagesBase = [pagePlate];
            Category.create({name: _name, url: _url, pages: pagesBase}, function(err, category){
                if (err){
                    res.redirect("back");
                } else {
                    console.log("Category added: "+ category.name);
                }
            });
            res.redirect("/cms/categories");
        }
    });
});

router.get("/categories/:id", middleware.isLoggedIn, function(req, res){
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/categories");
        } else {
            res.render("cms/categories/show", {category: category});
        }
    });
});

router.get("/categories/:id/edit", middleware.isLoggedIn, function(req, res){
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/cms/categories");
        } else {
            res.render("cms/categories/edit", {category: category});
        }
    });
});
router.put("/categories/:id", middleware.isLoggedIn, function(req, res){
    Category.findByIdAndUpdate(req.params.id, req.body.category, function(err, category){
        res.redirect(req.params.id);
    })
});

router.delete("/categories/:id", middleware.isLoggedIn, function(req, res){
    Category.findByIdAndRemove(req.params.id, function(err){
        res.redirect("/cms/categories");
    });
});

// PAGE IN CATEGORY ROUTING
router.get("/categories/:id/pages/edit", middleware.isLoggedIn, function(req, res){
    var index = req.query.pageIndex;
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/cms/categories");
        } else {
            fs.readFile(__dirname + './../views/page/bodies/'+ category.pages[index].body, 'utf-8', function(err, body){
                if (err){
                    console.log(err);
                } else {
                    res.render("cms/categories/pages/edit", {category: category, page: category.pages[index], index: index, body:body});
                }
            });
        }
    });
});
router.put("/categories/:id/pages", middleware.isLoggedIn, function(req, res){
    var index = req.query.pageIndex;
    var _page = {
        url: req.body.url,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        body: req.body.url_body
    };
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/cms/categories");
        } else {
            category.pages[index] = _page;
            fs.writeFile(__dirname + './../views/page/bodies/'+ category.pages[index].body, req.body.file_body, 'utf-8', function(err, body){
                if (err){
                    console.log(err);
                } else {
                    category.save();
                    res.redirect("/cms/categories/" + req.params.id);
                }
            });
        }
    });
});

router.get("/categories/:id/pages/new", middleware.isLoggedIn, function(req, res){
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/cms/categories");
        } else {
            fs.readFile(__dirname + './../views/page/bodies/template.html', 'utf-8', function(err, body){
                if (err){
                    console.log(err);
                    res.redirect("/cms/categories/" + req.params.id);
                } else {
                    res.render("cms/categories/pages/new", {category: category, body: body});
                }
            });
        }
    });
});
router.post("/categories/:id/pages", middleware.isLoggedIn, function (req, res){
    var _page = {
        url: req.body.url,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        body: req.body.url_body
    };
    Category.findById(req.params.id, function(err, category){
        if (err) {
            console.log(err);
            res.redirect("/cms/categories");
        } else {
            category.pages.push(_page);
            category.save();
            res.redirect("/cms/categories/"+ req.params.id);
        }
    }); 
});

module.exports = router;