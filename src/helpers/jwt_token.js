//Modules
const jwt = require('jsonwebtoken');

// Files
const config = require('../config/config')
const jwtSecret = config.jwt_secret;
const tokenExpiry = config.jwt_token_expiry;

/**
 * Create JWT token (Algorithm HS256)
 * @param { payload } object 
 * @returns 
 */
async function createJWTToken(payload) {
     let response = {
          success: false
     };
     try {
          const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpiry });

          response = {
               success: true,
               token
          };
     } catch (error) {
          response.success = false;
     } finally {
          return response;
     }
};

/**
 * Verify JWT token (Algorithm HS256)
 * @param {token} string
 */
async function verifyJWTToken(token) {
     let response = {
          success: false
     };
     try {
          await jwt.verify(token, jwtSecret);
          response.success = true;
     } catch (error) {
          response.success = false;
     } finally {
          return response;
     }
};


module.exports = {
     createJWTToken,
     verifyJWTToken
}