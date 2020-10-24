import ProspaRequest from './propsaRequest';

export default class User extends ProspaRequest {
  constructor() {
    super();
  }

  fetchUserProfile = async () => {
    try {
      const {
        data: {data},
      } = await this.requestInstance.get('account/my_prospa_profile/');
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
