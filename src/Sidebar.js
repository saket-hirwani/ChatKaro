import React, { useState,useEffect } from 'react';
import {Avatar, IconButton} from "@material-ui/core";
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import db from './firebase';    
import { useStateValue } from './StateProvider';
function Sidebar() {
    const [chatname, setchatname] = useState([]);
    const [{user}] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection('names').onSnapshot(snapshot=>(
            setchatname(snapshot.docs.map(doc=>(
                {
                    id: doc.id,
                    data: doc.data(),
                }
            )))
    ))
        
        return () => {
            unsubscribe();
        }
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar_header">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar_hrader_right">
            
            <IconButton><ChatIcon/></IconButton>
            <IconButton> <MoreVertIcon/></IconButton>
            </div>
            </div>
            <div className="sidebar_search">
                <SearchOutlinedIcon/>
                <input placeholder="search chats" type="text" />
            </div>
            <div className="sidebar_chat">
            <SidebarChat newChat/>
            {chatname.map(item=>(
                <SidebarChat key = {item.id} id = {item.id} name = {item.data.name}/>
            ))}
            </div>
        </div>
    )
}

export default Sidebar
