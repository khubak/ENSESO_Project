import axios from "axios";
import { initialFieldValues } from "./defaultValues";

export const baseURL = "http://127.0.0.1:5000",
  getAllURL = "/eolist",
  postURL = "/eo",
  updateURL = "/eo/",
  deleteURL = "/eo/",
  getOneURL = "/eo/",
  loginURL = "/login";

export const identifierKey = "EO_ID";

export const request = (
  method,
  baseURL,
  requestURL,
  id,
  data,
  params,
  requestHeader,
  stateData,
  setState,
  editStateFunction,
  secondaryStateData,
  secondarySetData
) => {
  const URL = id ? baseURL + requestURL + id : baseURL + requestURL;

  axios({
    method,
    url: URL,
    data: method === "post" || method == "put" ? data : null,
    params: method === "get" || method === "delete" ? params : null,
    headers: requestHeader,
  })
    .then((response) => {
      editStateFunction(
        setState,
        response.data,
        stateData,
        identifierKey,
        id,
        secondaryStateData,
        secondarySetData
      );
      // console.log(stateData);
    })
    .catch((error) => {
      console.error("There was an error making the request:", error);
    });
};

export const login = (stateData, setState, data, errorData, setErrorData) => {
  request(
    "post",
    baseURL,
    loginURL,
    null,
    data,
    null,
    requestHeader,
    stateData,
    setState,
    loginRequestFunction,
    errorData,
    setErrorData
  );
};

export const getAll = (stateData, setState) => {
  request(
    "get",
    baseURL,
    getAllURL,
    null,
    null,
    getAllParams,
    requestHeader,
    stateData,
    setState,
    getAllRequestFunction
  );
};

export const post = (stateData, setState) => {
  request(
    "post",
    baseURL,
    postURL,
    null,
    stateData,
    null,
    requestHeader,
    stateData,
    setState,
    postRequestFunction
  );
};

export const put = (id, data, stateData, setState) => {
  request(
    "put",
    baseURL,
    updateURL,
    id,
    data,
    null,
    requestHeader,
    stateData,
    setState,
    putRequestFunction
  );
};

export const del = (id, params, stateData, setState) => {
  request(
    "delete",
    baseURL,
    deleteURL,
    id,
    null,
    params,
    requestHeader,
    stateData,
    setState,
    delRequestFunction
  );
};

export const getOne = (id, params, stateData, setState) => {
  request(
    "get",
    baseURL,
    getOneURL,
    id,
    null,
    params,
    requestHeader,
    stateData,
    setState,
    getOneRequestFunction
  );
};

export const requestHeader = {
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export const getAllParams = {
  users_id: 2016,
  api_log: "test react call",
};

export const getAllRequestFunction = (setState, responseData) => {
  setState(responseData);
};

export const delRequestFunction = (
  setState,
  responseData,
  stateData,
  identifierKey,
  id
) => {
  console.log("in del func:");
  console.log(id);
  setState(stateData.filter((element) => element[identifierKey] !== id));
};

export const getOneRequestFunction = (setState, responseData) => {
  setState(responseData[0]);
};

export const createDeleteParams = (
  EO_ID,
  EO_CODE,
  Reg_3RD,
  Reg_EOID,
  Extensibility
) => {
  const deleteParams = {
    EO_ID: EO_ID,
    EO_CODE: EO_CODE,
    Reg_3RD: Reg_3RD,
    Reg_EOID: Reg_EOID,
    Extensibility: Extensibility,
    users_id: 2016,
    api_log: "test react del",
  };

  return deleteParams;
};

export const createGetOneParams = (EO_ID) => {
  const getOneParams = {
    EO_ID: EO_ID,
    users_id: 2016,
    api_log: "test react getOne",
  };

  return getOneParams;
};

export const postRequestFunction = (setState) => {
  setState(initialFieldValues);
};

export const putRequestFunction = (
  setState,
  responseData,
  stateData,
  identifierKey,
  id
) => {
  //setState(initialFieldValues)
};

export const loginRequestFunction = (
  setState,
  responseData,
  stateData,
  identifierKey,
  id,
  errorStateData,
  setErrorData
) => {
  if (responseData[0]["errorCode"] != 0) {
    setState(responseData[0]["errorMessage"]);
    setErrorData(true)
  } else {
    setState(responseData[0]["status"]);
    setErrorData(false)
  }
};

export const createLoginRequestBody = (
  username,
  password,
  language_id,
  api_log
) => {
  const loginRequestBody = {
    username: username,
    password: password,
    language_id: language_id,
    api_log: api_log,
  };

  return loginRequestBody;
};
