import allAction from "../Actions/actionTypes";
import { postUrl } from "../../Utils";

const initState = {};

const postFetchReducer = (state = initState, { type, payload }) => {
  console.log("payload", payload);
  switch (type) {
    case allAction.postFetchData: {
      //   console.log("prints", payload);
      fetch(postUrl, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-type": "application/json",
        },
      })
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
