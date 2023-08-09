import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { acceptFriend, reset } from "./features/acceptFriend/acceptFriendSlice";
import { getConnectionList } from "./features/getConnectionRequest/getConnectionRequestSlice";
import { friends } from "./features/friend/friendSlice";
import Spinner from "./Spinner";
import { useState, useEffect } from "react";

const MorePendingRequests = ({ requests }) => {
  const [fId, setFId] = useState("");
  const dispatch = useDispatch();
  const { isSuccess, isLoading } = useSelector((state) => state.acceptFrnds);
  const { connLists } = useSelector((state) => state.connLists);

  useEffect(() => {
    if (isSuccess) {
      dispatch(friends());
      dispatch(getConnectionList());
      dispatch(reset());
    }
  }, [dispatch, isSuccess]);

  const onSubmit = () => {
    // e.preventDefault();
    dispatch(acceptFriend({ fId }));
  };
  return (
    <div className="col-12 shadow-sm m-1 border p-2 bg-light ffourteen text-center">
      {connLists && connLists.length === 0 ? (
        <div
                className="col-12 text-center alignItem"
                // style={{ fontSize: "12pt" }}
              >
                <FontAwesomeIcon icon={faTriangleExclamation} />{" "}
                No pending requests!
              </div>
      ) : (<>
      <div className="text-primary fw-semibold">
        {requests.senderProfile.lastname} {requests.senderProfile.firstname}
      </div>
      <div className="text-dark">
        {requests.senderProfile.experience} Exp |{" "}
        <FontAwesomeIcon icon={faGlobe} /> {requests.senderProfile.countries}
      </div>
      <form onSubmit={onSubmit}>
        <button
          className="btn btn-block btn-sm p-0"
          onClick={(e) => setFId(requests.senderID)}
        >
          {isLoading ? (
            <>
              <Spinner />
            </>
          ) : (
            <>Accept</>
          )}
        </button>
      </form>
      </>) }
      
    
    </div>
  );
};

export default MorePendingRequests;
