  
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'; 
import CheckoutForm from '../../Components/CheckoutForm/CheckoutForm';
import { useLoaderData } from 'react-router-dom';
// Load Stripe with Public Key
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK || 'YOUR_FALLBACK_PUBLIC_KEY');

const Payment = () => {
    const coinsData = useLoaderData(); 
  return (
    <div>
      {/* Section Title */} 
      <h1 className='text-4xl font-bold text-center text-black mb-12 drop-shadow-md'>PayMent Gateway</h1>
      
      {/* Stripe Elements Wrapper */}
      <Elements stripe={stripePromise}>
        <CheckoutForm coinsData={coinsData} />
      </Elements>
    </div>
  );
};

export default Payment;