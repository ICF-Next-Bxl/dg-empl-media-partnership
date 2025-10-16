// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: process.env.PM2_PROCESS || "default-strapi-app",
      script: "npm",
      args: "start",
      cwd: "./",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
