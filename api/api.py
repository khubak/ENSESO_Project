from flask import Flask, request, jsonify, g
from flask_cors import CORS
from db_functions import execute_stored_procedure, map_response
from response_fields import *
import logging_config
import uuid
from auth import auth

app = Flask(__name__)
CORS(app)

# Setup logging
logger = logging_config.setup_logging()


@app.before_request
def before_request():
    if request.method != 'OPTIONS':
        # Generate a unique request ID for each request
        g.request_id = str(uuid.uuid4())
        g.api_log = f"{g.request_id}.log"
        logger.info(f"Request ID {g.request_id} started")


@app.after_request
def after_request(response):
    if request.method != 'OPTIONS':
        # Log the end of the request with the response status
        logger.info(
            f"Request ID {g.request_id} completed with status {response.status_code}")
    return response


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
        "username", "password", "language_id"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    params.append(g.api_log)
    logger.info(f"Login parameters: {params}")

    result = map_response(execute_stored_procedure(
        'user_login', params), login_response_fields)
    logger.info(f"Login result: {result}")

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
        "EO_OtherID", "Extensibility", "EO_Type"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    
    logger.info("Checking authorization!")
    authCheck = auth(request.headers.get("Authorization"),
                     request.headers.get("x-amz-date"), "POST", params)

    if (authCheck == False):
        logger.error("Authorization failed!")
        return jsonify({"error": "Unauthorized"}), 401
    logger.info("Request authorization succesful!")
    
    params.append(g.api_log)
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
        "EO_CODE"
    ]

    if not all(field in data for field in required_fields):
        logger.error("Missing fields in request data")
        return jsonify({"error": "Missing fields in request data"}), 400

    params = [data[field] for field in required_fields]
    
    logger.info("Checking authorization!")
    authCheck = auth(request.headers.get("Authorization"),
                     request.headers.get("x-amz-date"), "PUT", params)

    if (authCheck == False):
        logger.error("Authorization failed!")
        return jsonify({"error": "Unauthorized"}), 401
    logger.info("Request authorization succesful!")
    
    params.append(g.api_log)
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
        "Extensibility"
    ]

    params = [request.args.get(param) for param in required_params]

    if any(param is None for param in params):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400
    
    logger.info("Checking authorization!")
    authCheck = auth(request.headers.get("Authorization"),
                     request.headers.get("x-amz-date"), "DELETE", params)

    if (authCheck == False):
        logger.error("Authorization failed!")
        return jsonify({"error": "Unauthorized"}), 401
    logger.info("Request authorization succesful!")

    params.append(g.api_log)
    logger.info(f"EO delete parameters: {params}")
    result = execute_stored_procedure('EO_delete', params)
    logger.info(f"EO delete result: {result}")

    return jsonify(map_response(result, delete_eo_response_fields))


# List of Economic Operators
@app.route('/eolist', methods=['GET'])
def query_eolist():
    logger.info("Query EO list endpoint called")
    params = []
    logger.info("Checking authorization!")
    authCheck = auth(request.headers.get("Authorization"),
                     request.headers.get("x-amz-date"), "GET", params)

    if (authCheck == False):
        logger.info("Authorization failed!")
        return jsonify({"error": "Unauthorized"}), 401
    logger.info("Request authorization succesful!")

    params.append(g.api_log)
    logger.info(f"EO list query parameters: {params}")

    # Exclude g.api_log from the check
    if any(param is None for param in params[:-1]):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400
    print(f'eolist params:')
    result = execute_stored_procedure('query_eolist', params)
    logger.info(f"EO list result: {result}")

    return jsonify(map_response(result, get_eolist_response_fields))


# Economic operator details
@app.route('/eo/<id>', methods=['GET'])
def query_eo(id):
    logger.info(f"Query EO details endpoint called with ID: {id}")
    required_params = [
        "EO_ID",
    ]

    params = [request.args.get(param) for param in required_params]
    
    logger.info("Checking authorization!")
    authCheck = auth(request.headers.get("Authorization"),
                     request.headers.get("x-amz-date"), "GET", params)

    if (authCheck == False):
        logger.info("Authorization failed!")
        return jsonify({"error": "Unauthorized"}), 401
    logger.info("Request authorization succesful!")
    
    params.append(g.api_log)
    logger.info(f"EO details query parameters: {params}")

    # Exclude g.api_log from the check
    if any(param is None for param in params[:-1]):
        logger.error("Missing query parameters")
        return jsonify({"error": "Missing query parameters"}), 400

    result = execute_stored_procedure('query_eo', params)
    logger.info(f"EO details result: {result}")

    return jsonify(map_response(result, get_one_eo_response_fields))


if __name__ == '__main__':
    #app.run(debug=False)
    app.run(debug=True)