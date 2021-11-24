import axios from "axios";

const index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Teste</h1>;
};

index.getInitialProps = async ({ req }) => {
  console.log(req.headers);
  if (typeof window === 'undefined') {
    const { data } = await axios.get('http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/current_user', {
      headers: req.headers
    });
    console.log(data)
    return data;
  } else {
    const { data } = await axios.get('/api/users/current_user');
    return data;
  }

  return {};
}

export default index;