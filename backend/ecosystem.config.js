module.exports = {
  apps: [
    {
      name: 'chat-backend',
      script: './dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        REDIS_URL: process.env.REDIS_URL,
      },
    },
  ],
};
