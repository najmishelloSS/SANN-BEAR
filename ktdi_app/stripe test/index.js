const express = require("express");
const Stripe = require('stripe');
const cors = require("cors");

const stripe = Stripe('sk_test_51ORPauC1wAehoBy5dKXcQrG8TwXVwo7OUq7ScNOLBlc33o962juKIqVAJuKZ6fp1WEYIbnhfuE6DUmQtdjiVYM5Q00b0VpL1Mf');

const app = express();

app.use(express.json());
app.use(cors());

const port = 3000;
const host ="localhost";

app.post("/payment-sheet", async (req, res, next) => {
  try {
    const data = req.body;
    const params = {
      email: data.email,
      name: data.name,
    };

    const customer = await stripe.customers.create(params);
    console.log(customer.id);
    
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer.id },
        { apiVersion: '2023-10-16' },
    );
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1000,
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
  } catch(error) {
    if (error.type === 'StripeAPIError') {
      console.error('Stripe API Error:', error.message);
      // Log detailed error information
      console.error('Stripe Error Details:', error.raw.message);
    } else {
      // Handle other types of errors
      console.error('Unexpected Error:', error);
    }
    res.status(500).send({ error: 'An error occurred' }); // Send an error response
  }
});

app.listen(port, host, () => {
    console.log(`Server is running at ${host}:${port}`);
});
