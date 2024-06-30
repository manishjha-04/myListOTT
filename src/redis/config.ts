import type { RedisClientType } from 'redis';
import * as redis from 'redis';

let redisClient: RedisClientType | null = null;

export const connectRedis = async (): Promise<RedisClientType | null> => {
  try {
    if (!redisClient) {
      redisClient = redis.createClient({
        password: 'PmU8EyPjt85iSpIXNdelZTdSokTTLK5K',
        socket: {
          host: 'redis-16817.c266.us-east-1-3.ec2.redns.redis-cloud.com',
          port: 16817,
        },
      });

      redisClient.on('error', (err) => {
        console.error('Redis Client Error:', err);
      });

      await redisClient.connect();
      console.log('Redis connected');
    }
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
  }
  return redisClient;
};

export const getRedisClient = (): RedisClientType | null => {
  if (!redisClient) {
    console.warn('No connection found with Redis. Attempting to reconnect...');
  }
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  if (redisClient) {
    await redisClient.disconnect();
    console.log('Redis disconnected');
  }
};

(async () => {
  await connectRedis();
  const client = getRedisClient();
  if (client) {
    console.log('Using Redis client');
  }
})();
