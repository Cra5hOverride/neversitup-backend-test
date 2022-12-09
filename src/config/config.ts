export const config = () => ({
  PORT: process.env.PORT,
  APP_NAME: process.env.APP_NAME,
  JWT_SECRET: process.env.JWT_SECRET,

  MONGODB_URI: `mongodb${process.env.DB_PROTOCOL}://${
    process.env.DB_USERNAME
  }:${process.env.DB_PASSWORD}@${process.env.DB_HOST}${
    process.env.DB_PORT ? ':' + process.env.DB_PORT : ''
  }/${process.env.DB_DATABASE}`,

  MONGODB_URI_LOCAL: `mongodb://${process.env.DB_HOST}${
    process.env.DB_PORT ? ':' + process.env.DB_PORT : ''
  }/${process.env.DB_DATABASE}`,

});
