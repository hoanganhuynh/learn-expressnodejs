var db = require('../db');
const shortid = require('shortid');


module.exports.index = function(req, res) {
    res.render('products/index', {
        products: db.get('products').value()
    });
};

module.exports.search = function(req, res) {
    let q = req.query.q;
    let matchedProducts = db.get('products').value().filter(function(product) {
        return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('products/index', {
        products: matchedProducts
    });
};

module.exports.create = function(req, res) {
    console.log(req.cookies);
    res.render('products/create');
};

module.exports.get = function(req, res) {
    let id = req.params.id;
    let product = db.get('products').find({ id: id }).value();

    res.render('products/view', {
        product: product
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();

    // console.log(req.body); // xem log ra gi
    console.log(res.locals);

    db.get('products').push(req.body).write();
    res.redirect('/products');
};

