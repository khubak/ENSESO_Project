from flask import Flask, request, jsonify
from flask_cors import CORS
from db_functions import execute_stored_procedure, map_response
from response_fields import *
from flask_caching import Cache
import logging_config

app = Flask(__name__)
#app.config['CACHE_TYPE'] = 'simple'
#cache = Cache(app)
CORS(app)

# Setup logging
logger = logging_config.setup_logging()

# User login
@app.route('/login', methods=['POST'])
def user_login():
    logger.info("User login endpoint called")
    if not request.is_json:
        logger.error("Request is not JSON")
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    logger.info(f"Request data: {data}")

    required_fields = [
        "username", "password", "language_id",
        "api_log"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    logger.info(f"Login parameters: {params}")

    result = map_response(execute_stored_procedure(
        'user_login', params), login_response_fields)
    logger.info(f"Login result: {result}")

    api_key = result[0]['api_key']

    user_get_secret = map_response(execute_stored_procedure(
        'user_get_secret', [api_key]), user_get_secret_response_fields)
    logger.info(f"User get secret result: {user_get_secret}")

    if (user_get_secret[0]['status'] == 'OK'):
        users_id = user_get_secret[0]['users_id']
        execute_stored_procedure('user_authenticate', [users_id])
        #cache.set(api_key, users_id, timeout=10000)
        logger.info(f"User authenticated and cached with key: {api_key}")

    return jsonify(result)


# Create Economic Operator
@app.route('/eo', methods=['POST'])
def eo_register():
    logger.info("EO register endpoint called")
    if not request.is_json:
        logger.error("Request is not JSON")
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    logger.info(f"Request data: {data}")

    required_fields = [
        "EO_Name1", "EO_Name2", "EO_Address_Name", "EO_Address_StreetOne",
        "EO_Address_StreetTwo", "EO_Address_City", "EO_Address_PostCode", "EO_CountryReg",
        "EO_Email", "EO_Phone", "EO_A_Info", "VAT_R",
        "VAT_N", "TAX_N", "EO_ExciseNumber1", "EO_ExciseNumber2",
        "OtherEOID_R", "OtherEOID_N_list", "Reg_3RD", "Reg_EOID",
        "EO_OtherID", "Extensibility", "EO_Type", "users_id",
        "api_log"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    logger.info(f"EO register parameters: {params}")

    result = execute_stored_procedure('EO_register', params)
    logger.info(f"EO register result: {result}")

    return jsonify(map_response(result, create_eo_response_fields))


# Update of Economic Operator
@app.route('/eo/<id>', methods=['PUT'])
def eo_update(id):
    logger.info(f"EO update endpoint called with ID: {id}")
    if not request.is_json:
        logger.error("Request is not JSON")
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    logger.info(f"Request data: {data}")

    required_fields = [
        "EO_Name1", "EO_Name2", "EO_Address_Name", "EO_Address_StreetOne",
        "EO_Address_StreetTwo", "EO_Address_City", "EO_Address_PostCode", "EO_CountryReg",
        "EO_Email", "EO_Phone", "EO_A_Info", "VAT_R",
        "VAT_N", "TAX_N", "EO_ExciseNumber1", "EO_ExciseNumber2",
        "OtherEOID_R", "OtherEOID_N_list", "Reg_3RD", "Reg_EOID",
        "EO_OtherID", "Extensibility", "EO_Type", "EO_ID",
        "EO_CODE", "users_id", "api_log"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    logger.info(f"EO update parameters: {params}")

    result = execute_stored_procedure('EO_update', params)
    logger.info(f"EO update result: {result}")

    return jsonify(map_response(result, update_eo_response_fields))


# Delete Economic Operator
@app.route('/eo/<id>', methods=['DELETE'])
def eo_delete(id):
    logger.info(f"EO delete endpoint called with ID: {id}")
    required_params = [
        "EO_ID", "EO_CODE", "Reg_3RD", "Reg_EOID",
        "Extensibility", "users_id", "api_log"
    ]

    params = [request.args.get(param) for param in required_params]
    logger.info(f"EO delete parameters: {params}")

    if any(param is None for param in params):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400

    result = execute_stored_procedure('EO_delete', params)
    logger.info(f"EO delete result: {result}")

    return jsonify(map_response(result, delete_eo_response_fields))


# List of Economic Operators
@app.route('/eolist', methods=['GET'])
def query_eolist():
    logger.info("Query EO list endpoint called")
    required_params = [
        'users_id', 'api_log'
    ]

    params = [request.args.get(param) for param in required_params]
    logger.info(f"EO list query parameters: {params}")

    if any(param is None for param in params):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400

    result = execute_stored_procedure('query_eolist', params)
    logger.info(f"EO list result: {result}")

    return jsonify(map_response(result, get_eolist_response_fields))


# Economic operator details
@app.route('/eo/<id>', methods=['GET'])
def query_eo(id):
    logger.info(f"Query EO details endpoint called with ID: {id}")
    required_params = [
        "EO_ID", "users_id", "api_log"
    ]

    params = [request.args.get(param) for param in required_params]
    logger.info(f"EO details query parameters: {params}")

    if any(param is None for param in params):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400

    result = execute_stored_procedure('query_eo', params)
    logger.info(f"EO details result: {result}")

    return jsonify(map_response(result, get_one_eo_response_fields))


if __name__ == '__main__':
    app.run(debug=True)
