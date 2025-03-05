import { catchAsync } from "../utils/apiError";

export const isAuthenticated = catchAsync((req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken || req.header("Authorization") !== accessToken) {
    return res.status(401).send({ status: 401, message: "Unauthorized" });
  }

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET_KEY,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({ status: 401, message: "Unauthorized" });
      }
      req.user = decoded;
      next();
    }
  );
});
