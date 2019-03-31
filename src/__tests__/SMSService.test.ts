import AWS = require('aws-sdk');
import AWS_MOCK = require('aws-sdk-mock');
import { SMSService } from '../index';

let fakePublish: any;
let expectedParams: any;
jest.setTimeout(15000);

beforeAll(done => {
  fakePublish = jest.fn().mockResolvedValue({ data: 'success' });
  AWS_MOCK.mock('SNS', 'publish', fakePublish);
  expectedParams = {
    Message: 'this is a test from TypeScript/JS SMSService!',
    PhoneNumber: '15555555555',
  };
  done();
});

afterAll(done => {
  AWS_MOCK.restore();
  done();
});

test('sms service sends text message', async () => {
  expect.assertions(6);
  let errorThrown: boolean = false;
  const smsService = new SMSService();
  try {
    const result = await smsService.sendSMS(expectedParams.PhoneNumber, expectedParams.Message);
    expect(result).toEqual('Success');
  } catch (err) {
    errorThrown = true;
    console.log(err, err.stack);
  } finally {
    expect(errorThrown).toEqual(false);
    expect(fakePublish).toHaveBeenCalledTimes(1);
    expect(fakePublish.mock.calls[0][0]).toEqual(expectedParams);
    expect(fakePublish.mock.calls[0][0].Message).toEqual(expectedParams.Message);
    expect(fakePublish.mock.calls[0][0].PhoneNumber).toEqual(expectedParams.PhoneNumber);
    // done();
  }
});

test('exception handling', async () => {
  expect.assertions(1);
  fakePublish = jest.fn().mockRejectedValue(new Error('error from AWS.SMS'));
  AWS_MOCK.remock('SNS', 'publish', fakePublish);
  const smsService = new SMSService();
  try {
    await smsService.sendSMS(expectedParams.PhoneNumber, expectedParams.Message);
  } catch (err) {
    expect(err.message).toMatch('Error: exception caught while attempting to send message');
  }
});
