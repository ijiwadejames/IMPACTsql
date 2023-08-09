/** @format */
import {
  faArrowAltCircleDown,
  faArrowAltCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getMenteesProfile,
  reset,
} from "./features/menteesProfile/menteesProfileSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import Spinner from "./Spinner";
import MenteesListItem from "./MenteesListItem";
import MentorListItem from "./MentorListItem";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const CategoryHolder = ({ profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  dayjs.extend(relativeTime);

  const { user } = useSelector((state) => state.auth);
  const { mProfiles, isLoading, isError, message } = useSelector(
    (state) => state.mProfiles
  );
  const { profiles } = useSelector((state) => state.profiles);

  const count_Mentees_In_My_Category = mProfiles.reduce((count, mentees) => {
    if (mentees.role === "Mentee" && mentees.category === profile.category) {
      return count + 1;
    }
    return count;
  }, 0);

  const count_Mentors_In_My_Category = mProfiles.reduce((count, mentors) => {
    if (mentors.role === "Mentor" && mentors.category === profile.category) {
      return count + 1;
    }
    return count;
  }, 0);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/");
    } else {
      //fetch Mentees Profiles from Database
      dispatch(getMenteesProfile());
    }

    dispatch(reset());
  }, [dispatch, isLoading, isError]);

  return (
    <>
      <div className="category-header">
        <div className="category-title">{profile.category} Mentees </div>
        <div className="category-icon">
          <FontAwesomeIcon icon={faArrowAltCircleDown} />
        </div>
      </div>

      <div className="text-center mb-0">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {count_Mentees_In_My_Category === 0 ? (
              <div className="errMessage">No suggestions</div>
            ) : (
              <>
                {profiles &&
                  profiles.map((prof) => (
                    <>
                      {prof.countries === "" ||
                      prof.phones === "" ||
                      prof.about === "" ||
                      prof.experience === "" ||
                      prof.category === "" ? (
                        <div className="errMessage">Complete your Profile</div>
                      ) : (
                        <>
                          {mProfiles &&
                            mProfiles.slice(0, 3).map((profile) => (
                              <>
                                {profile.category === prof.category && (
                                  <>
                                    <MenteesListItem
                                      key={profile.userID}
                                      profile={profile}
                                      userCategory={prof.category}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                        </>
                      )}
                    </>
                  ))}
              </>
            )}
          </>
        )}
      </div>

      {profile.role === "Mentee" && (
        <>
          <div className="category-header mt-2">
            <div className="category-title">{profile.category} Mentors </div>
            <span className="category-icon ms-1">
              <FontAwesomeIcon icon={faArrowAltCircleDown} />
            </span>
          </div>
          <div className="text-center mb-0">
            {count_Mentors_In_My_Category === 0 ? (
              <div className="errMessage">No suggestions</div>
            ) : (
              <>
                {profiles &&
                  profiles.map((prof) => (
                    <>
                      {prof.countries === "" ||
                      prof.phones === "" ||
                      prof.about === "" ||
                      prof.experience === "" ||
                      prof.category === "" ? (
                        <div className="errMessage">Complete your Profile</div>
                      ) : (
                        <>
                          {mProfiles &&
                            mProfiles.slice(0, 3).map((profile) => (
                              <>
                                {profile.category === prof.category && (
                                  <>
                                    <MentorListItem
                                      key={profile.id}
                                      profile={profile}
                                      userCategory={prof.category}
                                    />
                                  </>
                                )}
                              </>
                            ))}
                        </>
                      )}
                    </>
                  ))}
              </>
            )}
          </div>
        </>
      )}
      <div
        className="col-12 mt-3 text-primary text-center"
        style={{ fontSize: "9pt" }}
      >
        <FontAwesomeIcon icon={faArrowAltCircleRight} />
        Become an iMentor <br />
        <strong>
          IMPACTVerse - &copy;{" "}
          {dayjs().format("YYYY") === "2023" ? (
            <>{dayjs().format("YYYY")}</>
          ) : (
            <>{"2023" + "-" + dayjs().format("YYYY")}</>
          )}
        </strong>
      </div>
    </>
  );
};

export default CategoryHolder;
