/** @format */

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import SuggestionsHolder from "../components/SuggestionsHolder";
import Spinner from "../components/Spinner";
import {
  getMenteesProfile,
  reset,
} from "../components/features/menteesProfile/menteesProfileSlice";
import Menu from "../components/Menu";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
import { getMessage } from "../components/features/message/messageSlice";

const Suggestions = () => {
  const { role } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { mProfiles, isLoading } = useSelector((state) => state.mProfiles);
  const dispatch = useDispatch();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProfiles = mProfiles.filter((profile) => {
    const fullName = `${profile.firstname} ${profile.lastname}`.toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return (
      fullName.includes(searchQueryLowerCase) ||
      profile.firstname.toLowerCase().includes(searchQueryLowerCase) ||
      profile.lastname.toLowerCase().includes(searchQueryLowerCase)
    );
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      dispatch(getMenteesProfile());
      dispatch(getNotification());
      dispatch(countNotification());
      dispatch(getMessage());
    }
  }, [user, dispatch]);

  return (
    <>
      <div className="container-fluid m-0 p-0">
        <div className="col-12">
          <Menu />
        </div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>

          <div className="middle-bar col-5 mt-3 p-3">
            <div className="col-12" style={{ fontSize: "15pt" }}>
              {role === "Mentor" ? (
                <>Search Mentors List</>
              ) : (
                <>Search Mentees List</>
              )}
            </div>
            <div className="col-12">
              <input
                type="search"
                className="col-12 p-1 rounded-2 mb-2"
                placeholder="Search..."
                style={{ fontSize: "12pt" }}
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
            </div>
            {isLoading ? (
              <>
                <Spinner />
              </>
            ) : (
              <>
                {filteredProfiles && filteredProfiles.length > 0 ? (
                  <>
                    {filteredProfiles &&
                      filteredProfiles.map((profile) => (
                        <SuggestionsHolder
                          key={profile.id}
                          role={role}
                          profile={profile}
                        />
                      ))}
                  </>
                ) : (
                  <div className="alignItem">No result found</div>
                )}
              </>
            )}
          </div>

          <div className="right-bar">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestions;
