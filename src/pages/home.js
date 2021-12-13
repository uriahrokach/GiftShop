import React from "react"
import { useState } from "react";
import { onSnapshot, collection, query, where, orderBy } from "firebase/firestore";

/**
 * 
 * @param {string} value 
 * @param {firebase.firestore.Firestore} db 
 * @returns 
 */
const queryGifts = (value, db, setGifts) => {
    const gifts = query(
        collection(db, "gifts"),
        where("name", ">=", value),
        where("name", "<=", `${value}\uf8ff`), 
        orderBy("name")
    )
    onSnapshot(gifts, snapshot => {
        setGifts(snapshot.docs.map(doc => doc.data( )));
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
    queryGifts(value, props.db, setGifts)
    return (
        <div>
            <input type="text" onChange={(e) => setValue(e.target.value)}/>
            {gifts.map(gift => <Gift gift={gift} />)}
        </div>
    )
}

export default Home