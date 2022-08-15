import allAction from "./actionTypes";

export const postFetch = (data) => {
  return {
    type: allAction.postFetchData,
    payload: data,
  };
};
