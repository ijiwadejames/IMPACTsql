/** @format */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeCon, reset } from "./features/removeCon/removeConSlice";
import { friends } from "./features/friend/friendSlice";
import { getMenteesProfile } from "./features/menteesProfile/menteesProfileSlice";
import Spinner from "./Spinner";
import { friendsBtn } from "./features/createConnDisconnBtns/friendSlice";

const DisconnectButtons = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.removeCons);
  const { pid } = useParams();
  const id = pid;

  useEffect(() => {
    if (isSuccess) {
      //fetch from DB
      dispatch(friends());

      dispatch(friendsBtn(`${pid}`));
      dispatch(getMenteesProfile());
    }

    return () => {
      dispatch(reset());
    };
  }, [pid, dispatch, isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <button
      className="btn-sm bg-danger border-0 btn p-1 m-0"
      style={{ fontSize: "6pt" }}
      onClick={() => dispatch(removeCon(id))}
    >
      Diconnect
    </button>
  );
};

export default DisconnectButtons;
