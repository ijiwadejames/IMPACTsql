/** @format */

import {
  faCheckDouble,
  faTimes,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { friends, reset } from "./features/friend/friendSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import FriendsListItem from "./FriendsListItem";
import MyMentorList from "./MyMentorList";

const ConnectBox = () => {
  const dispatch = useDispatch();
  dayjs.extend(relativeTime);
  const [searchQuery, setSearchQuery] = useState("");
  const { myFriends, isLoading } = useSelector((state) => state.myFriends);
  const { user } = useSelector((state) => state.auth);
  // const [toggleAlertBox, setToggleAlertBox] = useState(false);

  useEffect(() => {
    //fetch from DB
    dispatch(friends());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredFriends = myFriends.filter((friend) => {
    const fullName = `${friend.firstname} ${friend.lastname}`.toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return (
      fullName.includes(searchQueryLowerCase) ||
      friend.firstname.toLowerCase().includes(searchQueryLowerCase) ||
      friend.lastname.toLowerCase().includes(searchQueryLowerCase)
    );
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="col-12 mt-4">
      <div className="col-md-12 bg-dark text-white border rounded-0 p-3">
        <div className="col-12 fw-bold">
          <h3>Clique</h3>
        </div>
        <div className="col-12 fw-bold">
          Fine a Clique and manage your Clique Box
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="col-12 rounded-4 border-light text-light mt-3 p-1 shadow fw-semibold"
          placeholder="Find your Clique..."
          style={{ backgroundColor: "rgba(0,0,0,0.2)", fontSize: "10pt" }}
        />
      </div>
      <div className="col-12 bg-white shadow border rounded-1 p-3 text-dark">
        {filteredFriends && filteredFriends.length > 0 ? (
          <>
            {filteredFriends &&
              filteredFriends.map((friends) => (
                <>
                  <MyMentorList
                    key={friends.firstname}
                    id={friends.id}
                    lastname={friends.lastname}
                    firstname={friends.firstname}
                    gender={friends.gender}
                    othernames={friends.othernames}
                    role={friends.role}
                    date={friends.createdAt}
                    avatar={friends.Image?.avatar}
                  />

                  <FriendsListItem
                    key={friends.id}
                    id={friends.id}
                    lastname={friends.lastname}
                    firstname={friends.firstname}
                    othernames={friends.othernames}
                    role={friends.role}
                    date={friends.createdAt}
                    avatar={friends.Image?.avatar}
                  />
                </>
              ))}
          </>
        ) : (
          <div className="col-12 text-center alignItem">
            {searchQuery === "" ? (
              <>
                <FontAwesomeIcon icon={faTriangleExclamation} /> No results
                found!
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faTriangleExclamation} /> No results for{" "}
                {searchQuery} was found!
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectBox;
