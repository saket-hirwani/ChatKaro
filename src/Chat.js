import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachmentIcon from '@material-ui/icons/Attachment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from './firebase';
import firebase from 'firebase';
import { useStateValue } from "./StateProvider";
function Chat() {
    const [input, setInput] = useState("");
    const { nameId } = useParams();
    const [chatName, setchatName] = useState("");
    const [messages, setmessages] = useState([])
    const [{user}] = useStateValue();
    useEffect(() => {
        if(nameId){
            db.collection('names').doc(nameId).onSnapshot(snapshot=>(
                setchatName(snapshot.data().name)
            ));
                db.collection('names').doc(nameId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot=>(
                    setmessages(snapshot.docs.map(doc=> doc.data()))
                ))
        }
        // return () => {
        //     cleanup
        // }
    }, [nameId])
    const sendMessage =(e) =>{
        e.preventDefault();
        db.collection('names').doc(nameId).collection('messages').add(
            {
                message:input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            }
        )
        setInput("")
    }
    return (
        <div className="chat">
            <div className="chat_header">
            <Avatar/>
            <div className="chat_header_info">
            <h3>{chatName}</h3>
            <p>last seen{" "}
                {new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                ).toUTCString()}
            </p>
            </div>
            <div className="chat_header_right">
            <IconButton> <SearchOutlinedIcon/></IconButton>
            <IconButton> <AttachmentIcon/></IconButton>
            <IconButton> <MoreVertIcon/></IconButton>
            </div>
            </div>
            <div className="chat_body">

            {messages.map(message=>(
                <p className={`chat_message ${message.name=== user.displayName && "chat_reciever"}`}>
                 <span className="chat_name">{message.name}</span>
                 {message.message}
                 <span className="chat_timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span></p>
            ))}
            

        
            </div>
            <div className="chat_footer">
            <IconButton> <EmojiEmotionsIcon/></IconButton>
                
                <form action="">
                <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder="type a message"/>
                <button onClick={sendMessage} type="submit">send</button>
                </form>
                <IconButton>  <MicIcon/></IconButton>
               
                </div>
            
        </div>
    )
}

export default Chat
