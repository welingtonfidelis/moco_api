import Joi from 'joi';

const cashRegisterReportSchema = Joi.object({
    date_start: Joi.date().required(),
    date_end: Joi.date().required(),
    description: Joi.string(),
    type: Joi.string().valid('in', 'out'),
    cash_register_group_id: Joi.string().uuid(),
    download_pdf: Joi.boolean()
});

export {
    cashRegisterReportSchema
}