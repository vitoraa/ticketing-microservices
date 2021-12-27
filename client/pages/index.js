const index = ({ currentUser }) => {
  return currentUser ?
    <h1>You are signed in</h1>
    :
    <h1>You are not signed in</h1>
};

index.getInitialProps = async (context) => {
  return {};
}

export default index;