import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UploadImageButton = () => {
  return (
    <div
      className="col-auto p-0 m-0"
      style={{
        display: "inline",
        marginLeft: "auto",
        marginRight: "0",
        fontSize: "10pt",
      }}
    >
      <input
        type="file"
        className="m-0 text-light"
        style={{ backgroundColor: "rgba(0,0,0,.2)" }}
      />
    </div>
  );
};

export default UploadImageButton;
