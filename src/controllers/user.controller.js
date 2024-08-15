// Modules
const bcrypt = require('bcryptjs');

// Helpers/Files
const { validator } = require('../helpers/validator');
const response = require('../helpers/response');
const config = require('../config/config');
const { createJWTToken } = require("../helpers/jwt_token");

// Models
const db = require('../config/db.config');
const User = db.users;
const UserSession = db.user_sessions;


/**
 * Register a new user with the provided information.
 *
 * @param {Object} req - The request object containing user data.
 * @param {Object} res - The response object to send back.
 * @return {Promise} Promise representing the result of user registration.
 */
const registerUser = async (req, res) => {
     try {
          const validation = new validator(req.body, {
               name: 'required|string',
               email: 'required|email|lowercase',
               password: 'required|string|min:8|max:50'
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };

          // Payload Data Destructuring
          const { body: { name, email, password } } = req;

          // Check email
          const checkEmail = await User.findOne({ where: { email } });
          if (checkEmail) {
               return response.error(res, 1004);
          };

          // Hash Password
          const hashPassword = bcrypt.hashSync(password, parseInt(config.bcrypt_salt));

          // Add user
          await User.create({
               name,
               email,
               password: hashPassword,
               role: "user",
          });

          // Response
          return response.success(res, 1001, null, 201);
     } catch (error) {
          console.log('Error ==:>> ', error);
          return response.error(res, 9999);
     }
};

/**
 * Login function that handles user authentication.
 *
 * @param {Object} req - The request object containing user credentials.
 * @param {Object} res - The response object to send back.
 * @return {Promise} Promise representing the result of the login attempt.
 */
const login = async function (req, res) {
     try {
          const validation = new validator(req.body,
               {
                    email: 'required|email|lowercase',
                    password: 'required|string',
               }
          );
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage));
          };

          const { body: { email, password } } = req;

          // Check user exists or not
          const findUser = await User.findOne({
               where: {
                    email,
               },
               attributes: ["id", "email", "password", "role"],
          });
          if (!findUser) {
               return response.error(res, 1005, 401);
          };

          // Check password
          if (!bcrypt.compareSync(password, findUser.password)) {
               return response.error(res, 1005, 401)
          };

          // Create token
          const tokenResponse = await createJWTToken({ id: findUser.id, email: findUser.email });
          if (!tokenResponse.success) {
               return response.error(res, 1009);
          };

          // Add session
          await UserSession.create({ token: tokenResponse.token, user_id: findUser.id });

          // Final Response
          const responseData = {
               id: findUser.id,
               role: findUser.role,
               token: tokenResponse.token
          };

          return response.success(res, 1002, responseData);
     }
     catch (e) {
          console.log("Error ===:>> ", e);
          return response.error(res, 9999)
     }
};

/**
 * Logout function that handles user session destruction.
 *
 * @param {Object} req - The request object containing user session token.
 * @param {Object} res - The response object to send back.
 * @return {Promise} Promise representing the result of the logout attempt.
 */
const logout = async function (req, res) {
     try {
          await UserSession.destroy({ where: { token: req.headers.authorization } })
          return response.success(res, 1006)
     }
     catch (e) {
          console.log("Error ===:>> ", e);
          return response.error(res, 9999)
     }
};

/**
 * Retrieve user profile data based on the provided request.
 *
 * @param {Object} req - The request object containing user information.
 * @param {Object} res - The response object to send back.
 * @return {Promise} Promise representing the result of retrieving user profile data.
 */
const getProfile = async function (req, res) {
     try {
          const { user: { id } } = req
          const userData = await User.findOne({
               where: {
                    id: id
               },
               attributes: {
                    exclude: ['password', "updatedAt", "createdAt"]
               },
          });
          return response.success(res, 1003, userData)
     }
     catch (e) {
          console.log("Error ===:>> ", e);
          return response.error(res, 9999)
     }
};


module.exports = {
     registerUser,
     login,
     logout,
     getProfile
}