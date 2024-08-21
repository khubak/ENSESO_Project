import * as URL from "./urls";
import axios from "axios";
import requestHeaders from "./auth";

const getOne = async (id) => {
  const requestURL = URL.baseURL + URL.getOneURL + id;

  try {
    const response = axios({
      method: "get",
      url: requestURL,
      headers: requestHeaders("GET"),
      params: {
        EO_ID: id,
      },
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export default getOne;
