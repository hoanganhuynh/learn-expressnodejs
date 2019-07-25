module.exports.postCreate = function(req, res, next) {
    var errors = [];
    if (!req.body.name) {
        errors.push('Name is required. !');
    }

    if (!req.body.image) {
        errors.push('Image is required. !');
    }

    if (!req.body.description) {
        errors.push('Description is required. !');
    }

    if (errors.length) {
        res.render('products/create', {
            errors: errors,
            values: req.body
        });
        return;
    }
    
    res.locals.success = true;

    next();
};