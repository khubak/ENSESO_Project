import calculateAws4Signature from "./awssig4";
import Cookies from "js-cookie";

const requestHeaders = (method) => {
  const requestHeader = {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
    Authorization: "",
    "x-amz-date": "",
  };

  const signedHeaders = getAuthorizationHeader(method);
  requestHeader.Authorization = signedHeaders["Authorization"];
  requestHeader["x-amz-date"] = signedHeaders["x-amz-date"];

  return requestHeader;
};

const getAuthorizationHeader = (method) => {
  const cookie = JSON.parse(Cookies.get("ENSESO"));

  const authHeader = calculateAws4Signature(
    cookie.apiKey,
    cookie.apiSecret,
    method
  );

  return authHeader;
};

export default requestHeaders;
