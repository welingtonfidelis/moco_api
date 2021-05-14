import Joi from 'joi';

const cashRegisterReportSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(10).max(100),
    date_start: Joi.date().required(),
    date_end: Joi.date().required(),
    description: Joi.string(),
    type: Joi.string().valid('in', 'out'),
    cash_register_group_id: Joi.string().uuid()
});

export {
    cashRegisterReportSchema
}