# sms-service

[![npm version](https://badge.fury.io/js/sms-service.svg)](https://badge.fury.io/js/sms-service)
[![Build Status](https://travis-ci.com/jmb12686/sms-service.svg?branch=master)](https://travis-ci.com/jmb12686/sms-service)
[![Coverage Status](https://coveralls.io/repos/github/jmb12686/sms-service/badge.svg)](https://coveralls.io/github/jmb12686/sms-service)
[![License](https://img.shields.io/npm/l/sms-service.svg)](https://www.npmjs.com/package/sms-service)

A simple way to send SMS text messages.

## Prerequisites

1. **AWS IAM User Credentials for programmatic access**

   This module utilizes Amazon SNS for sending SMS messages.  As such, this will require an AWS account and an **IAM User** with **programmatic access** keys.  The aws-sdk has a number of options for setting AWS credentials.  [Refer to the official AWS documentation for further instruction.](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html)

2. **IAM Policy for SNS**

   The AWS IAM user will require proper IAM policy permissions to publish SMS messages.  The SMS publish feature in SNS does not (for now) have a unique AWS resource, and thus there are no ideal ways to lock down access control.  However, here is a sample policy allowing access to only publish SMS messages while denying access to publish on topics, applications, and push notifications:

   ```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Deny",
                "Action": [
                    "sns:Publish"
                ],
                "Resource": "arn:aws:sns:*:*:*"
            },
            {
                "Effect": "Allow",
                "Action": [
                    "sns:Publish"
                ],
                "Resource": "*"
            }
        ]
    }
    ```
    If you know the set of recipients before hand, you can further tighten access control permissions by listing specific phone numbers in the last `Resource` node.

## Installation

1. **Install via npm:**
   ```bash
   npm install sms-service
   ```


## Usage

Within your javascript application, you can use the SMSService to send SMS text messages:

```javascript
//initialize
const sms = require('sms-service');
const smsService = new sms.SMSService();


async smsService.sendSMS('15555555555','hello from sms-service!');

```
The phoneNumber format **must be in E.164 format**.  For example, a USA based number of *555-555-5555*, the service would require *15555555555*.
[Refer to this guide for additional information.](https://support.twilio.com/hc/en-us/articles/223183008-Formatting-International-Phone-Numbers)


### Debug Logging
Debug logging is provided by [debug](https://www.npmjs.com/package/debug), and can be turned on setting the environment variable `DEBUG`.   

PowerShell Example:
```ps
$env:DEBUG = "*"
```

Bash:
```bash
$ export DEBUG=*
```

## Contributing
1. After merging feature branch changes back into master, follow semver and bump git version tag:
    ```bash
    $ git tag -a 1.X.X -m "adding version XXX"
    ```
2. bump npm module version:

    ```bash
    $ npm version from-git
    ```

    Note: `npm version` also will push all git commits and tags to origin.  This was configured in the `package.json` scripts:
    ```json
        "version": "npm run format && git add -A src",
        "postversion": "git push && git push --tags"
    ```
3. publish new release to npm:

    ```
    $npm publish
    
    ```
