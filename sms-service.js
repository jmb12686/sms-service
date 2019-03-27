// // // Create publish parameters
// var params = {
//     Message: 'TEXT_MESSAGE', /* required */
//     PhoneNumber: 'E.164_PHONE_NUMBER',
//   };
  
//   // Create promise and SNS service object
//   var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();







// // Create SMS Attribute parameters
// var params = {
//     attributes: { /* required */
//       'DefaultSMSType': 'Transactional', /* highest reliability */
//       //'DefaultSMSType': 'Promotional' /* lowest cost */
//     }
//   };
  
//   // Create promise and SNS service object
//   var setSMSTypePromise = new AWS.SNS({apiVersion: '2010-03-31'}).setSMSAttributes(params).promise();