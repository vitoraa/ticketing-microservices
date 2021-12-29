const OrderIndex = ({ orders }) => {
  console.log(orders);
  const orderList = orders.map(order =>
  (
    <tr key={order.id}>
      <td>{order.ticket.title}</td>
      <td>{order.ticket.price}</td>
      <td>{order.status}</td>
    </tr>
  )
  );
  return (
    <div>
      <h1>Orders</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderList}
        </tbody>
      </table>
    </div>
  )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data: orders } = await client.get('/api/orders');

  return { orders };
}

export default OrderIndex;