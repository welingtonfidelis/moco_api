import Joi from 'joi';

const ongShowSchema = Joi.object({
    id: Joi.string().uuid().required()
});

export {
    ongShowSchema
}