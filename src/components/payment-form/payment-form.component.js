import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector';

import { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);
    const amount = useSelector(selectCartTotal);
    const user = useSelector(selectCurrentUser);

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        };

        setIsLoading(true);

        const result = await fetch("/.netlify/functions/create-payment-intent", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                amount
            })
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = result;

        const paymentResult = await stripe.confirmCardPayment(client_secret,
            {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user ? user.displayName : "guest"
                    },
                }
            }
        );

        setIsLoading(false);

        if (paymentResult.error) {
            alert(paymentResult.error)
        } else {
            if (paymentResult.paymentIntent.status === "succeeded");
            alert("payment success");
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Cart Payment: </h2>
                <CardElement />
                <PaymentButton
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    onClick={paymentHandler}
                    isLoading={isLoading}
                >Pay Now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>

    );
};

export default PaymentForm;