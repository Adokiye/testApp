import ProspaRequest from './propsaRequest';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import CONFIG from '../config';

export default class Account extends ProspaRequest {
  constructor() {
    super();
  }

  getBusinessAccounts = async () => {
    try {
      const { data } = await this.requestInstance.get(
        '/account/holder_biz_accounts/',
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  getInflowOutflow = async () => {
    try {
      const { data } = await this.requestInstance.get(
        `/express/per_month_flow/${this.businessAccountId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  getWalletInflowOutflow = async walletId => {
    try {
      const { data } = await this.requestInstance.get(
        `/express/per_sub_monthly_flow/${walletId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  changePlan = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/account/upgrade_biz_account/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  fetchWalletTransactions = async walletId => {
    try {
      const { data } = await this.requestInstance.get(
        `/runna/all_wallet_transactions/${walletId}/`,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };

  grantAccessWithPin = async payload => {
    try {
      const { data } = await this.requestInstance.post(
        '/account/grant_by_pin/',
        payload,
      );
      return data;
    } catch (err) {
      return this.handleError(err);
    }
  };
  updateWalletAllocation = async payload => {
    console.log(JSON.stringify(payload));
    try {
      const { data } = await this.requestInstance.post(
        'account/stake_share_add/',
        payload,
      );
      return data;
    } catch (err) {
      console.log(err);
      return this.handleError(err);
    }
  };
  getStatements = async data => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ],
        {
          title: 'Prospa Storage Permission',
          message: 'Prospa needs access to your storage',
        },
      );
      console.log(granted);
      if (
        granted['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        granted['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
      ) {
        console.log(this._token);
        console.log(JSON.stringify(data));
        const dirs = RNFetchBlob.fs.dirs;
        const android = RNFetchBlob.android
        try {
          const new_data = await this.requestInstance.post(
            'express/ask_monthly_statement/',
            data,
          );
          await RNFetchBlob.config({
            // add this option that makes response data to be stored as a file,
            // this is much more performant.
            fileCache: true,
            addAndroidDownloads: {
              fileCache: true,
              useDownloadManager: true,
              notification: true,
              path: dirs.DownloadDir +"/"+ data.month_num + '.pdf',
              description: 'Downloading Statement...',
              overwrite: true,
              title: data.month_num+'.pdf',
              indicator: true,
            },
          })
            .fetch('GET', new_data.data.statement_url, {
              Authorization: 'Token ' + this._token,
            })
            .then(res => {
              // the temp file path//
              if (Platform.OS = 'android') {
                android.actionViewIntent(res.path(), 'application/pdf')
                }
                return res;
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        } catch (err) {
          console.log(err);
          //         return this.handleError(err); //
        }
      } else {
        console.log('Prospa Storage Permission denied');
      }
    } catch (err) {
      return this.handleError(err);
    }
  };
}
//
