import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePicture = (props) => {
  return (
    <>
      {props.role === "Mentee" ? (
        <>
          <div
            style={{ borderRadius: "100%" }}
            className="col-auto notification"
          >
            <img
              src={props.avatar}
              height={props.height}
              width={props.width}
              style={{
                borderTop: "2px solid",
                borderBottom: "2px solid yellow",
                borderRadius: "100%",
              }}
              alt="avatar"
            />
            {/* <div className="badge" style={{ backgroundColor: "none" }}>
              <FontAwesomeIcon icon={faCheckCircle} />
            </div> */}
          </div>
        </>
      ) : (
        <>
          <div style={{ borderRadius: "100%" }} className="col-auto">
            <img
              src={props.avatar}
              height={props.height}
              width={props.width}
              style={{
                borderTop: "2px solid",
                borderBottom: "2px solid yellow",
                borderRadius: "100%",
              }}
              alt="avatar"
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePicture;
