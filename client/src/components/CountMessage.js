import {useSelector} from "react-redux";

const CountMessage = () => {
    const {messages} = useSelector((state) => state.messages);
    const {user} = useSelector((state) => state.auth);

    const unreadMessages = messages.filter((message) => {
        if(message.messageSenderID === user.id){
            return message.messageReceiverID === user.id && message.isViewed === false
        } else if(message.messageReceiverID === user.id ) {
            return message.messageSenderID === user.id && message.isViewed === false
        }
        return false;
    }).length;
};

export default CountMessage;