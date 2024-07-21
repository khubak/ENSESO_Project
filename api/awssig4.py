import hashlib
import hmac
import datetime

region = 'us-west-2'
service = 's3'

canonical_uri = '/'
canonical_querystring = ''
canonical_headers = 'host:s3.amazonaws.com\nx-amz-date:20210717T000000Z\n'
payload = ''


def sign(key, msg):
    return hmac.new(key, msg.encode('utf-8'), hashlib.sha256).digest()


def getSignatureKey(key, dateStamp, regionName, serviceName):
    kDate = sign(('AWS4' + key).encode('utf-8'), dateStamp)
    kRegion = sign(kDate, regionName)
    kService = sign(kRegion, serviceName)
    kSigning = sign(kService, 'aws4_request')
    return kSigning


def calculate_aws4_signature(api_key, api_secret, http_method, canonical_headers, timestamp):
    # Step 1: Create a date for headers and the credential string
    t = datetime.datetime.strptime(timestamp, '%Y%m%dT%H%M%SZ')
    amz_date = t.strftime('%Y%m%dT%H%M%SZ')  # Format: YYYYMMDD'T'HHMMSS'Z'
    # Date w/o time, used in credential scope
    date_stamp = t.strftime('%Y%m%d')

    # Step 2: Create canonical request
    payload_hash = hashlib.sha256(payload.encode('utf-8')).hexdigest()
    canonical_request = f"{http_method}\n{canonical_uri}\n{canonical_querystring}\n{canonical_headers}\n{payload_hash}"

    # Step 3: Create the string to sign
    algorithm = 'AWS4-HMAC-SHA256'
    credential_scope = f"{date_stamp}/{region}/{service}/aws4_request"
    string_to_sign = f"{algorithm}\n{amz_date}\n{credential_scope}\n{hashlib.sha256(canonical_request.encode('utf-8')).hexdigest()}"

    # Step 4: Calculate the signature
    signing_key = getSignatureKey(api_secret, date_stamp, region, service)
    signature = hmac.new(signing_key, string_to_sign.encode(
        'utf-8'), hashlib.sha256).hexdigest()

    # Step 5: Add signing information to the request
    authorization_header = f"{algorithm} Credential={api_key}/{credential_scope}, SignedHeaders=host;x-amz-date, Signature={signature}"

    return {
        "x-amz-date": amz_date,
        "Authorization": authorization_header
    }


# Example usage
if __name__ == 'main':
    api_key = '55305bd623f10f22b8f3427916da8b0a'
    api_secret = '28b5b016e14c839c85cd736e30d7ed0a'
    timestamp = '20210717T000000Z'  # Example timestamp
    http_method = 'GET'
    headers = calculate_aws4_signature(
        api_key, api_secret, http_method, timestamp)
    print(headers)
