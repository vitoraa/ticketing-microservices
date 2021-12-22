export const environment = {
  node_env: process.env.NODE_ENV || 'development',
  nats_url: process.env.NATS_URL || 'http://nats-srv:4222',
  nats_client_id: process.env.NATS_CLIENT_ID || 'asdff',
  nats_cluster_id: process.env.NATS_CLUSTER_ID || 'expiration',
  redis_host: process.env.REDIS_HOST || 'expiration-redis-srv',
  queue_group_name: 'expirations-service'
};
