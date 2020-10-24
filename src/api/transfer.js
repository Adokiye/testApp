import ProspaRequest from './propsaRequest';

export default class Transfer extends ProspaRequest {
  constructor() {
    super();
  }

  fetchBeneficiaries = async accountNumber => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get(
        `/express/biz_account_beneficiary/${accountNumber}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  fetchPendingTransactions = async () => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get(
        `/express/biz_pending_transfers/${this.businessAccountId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  fetchListedBanks = async () => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get('/extra/listed_ng_banks/');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  makeTransferFirstStep = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/express/new_fund_transfer/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  makeTransferSecondStep = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/express/new_fund_transfer/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  makeBeneficiaryTrasfer = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/express/oneclick_fund_transfer/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  transferBetweenWallets = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/express/wallet_fund_transfer/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
