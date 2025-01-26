 import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = ({ coinsData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [userData, , refetch] = useUser();

  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState(null);
  const [loading, setLoading] = useState(false);

  const totalPrice = coinsData.price;
  const purchaseId = coinsData._id;

  // Fetch Client Secret for Payment Intent
  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        Swal.fire({
          icon: "error",
          title: "Payment Setup Failed",
          text: "Unable to initialize payment. Please try again later.",
        });
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setLoading(true);

    try {
      // Create Payment Method
      const { error: paymentMethodError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "Not Available Name",
          },
        });

      if (paymentMethodError) {
        setPaymentError(paymentMethodError.message);
        setLoading(false);
        return;
      }

      // Confirm Payment
      const { error: confirmError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        setPaymentError(confirmError.message);
        setLoading(false);
        return;
      }

      // Payment Success
      if (paymentIntent?.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // Update User Coins
        const updatedCoins = userData.coins + coinsData.coins;
        await axiosSecure.patch(`/users/${userData._id}`, {
          coins: updatedCoins,
        });
        refetch();

        // Save Payment Information
        const paymentDetails = {
          email: user.email,
          coins:coinsData.coins,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: new Date(),
          id: purchaseId,
          status: "success",
        };

        const res = await axiosSecure.post("/payments", paymentDetails);

        if (res.data?.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful",
            text: "Your payment was processed successfully!",
          });
          navigate('/dashboard/paymentHistory');
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setPaymentError("An error occurred during payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Complete Your Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Element */}
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          className={`w-full py-3 rounded-lg text-white font-medium ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={!stripe || loading || !clientSecret}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Feedback Messages */}
        {transactionId && (
          <p className="text-center text-green-500 ">
           <span className="bg-black text-white font-bold p-4"> Payment Successful!</span> <span className="font-semibold bg-gray-200 p-4">Transaction ID: {transactionId}</span>
          </p>
        )}
        {paymentError && (
          <p className="text-center text-red-500">{paymentError}</p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
