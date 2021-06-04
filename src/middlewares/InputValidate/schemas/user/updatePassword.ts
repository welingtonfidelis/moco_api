import Joi from 'joi';

const userUpdatePasswordSchema = Joi.object({
    password: Joi.string().required(),
});

export {
    userUpdatePasswordSchema
}