import ProspaRequest from './propsaRequest';

export default class Auth extends ProspaRequest {
  constructor() {
    super();
  }

  login = async userData => {
    try {
      const { data } = await this.noTokenRequestInstance.post(
        '/account/prospa_login/',
        userData,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
