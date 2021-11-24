import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Teste</h1>;
};

index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/current_user');
  return data;
}

export default index;