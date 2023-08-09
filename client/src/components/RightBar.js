/** @format */
import { useSelector } from "react-redux";
import CategoryHolder from "./CategoryHolder";

const RightBar = () => {
  const { profiles } = useSelector((state) => state.profiles);
  
  return (

    <div className="col-12 p-3 pb-0 m-0">
      {profiles &&
        profiles.map((profile) => (
          <>
            <CategoryHolder key={profile.id} profile={profile} />
          </>
        ))}
    </div>
  
  );
};

export default RightBar;
