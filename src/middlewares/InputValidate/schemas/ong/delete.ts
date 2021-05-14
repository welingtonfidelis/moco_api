import Joi from 'joi';

const ongDeleteSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    ongDeleteSchema
}