import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Menu from "../components/Menu";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import { singlePost } from "../components/features/singlePost/singlePostSlice";
import { countNotification } from "../components/features/countNotify/countNotifySlice";
import { getNotification } from "../components/features/getNotify/getNotifySlice";
import { getMessage } from "../components/features/message/messageSlice";
import {
  faComment,
  faHeart,
  faChartSimple,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SinglePostsItem from "../components/SinglePostsItem";
import Spinner from "../components/Spinner";

const Conversation = () => {
    const {pstId} = useParams();
    const dispatch = useDispatch();
    const {singlePosts, isLoading} = useSelector((state) => state.singlePosts);

    useEffect(() => {
        dispatch(singlePost(`${pstId}`));   
        dispatch(getNotification());
        dispatch(countNotification());
        dispatch(getMessage());     
    }, [pstId, dispatch]);

    if(isLoading) {
      return <Spinner />
    }
    return (
    <div className="container-fluid m-0 p-0">
      <div className="col-12"><Menu /></div>
        <div className="body-content">
          <div className="left-bar">
            <LeftBar />
          </div>
          <div className="middle-bar col-5 mt-3">
            <div className="col-12 bg-dark text-light p-1 fw-semibold">
                Discussion Board                 
            </div>
            <>{singlePosts && singlePosts.map((post) => (             
                                <SinglePostsItem
                                  key={post.id}
                                  post={post}
                                  image={post.Image?.avatar}
                                  profile={post.Profile}
                                />
            ))}</>
      
          </div>
          <div className="right-bar">
            <RightBar />
          </div>
        </div>
    </div>
        );
};

export default Conversation;