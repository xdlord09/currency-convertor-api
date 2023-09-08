const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());


const exchangeRates = {
  USD: {
    EUR: 0.85,
    IND: 0.75,
    SGD: 0.77,
  },
  EUR: {
    USD: 1.18,
    IND: 0.88,
    SGD: 0.79
  },
  IND: {
    USD: 1.33,
    EUR: 1.14,
    SGD: 1.35
  },
  SGD: {
    USD: 0.66,
    IND: 0.34,
    EUR: 0.78
  }

};

app.post('/convert', (req, res) => {
  const { amount, from_currency, to_currency } = req.body;

  if (!amount || !from_currency || !to_currency) {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (!exchangeRates[from_currency] || !exchangeRates[from_currency][to_currency]) {
    return res.status(400).json({ error: 'Invalid currency' });
  }

  const conversionRate = exchangeRates[from_currency][to_currency];
  const convertedAmount = amount * conversionRate;

  const response = {
    amount,
    from_currency,
    to_currency,
    converted_amount: convertedAmount,
  };

  return res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//sending post request to localhost with json data in request body
//using powershell

//Invoke-RestMethod -Method Post -Uri "http://localhost:8000/convert" -Headers @{"Content-Type"="application/json"} -Body '{"amount": 100, "from_currency": "USD", "to_currency": "EUR"}'
