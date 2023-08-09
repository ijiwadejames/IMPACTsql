/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendConnectionRequest } from "./features/connection/connectionSlice";
import { getMenteesProfile } from "./features/menteesProfile/menteesProfileSlice";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { friendsBtn } from "./features/createConnDisconnBtns/friendSlice";

const ConnectButton = () => {
  const { isSuccess } = useSelector((state) => state.connRequests);
  const { getFriends } = useSelector((state) => state.getFriends);
  const dispatch = useDispatch();
  const { pid } = useParams();
  const hId = pid;

  const onSubmit = () => {
    dispatch(sendConnectionRequest({ hId }));

    // dispatch(reset());
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(getMenteesProfile());
      dispatch(friendsBtn(`${pid}`));
      // toast.success("Request Sent")

      // dispatch(reset());
    }
  }, [pid, isSuccess, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <button
      className="btn-sm bg-success border-0 btn p-1 m-0"
      style={{ fontSize: "6pt" }}
      onClick={onSubmit}
    >
      Connect
    </button>
  );
};

export default ConnectButton;
