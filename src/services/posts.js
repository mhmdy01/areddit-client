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

const comment = async (postId, comment) => {
  const res = await axios.post(
    `${baseUrl}/${postId}/comments`,
    comment,
    config
  );
  return res.data;
};

const react = async (postId, reactions) => {
  const res = await axios.put(
    `${baseUrl}/${postId}/reactions`,
    reactions,
    config
  );
  return res.data;
};

const postService = {
  readAll,
  create,
  update,
  remove,
  comment,
  react,
  setAuthorizationHeader,
};

export default postService;
