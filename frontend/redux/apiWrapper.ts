import api from "./api";

export const post = async (
  url: string,
  payload?: any,
  baseURL?: string,
  returnResponse?: boolean | undefined,
  contentType?: string
) => {
  try {
    const response = await api(baseURL, contentType).post(url, payload);
    return response;
  } catch (err) {
    throw err;  
  }
};
