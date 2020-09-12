module.exports = {
  apps: [
    {
      name: 'F1 API',
      script: 'server.js',
      instances: 'max',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && npx sequelize-cli db:migrate && pm2 reload ecosystem.config.js --env production'
    }
  }
}
