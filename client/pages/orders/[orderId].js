import { useEffect, useState } from "react";
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);

  if (timeLeft < 0) {
    return <div>Order expired</div>
  }

  return (
    <div>Time left to pay: {timeLeft} seconds
      <StripeCheckout
        token={(token) => console.log(token)}
        stripeKey="pk_test_51K9vZzAst0WsM9QjuJXunaoQgacWcvg0L3FZIVXnkioxHJSkuCObRo5tuI3iLKd0m57eL43VK57y0GKwBrM4dkJJ00UzPoxYY3"
        amount={order.ticket.price * 100}
        email={currentUser.email} />
    </div>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
}

export default OrderShow;