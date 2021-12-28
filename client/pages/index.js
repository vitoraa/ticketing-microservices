const index = ({ currentUser, tickets }) => {
  console.log(tickets);
  return currentUser ?
    <h1>You are signed in</h1>
    :
    <h1>You are not signed in</h1>
};

index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
}

export default index;