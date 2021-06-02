import pdfKit from 'pdfkit';
import { CashRegisterReportList } from '../entities/CashRegister';
import { maskDate, maskValue } from '../util';

class PdfMakerService {
    cashRegisterReport = (report: CashRegisterReportList, cashOnHand: number): Promise<Buffer> => {
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
                    `Relatório - De `+
                    `${maskDate(new Date(report.date_start))} até `+
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
                `Despesas: ${maskValue(report.expense)} ` +
                `Lucro: ${maskValue(report.profit)}`,
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
}

export {
    PdfMakerService
}