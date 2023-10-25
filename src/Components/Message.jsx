import './Message.css';
const Message = ({text, uri, user = 'other'}) => {
  return (
    <>
    <div className="message-box">
    

    <div className={`message ${user === 'me' ? 'flex-end-msg' : 'flex-start-msg'}`}>
     {
      user === "other" && <div className="profile-img">
      <img src={uri} alt="" />
    </div>
     }
      <div className="message-text">{text}</div>
      {
      user === "me" && <div className="profile-img">
      <img src={uri} alt="" />
    </div>
     }


      
     </div>
      
     

    </div>
    </>
  )
}

export default Message