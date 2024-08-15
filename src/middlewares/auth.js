// Helpers/Files
const { validator } = require('../helpers/validator');
const response = require('../helpers/response');
const { verifyJWTToken } = require('../helpers/jwt_token');
const db = require('../config/db.config');
const UserSession = db.user_sessions;
const User = db.users;


/**
 * Middleware function for user authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @return {Promise} A Promise that resolves when the authentication is successful, or rejects with an error.
 */
const userAuth = async function (req, res, next) {
     try {
          let validation = new validator(req.headers, {
               authorization: 'required|string',
          }, {
               'required.authorization': 'Unauthorized Users.',
               'string.authorization': 'Unauthorized Users.'
          });
          if (validation.fails()) {
               const firstMessage = Object.keys(validation.errors.all())[0];
               return response.error(res, validation.errors.first(firstMessage), 401);
          };

          const headerToken = req.headers.authorization;

          // Verify JWT token
          const verifyToken = await verifyJWTToken(headerToken);
          if (!verifyToken.success) {
               return response.error(res, 1010, 401);
          };

          const isAuth = await UserSession.findOne({ where: { token: headerToken } });
          if (isAuth != null) {
               let userData = await User.findOne({
                    where: {
                         id: isAuth.user_id
                    },
                    attributes: ["id", "role"],

               });
               if (!userData) {
                    return response.error(res, 1011, 401);
               };

               req.user = userData.toJSON()
               next()
          } else {
               return response.error(res, 1011, 401);
          }
     } catch (error) {
          console.log('Error :>> ', error);
          return response.error(res, 9999);
     }
};


/**
 * Middleware function that checks if the user has the required permission role.
 *
 * @param {Array<string>} permissionRoles - An array of permission roles that the user is allowed to have.
 * @returns {Function} - An async function that takes in a request, response, and next middleware function as parameters.
 *                       It checks if the user's role is included in the permissionRoles array. If not, it returns an error response.
 *                       Otherwise, it calls the next middleware function.
 * @throws {Error} - If there is an error in the permission middleware, it logs the error and returns an error response.
 */
const userPermission = (permissionRoles) => {
     return async function (req, res, next) {
          try {
               const { user: { role } } = req;

               if (!permissionRoles.includes(role)) {
                    return response.error(res, 1012, 401);
               };

               next()
          } catch (error) {
               console.log('error in permission middleware :>> ', error);
               return response.error(res, 9999);
          }
     }
};



module.exports = {
     userAuth,
     userPermission
}