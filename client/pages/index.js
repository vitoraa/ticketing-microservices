import axios from "axios";
import buildClient from "../api/build-client";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Teste</h1>;
};

index.getInitialProps = async (context) => {
  const { data } = await buildClient(context).get('/api/users/current_user');
  return data;
}

export default index;