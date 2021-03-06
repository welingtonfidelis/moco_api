import Joi from 'joi';

const cashRegisterSaveSchema = Joi.object({
    description: Joi.string().required(),
    observation: Joi.string().allow('').allow(null),
    value: Joi.number().min(1).required(),
    paid_in: Joi.date().required(),
    type: Joi.string().valid('in', 'out').required(),
    cash_register_group_id: Joi.string().uuid().required(),
});

export {
    cashRegisterSaveSchema
}