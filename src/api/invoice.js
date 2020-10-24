import ProspaRequest from './propsaRequest';

export default class Invoice extends ProspaRequest {
  constructor() {
    super();
  }

  fetchInvoices = async () => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get(
        `fredvoice/biz_invoices/${this.businessAccountId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  trimData = data => {
    const keys = Object.keys(data);
    keys.forEach(key => {
      if (!data[key] || data[key] === '') {
        delete data[key];
      }
    });
    return data;
  };

  createInvoice = async invoiceData => {
    const {
      recipients,
      invoiceItems,
      shippingCost,
      taxRate = '',
      dueDate,
      invoice_sub_total,
      invoice_grand_total,
      invoiceSummary = '',
      invoice_vat = '',
      invoice_note = '',
    } = invoiceData;

    let data = {
      customer_id: recipients[0].customer_id,
      invoice_summary: invoiceSummary,
      invoice_transaction_type: 'transfer',
      invoice_due_date: dueDate,
      invoice_tax_rate: taxRate,
      invoice_full_item: invoiceItems,
      invoice_sub_total,
      invoice_grand_total,
      invoice_ship_amount: shippingCost,
      invoice_vat,
      invoice_note,
    };

    data = this.trimData(data);

    try {
      const result = await this.requestInstance.post(
        '/fredvoice/create_customer_invoice/',
        data,
      );
      return result.data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  sendInvoice = async invoiceId => {
    try {
      const { data } = await this.requestInstance.post(
        '/fredvoice/send_customer_invoice/',
        {
          invoice_id: invoiceId,
        },
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
