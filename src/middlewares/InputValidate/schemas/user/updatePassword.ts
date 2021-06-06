import Joi from 'joi';

const userUpdatePasswordSchema = Joi.object({
    password: Joi.string().required().min(4),
});

export {
    userUpdatePasswordSchema
}