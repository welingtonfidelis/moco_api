import Joi from 'joi';

const cashRegisterListSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(10).max(100)
});

export {
    cashRegisterListSchema
}