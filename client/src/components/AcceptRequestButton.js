import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriend, reset } from "./features/acceptFriend/acceptFriendSlice";
import { getConnectionList } from "./features/getConnectionRequest/getConnectionRequestSlice";

const AcceptRequestButton = (props) => {
  const [fId, setFId] = useState("");
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.acceptFrnds);

  useEffect(() => {
    if (isSuccess) {
      dispatch(getConnectionList());
      return () => {
        dispatch(reset());
      };
    }
  }, [dispatch, isSuccess]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(acceptFriend({ fId }));
    return () => {
      dispatch(reset());
    };
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <button
          className="border-0 p-0"
          onClick={(e) => setFId(props.senderid)}
        >
          {isLoading ? (
            <div className="spinnerDimension spinner-border text-primary"></div>
          ) : (
            <>{props.icon}</>
          )}
        </button>
      </form>
    </>
  );
};

export default AcceptRequestButton;
