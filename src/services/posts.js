import axios from "axios";

const baseUrl = "/api/posts";

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

const readAll = async () => {
  const res = await axios.get(baseUrl, config);
  return res.data;
};

const create = async (post) => {
  const res = await axios.post(baseUrl, post, config);
  return res.data;
};

const update = async (post) => {
  const res = await axios.put(`${baseUrl}/${post.id}`, post, config);
  return res.data;
};

const remove = async (post) => {
  const res = await axios.delete(`${baseUrl}/${post.id}`, config);
  return res.data;
};

const postService = {
  readAll,
  create,
  update,
  remove,
  setAuthorizationHeader,
};

export default postService;
