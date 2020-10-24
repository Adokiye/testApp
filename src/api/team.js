import ProspaRequest from './propsaRequest';

export default class Team extends ProspaRequest {
  constructor() {
    super();
  }

  fetchTeamMembers = async () => {
    try {
      const {
        data: { data },
      } = await this.requestInstance.get(
        `account/list_mybiz_member/${this.businessAccountId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  addTeamMember = async teamData => {
    const { first_name, last_name, email, phone, role } = teamData;
    const teamDetails = {
      biz_account_id: this.businessAccountId,
      first_name,
      last_name,
      rep_phone: phone,
      rep_email: email,
      role_type: role,
    };
    try {
      const { data } = await this.requestInstance.post(
        'account/add_mybiz_member/',
        teamDetails,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  removeTeamMember = async teamData => {
    const { biz_member_id } = teamData;
    const teamDetails = {
      biz_member_id,
    };
    try {
      const { data } = await this.requestInstance.post(
        'account/remove_mybiz_member/',
        teamDetails,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
}
