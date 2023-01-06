const statusText = {
  INVALID_CREDS: "Please try to login with correct credentials",
  LOGIN_IN_SUCCESS: "You have been signed in successfully",
  INTERNAL_SERVER_ERROR: "Internal server error",
  PASS_RESET_SUCCESS: "Pass reset successfully",
  PASS_RESET_ALREADY: "Pass reset already",
  CURRENT_PASS_INCORRECT: "The current password is incorrect",
  REGISTERED_ALREADY: "Registered already",
  PASSWORD_NOT_RESET: "Password not reset",

  TOKEN_NOT_FOUND: "Token not found",
  INVALID_TOKEN: "Invalid token",
  VERIFIED_TOKEN: "Token verified",
  REGISTRATION_SUCCESS: "Registered successfully",

  SUCCESS: "All good",
  FAIL: "Failed",
  PREREQ_NOT_SATISFIED:
    "Prerequisites not satisfied - Password not reset or not registered",

  VERTICAL_CREATE_SUCCESS: "Vertical created successfully",
  COURSE_CREATE_SUCCESS: "Course created successfully",
  UNIT_ADD_SUCCESS: "Unit added successfully",

  VERTICAL_DELETE_SUCCESS: "Vertical deleted successfully",
  COURSE_DELETE_SUCCESS: "Course deleted successfully",
  UNIT_DELETE_SUCCESS: "Unit deleted successfully",
};

module.exports = statusText;
