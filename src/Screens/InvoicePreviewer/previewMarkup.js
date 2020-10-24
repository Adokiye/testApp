import moment from 'moment';
import { numToMoneyString } from '../../helpers/thousandSeparator';

const prepareItems = (items = []) => {
  let markup = '';
  items.forEach((item, index) => {
    markup += `
    <tr class="item">
      <td>
          Item ${index + 1}
      </td>
      <td>
          &#8358;${numToMoneyString(item.item_total_amount, false)}
      </td>
    </tr>`;
  });
  return markup;
};

export const prepareMarkup = (invoice, profile) => {
  const { biz_related_meta, pro_city, pro_state } = profile;

  const { biz_friendly_name, biz_country_name } = biz_related_meta[0];
  const {
    invoice_transaction_type,
    invoice_due_date,
    invoice_sub_total,
    invoice_grand_total,
    invoice_ship_amount,
    invoice_vat,
    invoice_items,
    pub_date,
    invoice_number,
    customer_details: { customer_name, customer_email },
    invoice_transaction_meta,
  } = invoice;

  let accountName = '';
  let accountNumber = '';
  let partnerBankName = '';
  if (invoice_transaction_meta) {
    const {
      account_name,
      account_number,
      partner_bank_name,
    } = invoice_transaction_meta;
    accountName = account_name;
    accountNumber = account_number;
    partnerBankName = partner_bank_name;
  }

  const dateCreated = moment(pub_date).format('MMMM D, YYYY');
  const dateDue = moment(invoice_due_date).format('MMMM D, YYYY');
  const ship_amount = numToMoneyString(invoice_ship_amount, false);
  const vat = numToMoneyString(invoice_vat, false);
  const subTotal = numToMoneyString(invoice_sub_total, false);
  const grandTotal = numToMoneyString(invoice_grand_total, false);
  const items = prepareItems(invoice_items);

  return `
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    
    <head>
        <meta charset="utf-8">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>{{Email Title}}</title>
        <style>
        a {
            text-decoration: none !important;
        }
    
        #outlook a {
            padding: 0;
        }
    
        body {
            width: 100% !important;
            min-width: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            Margin: 0;
            padding: 0;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
        }
        
        tr, p, a {
            font-size: 11px !important;
        }
    
        .invoice-box {
            margin: auto;
            border: 1px solid #eee;
            font-size: 16px;
            line-height: 24px;
            font-family: Arial, Helvetica, sans-serif, sans-serif;
            color: #555;
        }
    
        .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
        }
    
        .invoice-box table td {
            padding: 5px 15px;
            vertical-align: top;
        }
    
        .invoice-box table tr td:nth-child(2) {
            text-align: right;
        }
    
        .invoice-box table tr.top table td {
            padding-bottom: 20px;
        }
    
        .invoice-box table tr.top table td.title {
            font-size: 45px;
            line-height: 45px;
            color: #333;
        }
    
        .invoice-box table tr.information table td {
            padding-bottom: 40px;
            padding-top: 20px;
        }
    
        .invoice-box table tr.heading td {
            color: #fff;
            background: #26094F;
            border-bottom: 1px solid #26094F;
            font-weight: bold;
        }
    
        .invoice-box table tr.details td {
            padding-bottom: 20px;
        }
    
        .invoice-box table tr.item td {
            border-bottom: 1px solid #CCC;
        }
    
        .invoice-box table tr.item:nth-child(odd) {
           background: #E8E8E8 
        }
    
        .invoice-box table tr.item:nth-child(odd) td {
           border-bottom: none;
        }
    
        .btn-float {
            width: 60px;
            height: 60px;
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 9998;
            opacity: 1;
            filter: alpha(opacity=70);
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 50%;
            background: #0B3353;
            text-align: center;
            padding: 5px;
            transition: all 0.2s ease-in-out;
            -webkit-transition: all 0.2s ease-in-out;
            -moz-transition: all 0.2s ease-in-out;
            -o-transition: all 0.2s ease-in-out;
            -ms-transition: all 0.2s ease-in-out;
        }
    
        .btn-float:hover {
            background: #DF2A2E;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
            transform: scale(1.1, 1.1) translate3d(0px, 0px, 0px);
        }
    
        .btn-float i {
            font-size: 30px;
            color: #fff;
            position: relative;
            top: 15px;
        }
    
        
    
        /** RTL **/
        .rtl {
            direction: rtl;
            font-family: Arial, Helvetica, sans-serif, sans-serif;
        }
    
        .rtl table {
            text-align: right;
        }
    
        .rtl table tr td:nth-child(2) {
            text-align: left;
        }
        </style>
    </head>
    
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2" style="border-bottom: 1px solid #CCC;">
                        <table>
                            <tr>
                                <td></td>
                                <td style="padding-left:0;padding-right: 0;">
                                    ${biz_friendly_name}<br>
                                    ${biz_country_name}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td style="padding-left:0;padding-right: 0;">
                                    ${customer_name}<br>
                                    ${customer_email}
                                </td>
                                <td style="padding-left:0;padding-right: 0;">
                                    Invoice #: ${invoice_number}<br>
                                    Created: ${dateCreated}<br>
                                    Due: ${dateDue}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="heading">
                    <td>
                        Payment Method
                    </td>
                    <td>
                      ${invoice_transaction_type}
                    </td>
                </tr>
                <tr class="details">
                    <td style="width: 100%;">
                        <p style="margin-bottom: 10px;">Kindly make payment to:</p>
                        <p style="margin-top: 0; margin-bottom: 3px;">Account Name: <strong>${accountName}</strong></p>
                        <p style="margin-top: 0; margin-bottom: 3px;">Account Number: <strong>${accountNumber}</strong></p>
                        <p style="margin-top: 0;">Bank Name: <strong>${partnerBankName}</strong></p>
                    </td>
                    <td></td>
                </tr>
                <tr class="heading">
                    <td>
                        Item
                    </td>
                    <td>
                        Amount
                    </td>
                </tr>
                ${items}
                <tr class="total">
                    <td colspan="2" style="padding-left: 50%;">
                        <table style="width: 100%;" align="right">
                            <tr>
                                <td style="padding-right: 0;font-weight:500">
                                    Total:
                                </td>
                                <td style="padding-left:0;padding-right: 0;font-weight:700;">
                                    &#8358;${subTotal}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-right: 0;font-weight:500">
                                    Shipping:
                                </td>
                                <td style="padding-left:0;padding-right: 0;font-weight:500">
                                    &#8358;${ship_amount}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-right: 0;font-weight:500">
                                    VAT:
                                </td>
                                <td style="padding-left:0;padding-right: 0;font-weight:500">
                                    &#8358;${vat}
                                </td>
                            </tr>
                            <tr>
                                <td style="padding-right: 0px;font-weight:700;border-top:4px solid #CCC;background-color:#F6F6F6;">
                                    Amount due
                                </td>
                                <td align="right" style="padding-left:0;padding-right: 2px;font-weight:700;border-top:4px solid #CCC;background-color:#F6F6F6;">
                                    &#8358;${grandTotal}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
            <table cellspacing="0" cellpadding="0" border="0" align="center" style="width:100%;max-width:100%;background: #26094F;margin-top: 50px;">
                <tr>
                    <td align="center" valign="top" style="padding: 15px 10px 0;">
                        <p style="font-family:Arial, Helvetica, sans-serif, sans-serif;font-weight:500;color: #fff;font-size: 14px;text-align: center;line-height: 20px;">This invoice was generated using Prospa: accounts built for business. Prospa makes accounts that help entrepreneurs grow their business.</p>
                        <p style="font-family:Arial, Helvetica, sans-serif, sans-serif;font-weight:500;color: #fff;font-size: 14px;text-align: center;">For more information visit <a href="https://getprospa.com/" target="_blank" style="color: #FFF;">www.getprospa.com</a></p>
                        <ul style="list-style:none;padding:15px 0;margin:0;">
                            <li style="display: inline-block;padding-right: 10px;"><a href="https://www.facebook.com/getprospa/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADpSURBVEiJ7ZMxigJREETfyAaCyAQmIngIgw28gGAqiBcwEM/gGTyDBxCTBVPByBMYCJpvsiwoKAiWyQSj9miPLouCFf1uqquKbj6kgKSSpL6khaStTtG1Zj5SiFeBL6CQQDH7Gad4CIyuiCfCZQC0gWJacfCvqGb0NsAE2EX19J4AAEia6xJNz6x3RVmjt/xLAwvykMwbSCoD9Vgrb9Aakj6j9wEYBkHw64sm9Yyd30LL0kpaUeBK4sAjN3gOg6SPNgZysboDhGecAfAdq2d3p5C0Mo5a8cy+/g3eBm+D/zP4Oav3wNozeATVC6CKKBiO4wAAAABJRU5ErkJggg==" width="20"></a></li>
                            <li style="display: inline-block;padding-right: 10px;"><a href="https://www.instagram.com/getprospa/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHxSURBVEiJrZa9blNBEIXPJXYKUlHQBjsSLpPwBFiRXUHEU1DzU/IjBIFHoML5ewF+0vES0BKBlCBRB2J3dqKPYs9yN869tq/wSCt5x3PO2d0ZzVwpMeAWsAv8BIbMbkNjdoB1jRuQAW+A8wqkZXYObAGZJNWs8VrSE//+KOmdpB+Szi6dpthqkm5Kui/pnqRn9j+PzxJP/mBGwlIDHiY3WRPhzQHe/wfpW+AP8NT7T+bclpMDcGcKySKw4rWY+K8l7z+wb9P7Y5FXS6uEuAnsA4OEqA/sAQ1CgXy2v2dMy/uhElCzgHzDV4828or2G2hb5PrYoQAoFXBQJP8GdIEFry5wmIg0CrBTBfYT8qWC2y0BXxyzW0mAkND45t3CrIe4jmNOgXoVgRX7RsDCBIEaeU5S/D+BK2XgeVmZwC9JA4UWsDEB33ZM35jLNiHJe/YfliT5KvDVMTtj/81URQ1CCeJq6ZCXaSchPwGWKws4sJ2IAJx5RTsBbhfgLghMaxU3CA2xnxCfEobLcgnmQquIze5uUXACqvtkTZKaL4mNze5IPgnAh0mgKgYcmLMnYJ184DyaA/njJF+rmZ1bysfcgcLI/C5pNCNvXVJLYWRu2vcqy7IXUTUjDOp5Df2XeOiPX28N2AaOqf7ZcgT0gNWU8y8kDkzjFkf2XAAAAABJRU5ErkJggg==" width="20"></a></li>
                            <li style="display: inline-block;padding-right: 10px;"><a href="https://twitter.com/GetProspa"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGVSURBVEiJ5ZU7Sx1BGIafOcZC0SKNGDsRUtgkJG28BNIIWorYWYuQtBIsAlaSIlgIYik2mpT5Abk0KUQERQRBDAhH7Yx4AXOeFLsDRzmX4cRGfJsd9pv3st/M7MB9R2iUqA4A40A3cAx8BVZDCKW83g40x8kTak+icEFdsjJ+qiPqvLqptkTSlvo7xUSdqSJejlP1lfosks7ywqE6WEO8Vf2TYLCnHqmvI/GgrPhXXVQ7Kxj0J4jHLxgqJy5UmHSpLqvDZguG+ibR4OPtZF3qSQ3CtbqrricavI/aBbUAfAJWgOsq7W8CngIv6m2CHMU4eBRCKKm9wGgiOQW7cVDIn3N3KH4K/LrxRg3qSmJ/62Gtom1uMqlu/6dBXzWDTnXHbA83im+3deMaEEIoAl+A9gZ7fwW8rTkjb9MH9aKB9O+So5gdvCn1PFF8QU379attuXgxUXy2ll4wW/XnQAfZSe0H2hKyHAFTIYTP9RIHdUz9oZYSEu+r02pKiJtXptoN9AEvgSfAY+A8T7sDfAc24rX4MPAP1cBy/Wf1VnAAAAAASUVORK5CYII=" width="20"></a></li>
                            <li style="display: inline-block;"><a href="https://www.linkedin.com/company/prospabank/"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEdSURBVEiJ7ZQ9L4RBFEbPZRMFDREqJGxB4T/gN0iUOlFoROMvKESplW1UIhKFQuNjlSh0QiFR+ahIKDgKWTZrJJvZV+epJs9z5547mckEgFoGJoEXYC8i7ihK6rT66rce1LEiAZf+VKWo/m1Ab8LvKxKwnfC3igKgdqor6rlaVefVKAzw12p5UnUYGAW6gGvgLCLe6gt2Eq9oqS7fTeSL6oi6n8hu1Jna/lLm4INAFehPZAPAptoTEettmYCFX5rXFMCaOpQLqJ38AjgAnhI1HcBcLuAdmI2I8YiY4POSrxJ1U7mAnYj4+k4i4hZYTdSVcwGnTXrduYDnhPeY8NpzAU3rH/APaF0loAKcNPiHdesN4KghP070ugeWG80PjGO33PLDTOsAAAAASUVORK5CYII=" width="20"></a></li>
                        </ul>
                    </td>
                </tr>
            </table>
        </div>
    </body>
    
    </html>`;
};
