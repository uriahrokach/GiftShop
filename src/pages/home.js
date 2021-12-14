import React, { useState } from "react";
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import logo from '../images/logo.png';
import FilterBar from "../components/filterbar";

import '../styles/home.css'

const queryGifts = (value, tags, db, setGifts) => {
    let gifts = null;
    if (tags.length != 0) {
        gifts = query(
            collection(db, "gifts"),
            where("name", ">=", value), 
            where("name", "<=", `${value}\uf8ff`), 
            where("tags", "array-contains-any", tags),
            orderBy("name")
        )
    } else {
        gifts = query(
            collection(db, "gifts"),
            where("name", ">=", value), 
            where("name", "<=", `${value}\uf8ff`), 
            orderBy("name")
        )
    }
    
    
    onSnapshot(gifts, snapshot => {
        setGifts(snapshot.docs.map(doc => doc.data()));
    });
}

const Gift = (props) => {
    return (
        <div className="gift-card">
            <div className="gift-title">{props.gift.name} <small>(rank {props.gift.rank})</small></div>
            <div>{props.gift.description}</div>
            <br />
            <div><b>System:</b> {props.gift.mechanics}</div>
            <br />
            {props.gift.tags.map(tag => <div className="tag">{tag}</div>)}
        </div>
    )
}

const Home = (props) => {
    const [value, setValue] = useState('');
    const [gifts, setGifts] = useState([])
    const [tags, setTags] = useState([]);
    queryGifts(value, tags, props.db, setGifts)
    return (
        <div className="home">
            <FilterBar tags={tags} setTags={setTags}/>
            <div className="main-body">
                <div className="main-header">
                    <img src={logo} alt="logo" />
                    <input type="text" className="gift-search" placeholder="search for gifts, i.e. resist pain, razor claws... " onChange={(e) => setValue(e.target.value)}/>
                </div>
                {gifts.map(gift => <Gift gift={gift} />)}
            </div>
        </div>
    )
}

export default Home