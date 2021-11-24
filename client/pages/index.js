import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
};

index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/current_user');
  return data;
}

export default index;