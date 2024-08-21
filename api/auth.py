from db_functions import execute_stored_procedure, map_response
from response_fields import user_get_secret_response_fields
from awssig4 import calculate_aws4_signature
import re


def auth(auth_header, xamzdate_header, method, required_params):
    req_api_key = get_api_key(auth_header)
    req_aws4_sig = get_aws4_sig(auth_header)

    if (check_aws4_params(req_api_key, req_aws4_sig) == False):
        return False

    response = map_response(execute_stored_procedure(
        "user_get_secret", [req_api_key]), user_get_secret_response_fields)

    # Calculate AWS4 Signature
    api_secret = response[0]['api_secret']
    aws4_sig = calculate_aws4_signature(
        req_api_key, api_secret, method, xamzdate_header)

    # Compare AWS4 Signatures
    if (compare_aws4_signatures(req_aws4_sig, aws4_sig) == False):
        return False

    users_id = response[0]['users_id']

    execute_stored_procedure("user_authenticate", [users_id])
    required_params.append(users_id)
    print(f"req params in auth: {required_params}")
    # Check AWS
    return True


def get_api_key(auth_header):
    api_key_match = re.search(r'Credential=([^/]+)', auth_header)

    if api_key_match:
        api_key = api_key_match.group(1)

        return api_key

    return 0


def get_aws4_sig(auth_header):
    aws4_sig_match = re.search(r'Signature=([a-f0-9]+)', auth_header)

    if aws4_sig_match:
        aws4_sig = aws4_sig_match.group(1)

        return aws4_sig

    return 0


def check_aws4_params(api_key, aws4_sig):
    return (api_key != 0 and aws4_sig != 0)


def compare_aws4_signatures(sig1, sig2):
    return sig1 == sig2
