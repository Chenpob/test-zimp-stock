const express = require('express');
const router = express.Router();
const fetch = require('isomorphic-fetch')

router.get('/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toLowerCase();
  const modules = 'financialData';
  const response = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${symbol}?modules=${modules}`);
  const text = await response.text();
  const match = text.match(/"currentPrice":{"raw":(\d+\.\d+),"fmt":"(\d+\.\d+)"/);
  if (match) {
    const price = parseFloat(match[1]);
    res.json({ symbol, price });
  } else {
    res.status(404).json({ error: `Not found for ${symbol}` });
  }
});


module.exports = router;