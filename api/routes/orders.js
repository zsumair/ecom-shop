const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');
const checkAuth = require('../middleware/check-auth');

router.get('/', checkAuth, (req, res, next) => {
  Order.find()
    .select('-__v')
    .populate('product', 'name')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map(doc => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: 'GET',
              url: `${req.get('host')}/orders/${doc._id}`
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', checkAuth, (req, res, next) => {
  Product.findById(req.body.productId)
    .exec()
    .then(product => {
      if (!product) {
        return res.status(400).json({
          message: 'Product Not Found'
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Order Stores',
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: 'GET',
          url: `${req.get('host')}/orders/${result._id}`
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:orderId', checkAuth, (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate('product', 'name')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order Not Found'
        });
      }
      res.status(200).json({
        order,
        request: {
          type: 'GET',
          url: `${req.get('host')}/orders`
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete('/:orderId', checkAuth, (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Order Deleted',
        request: {
          type: 'POST',
          url: `${req.get('host')}/orders`,
          body: { productId: 'ID', quantity: 'Number' }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
