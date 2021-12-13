import React from "react"
import { useState } from "react";
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";
import FilterBar from "../components/filterbar";

const queryGifts = (value, tags, db, setGifts) => {
    let gifts = null
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
        <div>
            <h3>{props.gift.name} <small>(Rank {props.gift.rank})</small></h3>
            <div>{props.gift.description}</div>
            <div><b>{props.gift.mechanics}</b></div>
            <br />
            {props.gift.tags.map(tag => <div>{tag}</div>)}
        </div>
    )
}

const Home = (props) => {
    const [value, setValue] = useState('');
    const [gifts, setGifts] = useState([])
    const [tags, setTags] = useState([]);
    queryGifts(value, tags, props.db, setGifts)
    return (
        <div>
            <div>
                 <FilterBar tags={tags} setTags={setTags}/>
            </div>
            <p>{tags.join(', ')}</p>
            <div>
                <input type="text" onChange={(e) => setValue(e.target.value)}/>
                {gifts.map(gift => <Gift gift={gift} />)}
            </div>
            
        </div>
    )
}

export default Home