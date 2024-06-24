module.exports = {
    apps: [
        {
            name: 'http-server',
            script: 'npm',
            args: 'run http-server:dev',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};