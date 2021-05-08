import axios from "axios";

const baseUrl = "/api/users";

let authorization = "";
let config = null;
const setAuthorizationHeader = (token) => {
  authorization = `Bearer ${token}`;
  setRequestConfig(authorization);
};
const setRequestConfig = (authorization) => {
  config = {
    headers: {
      Authorization: authorization,
    },
  };
};

const read = async (userId) => {
  const res = await axios.get(`${baseUrl}/${userId}`, config);
  return res.data;
};

const create = async (user) => {
  const res = await axios.post(baseUrl, user);
  return res.data;
};

const userService = {
  read,
  create,
  setAuthorizationHeader,
};

export default userService;
