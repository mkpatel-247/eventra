import Joi from "joi";

/**
 * Login API validation
 */
export const requiredFields = {
  loginRequiredField: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};
