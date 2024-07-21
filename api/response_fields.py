user_get_secret_response_fields = [
    "status",
    "errorCode",
    "errorMessage",
    "api_secret",
    "users_id",
    "is_api",
    "language_id",
    "timestamp"
]

login_response_fields = [
    "status",
    "errorCode",
    "errorMessage",
    "api_key",
    "api_secret",
    "timestamp"
]

create_eo_response_fields = [
    "EO_ID",
    "EO_CODE",
    "timestamp",
    "status",
    "errorCode",
    "errorMessage"
]

get_eolist_response_fields = [
    "EO_ID",
    "EO_CODE",
    "EO_Name1",
    "EO_Name2",
    "EO_Address",
    "EO_Address_Name",
    "EO_Address_StreetOne",
    "EO_Address_StreetTwo",
    "EO_Address_City",
    "EO_Address_PostCode",
    "EO_CountryReg",
    "EO_Email",
    "EO_Phone",
    "EO_A_Info",
    "VAT_R",
    "VAT_N",
    "TAX_N",
    "EO_ExciseNumber1",
    "EO_ExciseNumber2",
    "OtherEOID_R",
    "OtherEOID_N_list",
    "Reg_3RD",
    "Reg_EOID",
    "EO_OtherID",
    "Extensibility",
    "EO_Type",
    "Active",
    "used",
    "created_ts",
    "created_users_id",
    "last_altered_ts",
    "last_users_id"
]

get_one_eo_response_fields = [
    "EO_ID",
    "EO_CODE",
    "EO_Name1",
    "EO_Name2",
    "EO_Address",
    "EO_Address_Name",
    "EO_Address_StreetOne",
    "EO_Address_StreetTwo",
    "EO_Address_City",
    "EO_Address_PostCode",
    "EO_CountryReg",
    "EO_Email",
    "EO_Phone",
    "EO_A_Info",
    "VAT_R",
    "VAT_N",
    "TAX_N",
    "EO_ExciseNumber1",
    "EO_ExciseNumber2",
    "OtherEOID_R",
    "OtherEOID_N_list",
    "Reg_3RD",
    "Reg_EOID",
    "EO_OtherID",
    "Extensibility",
    "EO_Type",
    "External",
    "Active",
    "used",
    "created_ts",
    "created_users_id",
    "last_altered_ts",
    "last_users_id"
]

delete_eo_response_fields = [
    "EO_ID",
    "timestamp",
    "status",
    "errorCode",
    "errorMessage"
]

update_eo_response_fields = [
    "EO_ID",
    "timestamp",
    "status",
    "errorCode",
    "errorMessage"
]
