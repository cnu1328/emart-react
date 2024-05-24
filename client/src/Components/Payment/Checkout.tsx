import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import { url } from "../../utils/baseUrl";

const initStripe = async () => {

    try {
        const res = await axios.get(`${url}/user/payment/publishable-key`);
        const publishableKey = res.data.publishable_key;
        return loadStripe(publishableKey);
    } catch (error) {
    console.error("Error fetching Stripe publishable key:", error);
        throw error;
    }
};

export default function Checkout() {

    const stripePromise = initStripe();

    const [clientSecretSettings, setClientSecretSettings] = useState({
        clientSecret: "",
        loading: true,
    });

    useEffect(() => {

        async function createPaymentIntent() {
          const response = await axios.post(`${url}/user/payment/create-payment-intent`, {});
    
          setClientSecretSettings({
            clientSecret: response.data.client_secret,
            loading: false,
          });
        }
    
        createPaymentIntent();
    }, []);



    return (
        <div>
            {clientSecretSettings.loading ? (
                <h1>Loading ...</h1>
                ) : (
                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret: clientSecretSettings.clientSecret,
                        appearance: { theme: "stripe" },
                    }}
                >
                    <CheckoutForm />
                </Elements>
            )}
      </div>
    );

}