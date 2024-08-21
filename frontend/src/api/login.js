import * as URL from "./urls";
import axios from "axios";

export const login = async (loginRequestBody) => {
  const requstURL = URL.baseURL + URL.loginURL;

  try {
    const response = await axios({
      method: "post",
      url: requstURL,
      headers: getLoginRequestHeaders,
      data: loginRequestBody,
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export const createLoginRequestBody = (username, password, language_id) => ({
  username: username,
  password: password,
  language_id: language_id,
});

export const getLoginRequestHeaders = () => ({
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
});