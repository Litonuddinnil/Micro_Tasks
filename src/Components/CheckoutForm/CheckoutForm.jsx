 import { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";

const CheckOutForm = ({coinsData}) => { 
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret,setClientSecret] = useState("");
  const [transactionId,setTransactionId] = useState('');
  const [paymentError, setPaymentError] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure(); 
  const {user} = useAuth(); 
  const [userData, ,refetch] = useUser();
  console.log(userData.coins);
  const totalPrice = coinsData.price;
  const purchaseId = coinsData._id; 
  useEffect(()=>{
    axiosSecure.post('/create-payment-intent',{price:totalPrice})
    .then(res =>{
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
    })
  },[axiosSecure,totalPrice])

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    setLoading(true);

    // Create Payment Method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setPaymentError(error.message);
      setPaymentSuccess(null);
      console.error("[ERROR]", error);
    } else {
      setPaymentSuccess("Payment method created successfully!");
      setPaymentError(null);
      console.log("[PaymentMethod]", paymentMethod);
    }
    setLoading(false);

    //confirm payment
    const {paymentIntent,error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
        payment_method:{
        card:card,
        billing_details:{
            email:user?.email || 'anonymous',
            name:user?.displayName || 'Not Available Name'
        }
        }
    })
    if(confirmError){
        console.log('confirmError');
    }
    else{
        console.log('payment Intent:',paymentIntent);
        if(paymentIntent.status === 'succeeded'){
            console.log('payment transaction id',paymentIntent.id);
            setTransactionId(paymentIntent.id);
            
            const updateCoins = userData.coins + coinsData.coins;
            await axiosSecure.patch(`/users/${userData._id}`, {
                coins: updateCoins,
              }); 
              refetch();
            //now buyer data coins increase
            const payment ={
                email:user.email,
                transactionId:paymentIntent.id,
                price:totalPrice,
                date:new Date(),
                id:purchaseId,
                status:'pending'
            }
            console.log(payment);
            const res = await axiosSecure.post('/payments',payment);
            console.log('payment saved',res);
        }
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
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          type="submit"
          disabled={!stripe || loading || !clientSecret}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>

        {/* Payment Feedback */}
        {transactionId && (
          <p className="text-center text-green-500">Your TransactionId:{transactionId}</p>
        )}
        {paymentError && (
          <p className="text-center text-red-500">{paymentError}</p>
        )}
        {paymentSuccess && (
          <p className="text-center text-green-500">{paymentSuccess}</p>
        )}
      </form>
    </div>
  );
};

export default CheckOutForm;
