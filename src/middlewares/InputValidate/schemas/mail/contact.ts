import Joi from 'joi';

const contactMailSchema = Joi.object({
    from: Joi.string().email().required(),
    message: Joi.string().required()
});

export {
    contactMailSchema
}