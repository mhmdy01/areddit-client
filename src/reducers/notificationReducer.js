const notificationReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_NOTIFICATION":
      return state.concat(action.payload);
    case "CLEAR_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.payload);
    default:
      return state;
  }
};
export default notificationReducer;

const clearNotification = (notificationId) => {
  return {
    type: "CLEAR_NOTIFICATION",
    payload: notificationId,
  };
};
const createNotification = (notification) => {
  return {
    type: "CREATE_NOTIFICATION",
    payload: notification,
  };
};

export const setNotification = (notification, delay = 3) => {
  return (dispatch) => {
    const id = setTimeout(() => {
      dispatch(clearNotification(id));
    }, delay * 1000);

    dispatch(createNotification({ ...notification, id }));
  };
};
