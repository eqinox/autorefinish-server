module.exports = ({ env }) => ({
    // Existing users-permissions configuration
    'users-permissions': {
      config: {
        jwtSecret: env('JWT_SECRET'),
      },
    },
    // Conditional upload plugin configuration
    upload: {
      config: {
        // Use local provider in development, AWS S3 in production
        provider: env('NODE_ENV') === 'production' ? 'aws-s3' : 'local',
        providerOptions: env('NODE_ENV') === 'production' ? {
          accessKeyId: env('AWS_ACCESS_KEY_ID'), // Your AWS access key
          secretAccessKey: env('AWS_ACCESS_SECRET'), // Your AWS secret access key
          region: env('AWS_REGION'), // Your AWS S3 bucket region
          params: {
            Bucket: env('AWS_BUCKET'), // Your AWS S3 bucket name
          },
        } : {}, // Empty options for local provider
      },
    },
  });
  