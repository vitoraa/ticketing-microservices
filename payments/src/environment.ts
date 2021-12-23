export const environment = {
  jwt_key: process.env.JWT_KEY || 'asdf',
  node_env: process.env.NODE_ENV || 'development',
  mongo_uri: process.env.MONGO_URI || 'mongodb://payments-mongo-srv:27017/tickets',
  nats_url: process.env.NATS_URL || 'http://nats-srv:4222',
  nats_client_id: process.env.NATS_CLIENT_ID || 'asdff',
  nats_cluster_id: process.env.NATS_CLUSTER_ID || 'ticketing',
  queue_group_name: 'payments-service',
  stripe_key: process.env.STRIPE_KEY || 'sk_test_51HXqQZqZ9ZQZ9ZqZ9ZqZ9ZqZ9ZqZ9ZqZ',
};
