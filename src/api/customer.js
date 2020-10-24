import ProspaRequest from './propsaRequest';

export default class Customer extends ProspaRequest {
  constructor() {
    super();
  }

  fetchCustomers = async () => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get(
        `fredvoice/list_biz_customers/${this.businessAccountId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  createCustomer = async customerData => {
    const { name, email, phone, address } = customerData;
    const customerDetails = {
      biz_account_id: this.businessAccountId,
      customer_name: name,
      customer_email: email,
      customer_phone: phone,
      customer_address: address,
    };
    try {
      const { data } = await this.requestInstance.post(
        'fredvoice/add_biz_customer/',
        customerDetails,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  editCustomer = async customerData => {
    try {
      const { data } = await this.requestInstance.post(
        'fredvoice/edit_biz_customer/',
        customerData,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
