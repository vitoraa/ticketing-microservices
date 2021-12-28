const OrderShow = ({ order }) => {
  return (
    <div>
      <h1>{order.ticket.title}</h1>
      <h1>{order.expiresAt}</h1>
    </div>
  );
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  return { order: data };
}

export default OrderShow;