const express = require('express');
const router = express.Router();
var controller = require('../controllers/product.controller');
var validate = require('../validate/product.validate');
var authMiddleware = require('../middlewares/auth.middleware');

router.get('/', authMiddleware.requireAuth, controller.index);
router.get('/cookie', function(req, res, next) {
    res.cookie('product-id', 12345);
    res.send('Test cookie');
});
router.get('/search', controller.search);
router.get('/create', controller.create);
router.get('/:id', controller.get);

router.post('/create', validate.postCreate, controller.postCreate);

module.exports = router;