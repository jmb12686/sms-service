import AWS = require('aws-sdk');
import AWS_MOCK = require('aws-sdk-mock');
import { SMSService } from '../index';

let fakePublish: any;
jest.setTimeout(15000);

beforeAll(done => {
  fakePublish = jest.fn().mockResolvedValue({ data: 'success' });
  AWS_MOCK.mock('SNS', 'publish', fakePublish);
  done();
});

afterAll(done => {
  AWS_MOCK.restore();
  done();
});

test('sms service sends text message', done => {
  let errorThrown: boolean = false;
  const expectedParams = {
    Message: 'this is a test from TypeScript/JS SMSService!',
    PhoneNumber: '15555555555',
  };
  const smsService = new SMSService();
  try {
    smsService.sendSMS(expectedParams.PhoneNumber, expectedParams.Message);
  } catch (err) {
    errorThrown = true;
    console.log(err, err.stack);
  } finally {
    expect(errorThrown).toEqual(false);
    expect(fakePublish).toHaveBeenCalledTimes(1);
    expect(fakePublish.mock.calls[0][0]).toEqual(expectedParams);
    expect(fakePublish.mock.calls[0][0].Message).toEqual(expectedParams.Message);
    expect(fakePublish.mock.calls[0][0].PhoneNumber).toEqual(expectedParams.PhoneNumber);
    done();
  }
});
