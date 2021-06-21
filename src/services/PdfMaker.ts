import pdfKit from 'pdfkit';
import htmlToPdf from 'html-pdf';
import fs from 'fs';
import { resolve } from 'path';
import handlebars from 'handlebars';

import { CashRegisterFilterInterface } from '../entities/CashRegister';
import { maskDate, maskValue } from '../util';
import { CashRegisterService } from './CashRegister';

const cashRegisterService = new CashRegisterService();
class PdfMakerService {
    async cashRegisterReport(ongId: string, filter: CashRegisterFilterInterface): Promise<Buffer> {
        const report = await cashRegisterService.reportList(ongId, filter);
        const { total: cashOnHand } = await cashRegisterService.reportCashOnHand(ongId);

        return new Promise((resolve, reject) => {
            const pdf = new pdfKit();
            const buffers: Buffer[] = [];

            pdf.on('data', buffers.push.bind(buffers));
            pdf.on('end', () => {
                const pdfData = Buffer.concat(buffers);

                resolve(pdfData);
            });

            pdf
                .fontSize(17)
                .text(
                    `Relatório - De ` +
                    `${maskDate(new Date(report.date_start))} até ` +
                    `${maskDate(new Date(report.date_end))}`,
                    20, 18
                );

            pdf
                .fontSize(15)
                .text(
                    `Total em caixa: ${maskValue(cashOnHand)}`,
                    20, 45,
                );

            pdf.text(
                `Receitas: ${maskValue(report.revenue)} ` +
                `Despesas: ${maskValue(report.expense)} `
            );

            pdf.text(
                'Tipo',
                20, 90,
                {
                    stroke: true
                }
            );
            pdf.text(
                'Descrição',
                90, 90,
                {
                    stroke: true
                }
            );
            pdf.text(
                'Grupo',
                270, 90,
                {
                    stroke: true
                }
            );
            pdf.text(
                'Valor',
                370, 90,
                {
                    stroke: true
                }
            );
            pdf.text(
                'Data',
                460, 90,
                {
                    stroke: true
                }
            );

            report.rows.forEach((item, index) => {
                pdf.text(
                    (item.type === 'in' ? 'Entrada' : 'Saída'),
                    20, undefined,
                    {
                        lineBreak: false
                    }
                );
                pdf.text(
                    item.description,
                    90, undefined,
                    {
                        lineBreak: false
                    }
                );
                pdf.text(
                    item.cash_register_group_description,
                    270, undefined,
                    {
                        lineBreak: false
                    }
                );
                pdf.text(
                    maskValue(item.value),
                    370, undefined,
                    {
                        lineBreak: false
                    }
                );
                pdf.text(
                    maskDate(new Date(item.paid_in)),
                    460, undefined,
                    {
                        lineBreak: false
                    }
                );

                pdf.text(' ');
            });

            pdf
                .fontSize(12)
                .text(
                    `MOCO - ${maskDate(new Date)}`,
                    pdf.page.width - 120, pdf.page.height - 20,
                    {
                        align: 'right',
                        lineBreak: false
                    },
                );

            pdf.end();
        });
    }

    async cashRegisterReportByHtml(ongId: string, filter: CashRegisterFilterInterface): Promise<Buffer> {
        const report = await cashRegisterService.reportList(ongId, filter);
        const { total: cashOnHand } = await cashRegisterService.reportCashOnHand(ongId);

        const htmlTemplatePath = resolve(__dirname, '..', 'views', 'html', 'cashRegisterReport.hbs');
        const htmlTemplate = fs.readFileSync(htmlTemplatePath).toString('utf8');
        const html = handlebars.compile(htmlTemplate)({
            cashOnHand: maskValue(cashOnHand),
            dateStart: maskDate(new Date(report.date_start)),
            dateEnd: maskDate(new Date(report.date_end)),
            today: maskDate(new Date()),
            revenue: maskValue(report.revenue),
            expense: maskValue(report.expense),
            reportList: report.rows.map(item => {
                return {
                    type: item.type === 'in' ? 'Entrada' : 'Saída',
                    value: maskValue(item.value),
                    paid_in: maskDate(item.paid_in),
                    description: item.description,
                    cash_register_group_description: item.cash_register_group_description
                }
            })
        });

        return new Promise((resolve, reject) => {
            htmlToPdf.create(html, { type: 'pdf', format: 'A4', orientation: 'portrait' })
                .toBuffer((err, buffer) => {
                    if (err) reject(err);

                    resolve(buffer)
                });
        })
    }
}

export {
    PdfMakerService
}