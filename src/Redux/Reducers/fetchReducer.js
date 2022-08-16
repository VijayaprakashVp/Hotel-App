import allAction from "../Actions/actionTypes";
import { postUrl } from "../../Utils";
import axios from "axios";

const initState = {};

const postFetchReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case allAction.postFetchData: {
      axios
        .post(postUrl, payload)
        .then((res) => res.json())
        .catch((err) => console.log(err));
      alert("Yay!, Data Stored");
    }

    default: {
      return state;
    }
  }
};

export default postFetchReducer;
