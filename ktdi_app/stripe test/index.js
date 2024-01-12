const express = require("express");
const Stripe = require('stripe');
const cors = require("cors");
const bodyParser = require('body-parser');

const stripe = Stripe('sk_test_51ORPauC1wAehoBy5dKXcQrG8TwXVwo7OUq7ScNOLBlc33o962juKIqVAJuKZ6fp1WEYIbnhfuE6DUmQtdjiVYM5Q00b0VpL1Mf');
const app = express();

const appearance = { 
theme: 'flat',
variables: { colorPrimaryText: '#262626' } };
const options = { 
layout: {
  type: 'tabs',
defaultCollapsed: false,
}
};
const elements = stripe.elements({ clientSecret, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

const port = 3000;
const host = "localhost";

app.post("/payment-sheet", async (req, res) => {
  try {
    const data = req.body;
    const { email, name, amount } = data; // Extract email, name, and amount from request body

    const params = {
      email,
      name,
    };

    const customer = await stripe.customers.create(params);

    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: '2023-10-16' },
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to the smallest currency unit (assuming 'myr' uses cents)
      currency: 'myr',
      customer: customer.id,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    const response = {
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id,
    };

    res.status(200).send(response);
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).send({ error: 'An error occurred' }); // Send an error response
  }
});

app.listen(port, host, () => {
  console.log(`Server is running at ${host}:${port}`);
});
