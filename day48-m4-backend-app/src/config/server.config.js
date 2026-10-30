const parsePort = (val, defaultVal) => {
  const parsed = parseInt(val, 10);
  return Number.isNaN(parsed) || parsed <= 0 ? defaultVal : parsed;
};

const serverConfig = Object.freeze({
  port: parsePort(process.env.PORT, 3000),
  tokenSecret: process.env.TOKEN_SECRET || "default_booking_jwt_secret_key_change_me",
  tokenExpiryMinutes: parsePort(process.env.TOKEN_EXPIRY_MINUTES, 60),
  adminRegistrationKey: process.env.ADMIN_REGISTRATION_KEY || "ADMIN_SECRET_KEY_9999"
});

module.exports = serverConfig;

