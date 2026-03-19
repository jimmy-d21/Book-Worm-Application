import "dotenv/config";

const ENV = {
  server: {
    port: process.env.PORT || 8080,
    backendUrl: process.env.BACKEND_URL,
    clientUrl: process.env.FRONTEND_URL,
  },
  database: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  jwt: process.env.JWT_SECRET,
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    secret_key: process.env.CLOUDINARY_SECRET_KEY,
  }
};

export default ENV;
