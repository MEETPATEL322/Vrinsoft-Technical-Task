import Joi from "joi";

const eventSchema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  payload: Joi.object().required(),
});

export const validateEvent= async (data: any) => {
  try {
    return await eventSchema.validateAsync(data, { abortEarly: false });
  } catch (err: any) {
    throw err;
  }
};
