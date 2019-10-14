const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'Orders were fetched'
  });
});

router.post('/', (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    msg: 'Orders was created',
    order
  });
});

router.get('/:orderId', (req, res, next) => {
  res.status(200).json({
    msg: 'Order Details',
    id: req.params.orderId
  });
});

router.delete('/:orderId', (req, res, next) => {
  res.status(200).json({
    msg: 'Order Deleted',
    id: req.params.orderId
  });
});

module.exports = router;
