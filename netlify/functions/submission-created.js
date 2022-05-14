const SibApiV3Sdk = require('sib-api-v3-sdk');

let defaultClient = SibApiV3Sdk.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

console.log(`Using API key ${process.env.SENDINBLUE_API_KEY}`);

exports.handler = async function (event, context) {
    console.log(event);
    let body = JSON.parse(event.body);
    let payload = body.payload;

    if (!payload.email) {
        console.log('missing email')
        return callback(null, {
            statusCode: 400,
            body: JSON.stringify({
                error: 'missing email'
            })
        })
    }
    console.log("Sending data to SendInBlue");

    // Subscribe an email
    let apiInstance = new SibApiV3Sdk.ContactsApi();
    let createContact = new SibApiV3Sdk.CreateContact();

    createContact.email = payload.email;
    createContact.listIds = [2]
    if (payload.first_name || payload.last_name) {
        createContact.attributes = {};
    }
    if (payload.first_name) {
        createContact.attributes['FNAME'] = payload.first_name;
    }
    if (payload.last_name) {
        createContact.attributes['LNAME'] = payload.last_name;
    }

    try {
        let data = await apiInstance.createContact(createContact);
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
        return {
            statusCode: 200
        };
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500
        };
    }
};
