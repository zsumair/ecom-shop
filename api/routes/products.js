const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    msg: 'Handle GET for /products'
  });
});

router.post('/', (req, res, next) => {
  const product = {
    name: req.name,
    price: req.price
  };

  res.status(201).json({
    msg: 'Handle POST for /products',
    createdProduct: product
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      msg: 'Special ID alert',
      id
    });
  } else {
    res.status(200).json({
      msg: 'you passed an ID'
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    msg: 'Updated product'
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    msg: 'Deleted product'
  });
});

module.exports = router;
