import mysql.connector
from mysql.connector import Error
from flask import Flask, request, jsonify

# MySQL configuration
MYSQL_HOST = '' #DB IP
MYSQL_PORT = "" #DB PORT
MYSQL_USER = '' #DB USER
MYSQL_PASSWORD = '' #DB Password
MYSQL_DB = '' #DB Name


def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=MYSQL_HOST,
            port=MYSQL_PORT,
            user=MYSQL_USER,
            password=MYSQL_PASSWORD,
            database=MYSQL_DB
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Error connecting to MySQL database: {e}")
        return None


def execute_stored_procedure(proc_name, params):
    conn = get_db_connection()
    if not conn:
        return jsonify({"error": "Database connection failed"}), 500

    cursor = conn.cursor()

    try:
        cursor.callproc(proc_name, params)
        results = []
        for result in cursor.stored_results():
            results.append(result.fetchall())
        conn.commit()
        return results
    except Error as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        conn.close()


def map_response(unnamed_data, field_names):
    mapped_results = []

    for result in unnamed_data[0]:
        entry_dict = {field: result[index]
                      for index, field in enumerate(field_names)}
        mapped_results.append(entry_dict)

    return mapped_results
