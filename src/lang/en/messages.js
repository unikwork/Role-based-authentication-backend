const MESSAGES = {

    // User Authentication
    '1001': 'Register successfully',
    '1002': 'Sign in successfully',
    '1003': 'Get profile successfully',
    '1004': 'Already registered with this email !',
    '1005': 'Please enter correct email and password',
    '1006': 'Logout successfully',
    '1007': 'User not found!',
    '1008': 'Profile updated successfully!',
    '1009': 'Error occurred while creating JWT token!',
    '1010': 'Session expired. Please login again!',
    '1011': 'Unauthorized user!',
    '1012': 'You are not authorized to perform this action.',

    // Common
    '9000': 'Please Enter Valid data!',
    '9001': 'Not found',
    '9999': 'Something went wrong!',
}

module.exports.getMessage = function (messageCode) {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};
