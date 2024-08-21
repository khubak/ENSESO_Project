// Include the CryptoJS library via CDN in your HTML file:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>

const region = "us-west-2";
const service = "s3";

const canonicalUri = "/";
const canonicalQuerystring = "";
const canonicalHeaders = "host:s3.amazonaws.com\nx-amz-date:20210717T000000Z\n";
const payload = "";

const sign = (key, msg) =>
  CryptoJS.HmacSHA256(msg, key);

const getSignatureKey = (key, dateStamp, regionName, serviceName) => {
  const kDate = sign(`AWS4${key}`, dateStamp);
  const kRegion = sign(kDate, regionName);
  const kService = sign(kRegion, serviceName);
  const kSigning = sign(kService, "aws4_request");
  return kSigning;
};

const calculateAws4Signature = (apiKey, apiSecret, httpMethod) => {
  // Step 1: Create a date for headers and the credential string
  const t = new Date();
  const amzDate = t.toISOString().replace(/[:-]|\.\d{3}/g, ""); // Format: YYYYMMDD'T'HHMMSS'Z'
  const dateStamp = amzDate.substr(0, 8); // Date w/o time, used in credential scope

  // Step 2: Create canonical request
  const payloadHash = CryptoJS.SHA256(payload).toString(CryptoJS.enc.Hex);
  const canonicalRequest = `${httpMethod}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\n${payloadHash}`;

  // Step 3: Create the string to sign
  const algorithm = "AWS4-HMAC-SHA256";
  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = `${algorithm}\n${amzDate}\n${credentialScope}\n${CryptoJS.SHA256(canonicalRequest).toString(CryptoJS.enc.Hex)}`;

  // Step 4: Calculate the signature
  const signingKey = getSignatureKey(apiSecret, dateStamp, region, service);
  const signature = CryptoJS.HmacSHA256(stringToSign, signingKey).toString(CryptoJS.enc.Hex);

  // Step 5: Add signing information to the request
  const authorizationHeader = `${algorithm} Credential=${apiKey}/${credentialScope}, SignedHeaders=host;x-amz-date, Signature=${signature}`;

  return {
    "x-amz-date": amzDate,
    Authorization: authorizationHeader,
  };
};

// Example usage
/*
const apiKey = "55305bd623f10f22b8f3427916da8b0a";
const apiSecret = "28b5b016e14c839c85cd736e30d7ed0a";
const httpMethod = "GET";
const headers = calculateAws4Signature(apiKey, apiSecret, httpMethod);
console.log(headers);
*/

export default calculateAws4Signature;
