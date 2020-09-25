import React, { useEffect, useState } from 'react';
import {Avatar} from "@material-ui/core";
import './SidebarChat.css';
import db from './firebase';
import { Link } from 'react-router-dom';
function SidebarChat({id, name, newChat}) {
    
    const [Seed, setSeed] = useState("");
    const [messages, setmessages] = useState("")
useEffect(() => {
    if(id){
        db.collection('names').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot((snapshot)=>
        setmessages(
            snapshot.docs.map((doc)=>doc.data())
        ));
    }
    // return () => {
    //     cleanup
    // }
}, [id])

    useEffect(() => {
       
        setSeed(Math.floor(Math.random()*5000));
        // return () => {
        //     {Seed}
        // }
    }, [])
    const createChat = () =>{
        const chatName = prompt("enter name of chat room");
        if(chatName){
            db.collection('names').add({
                name : chatName
            });
        }
    }
    return !newChat ?(
        <Link to={`/names/${id}`}>
        <div className="SidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${Seed}.svg`}/>
            <div className="SidebarChat_info">
            <h3>{name}</h3>
            <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ):(
          <div onClick={createChat} className="SidebarChat">
          <h3>Add new</h3>
          </div>
    )
}

export default SidebarChat
