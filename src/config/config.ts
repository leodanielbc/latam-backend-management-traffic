import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        mongo: {
            uri: process.env.MONGO_URI,
        },
        apiKey: process.env.API_KEY,
        host: {
            url: process.env.HOST_URL,
            port: parseInt(process.env.PORT, 10),
        },
        swagger: {
            user: process.env.SWAGGER_USER,
            password: process.env.SWAGGER_PASSWORD
        }
    };
});