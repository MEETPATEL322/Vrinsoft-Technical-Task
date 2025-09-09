import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const validateRegister = async (data: any) => {
  try {
    return await registerSchema.validateAsync(data, { abortEarly: false });
  } catch (err: any) {
    throw err;
  }
};

export const validateLogin = async (data: any) => {
  try {
    return await loginSchema.validateAsync(data, { abortEarly: false });
  } catch (err: any) {
    throw err;
  }
};
