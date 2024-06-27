// security_module/index.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class SecurityModule {
  static async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async generateToken(userId) {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  }

  static async verifyToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      return decoded.userId;
    } catch (error) {
      return null;
    }
  }
}

module.exports = SecurityModule;
