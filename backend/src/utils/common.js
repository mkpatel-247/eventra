import Users from "../models/users.models.js";

/**
 * Generates both access and refresh token for a given user id
 * @param {string} userId - The id of the user
 * @returns {Promise<{accessToken: string, refreshToken: string}>}
 */
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await Users.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * Cookie options
 */
export const cookiesOptions = {
  httpOnly: true,
  secure: true,
  secure: true,
  sameSite: "Strict",
};
