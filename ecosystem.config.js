module.exports = {
    apps: [
        {
            name: 'efdehen',
            script: 'npm',
            args: 'run start:dev',
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