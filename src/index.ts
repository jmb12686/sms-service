import { SNS } from 'aws-sdk';
import { PublishResponse } from 'aws-sdk/clients/sns';
import { Debug, Debugger } from 'debug';
import debug = require('debug');

class SMSService {
  private snsClient: SNS;
  private logger: Debugger;
  constructor(awsRegion: string = 'us-east-1') {
    this.snsClient = new SNS({ region: awsRegion });
    this.logger = debug('sms-service');
  }

  public async sendSMS(phoneNumber: string, messageBody: string): Promise<string> {
    const requestParams = {
      Message: messageBody,
      PhoneNumber: phoneNumber,
    };
    try {
      const response: PublishResponse = await this.snsClient.publish(requestParams).promise();
      this.logger('publish response: ' + JSON.stringify(response));
      return 'Success';
    } catch (err) {
      console.error(err, err.stack);
      throw new Error('Error: exception caught while attempting to send message');
    }
  }
}

export { SMSService };
