var db = require('../db');
const shortid = require('shortid');


module.exports.index = function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
};

module.exports.search = function(req, res) {
    let q = req.query.q;
    let matchedUsers = db.get('users').value().filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
};

module.exports.create = function(req, res) {
    console.log(req.cookies);
    res.render('users/create');
};

module.exports.get = function(req, res) {
    let id = req.params.id;
    let user = db.get('users').find({ id: id }).value();

    res.render('users/view', {
        user: user
    });
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    req.body.avatar = req.file.path.split('/').slice(1).join('/');

    console.log(req.body); // xem log ra gi
    console.log(res.locals);

    db.get('users').push(req.body).write();
    res.redirect('/users');
};

