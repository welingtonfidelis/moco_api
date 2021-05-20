import Joi from 'joi';

const cashRegisterGroupListSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(10).max(100),
    description: Joi.string().min(3),
});

export {
    cashRegisterGroupListSchema
}