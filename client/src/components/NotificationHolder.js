import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getNotification } from "../components/features/getNotify/getNotifySlice";

const NotificationHolder = () => {
  const { getNotifys } = useSelector((state) => state.getNotifys);
  const { user } = useSelector((state) => state.auth);
  const [isHovering, setIsHovering] = useState(false);
  const {notifys} = useSelector((state) => state.notifys);
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const scrollableClass = isHovering ? "scrollable" : "scrollable hover";

  useEffect(() => {
    dispatch(getNotification());
  }, [dispatch])
  return (
    <div       
      className={scrollableClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}     
    >
      {getNotifys && getNotifys?.some((notification) => notification.notifyGen !== (user && user.id)) ? (
        <div>
          {getNotifys &&
            getNotifys.map((notify) => (
              <>
                {notify.notifyGen !== (user && user.id) && (
                  <div className="notify"
              onClick={() => navigate(`/discussion/${notify.pstId}`)}
              >
                  <span className="text-dark">                   
                     <span className="text-primary"> {notify.NotifyGenerator.lastname} {notify.NotifyGenerator.firstname}</span>{" "}
                      <span>{notify.purpose === "comment" ? <>replied</> : <>liked</>} your post</span>{" "}
                     {dayjs(notify.createdAt).fromNow() === "a few seconds ago" ? (
                        <>Just now</>
                      ) : (
                        <>
                          {dayjs(notify.createdAt).fromNow() === "a minute ago" ? (
                            <>1 minute ago</>
                          ) : (
                            dayjs(notify.createdAt).fromNow()
                          )}
                        </>
                      )}             
                  </span>
                  </div>
                )}
              </>
            ))}
        </ div>
      ) : (
        <>Nothing to show</>
      )}
      {/* {posts &&
        posts?.some((post) => (
          <>
            {post.userID !== (user && user.id) ? (
              <li>
                <Link
                  to={{
                    pathname: `/private/${post.userID}`,
                  }}
                >
                  {post.Profile.lastname} {post.Profile.firstname}{" "}
                  <span className="text-light">started a discussion</span>
                </Link>
              </li>
            ) : (
              <li>No notification</li>
            )}
          </>
        ))} */}
    </div>
  );
};

export default NotificationHolder;
