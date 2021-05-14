import Joi from 'joi';

const ongListSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(10).max(100)
});

export {
    ongListSchema
}