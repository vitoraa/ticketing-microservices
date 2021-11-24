import axios from "axios";

const index = (data) => {
  console.log(data);
  return <h1>Teste</h1>;
};

index.getInitialProps = async () => {
  const response = await axios.get('/api/users/current_user');
  console.log(response);
  return response.data
}

export default index;