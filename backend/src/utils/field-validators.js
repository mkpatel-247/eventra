import Joi from "joi";

/**
 * Validation Schemas
 */
export const validationSchemas = {
  /**
   * Login API required field validation
   */
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  /**
   * Register User API required field validation
   */
  registerUser: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
  }),
};
