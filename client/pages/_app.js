import 'bootstrap/dist/css/bootstrap.css'
import buildClient from "../api/build-client";
import Header from '../components/header';

const App = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <h1>Header! {currentUser.email}</h1>
      <Component {...pageProps} />;
    </div>)
};

App.getInitialProps = async (appContext) => {
  const context = appContext.ctx;
  const client = buildClient(context);
  const { data } = await client.get('/api/users/current_user');

  let pageProps = {};

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(context);
  }
  return { pageProps, ...data };
}

export default App;