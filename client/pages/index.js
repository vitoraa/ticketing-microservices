import axios from "axios";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Teste</h1>;
};

index.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    const response = await axios.get('/api/users/current_user');
    console.log(response);
  } else {
    const { data } = await axios.get('/api/users/current_user');
    return data
  }
}

export default index;