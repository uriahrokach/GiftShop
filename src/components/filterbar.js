import React, { useState } from "react";
import categories from "../configs/tags.json";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CSSTransition } from "react-transition-group"

import '../styles/navbar.css';

const tagChanged = (e, tags, setTags) => {
    if (e.target.checked) {
        setTags(Array(...tags, e.target.value))
    } else {
        setTags(tags.filter(tag => tag != e.target.value))
    }
}  

const FilterCategory = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <CSSTransition in={open} timeout={200} classNames="nav-dropdown">
            <div className="nav-category" open={open}>
                <div className="nav-header" onClick={() => setOpen(!open)}>{props.category.name} <RiArrowDropDownLine className="icon"/></div>
                {open && props.category.options.map(tag => {
                    return (
                        <div className="choice">
                            <input type="Checkbox" Value={tag} onChange={(e) => tagChanged(e, props.tags, props.setTags)} checked={props.tags.includes(tag)}/>
                            <label for={tag}>{tag}</label>
                        </div>
                    )
                })}
            </div>
        </CSSTransition>
    )
}

const FilterBar = (props) => {
    return (
        <div className="nav-bar">
            <h3 className="filter-title">Filters</h3>
            {categories.map(category => <FilterCategory category={category} tags={props.tags} setTags={props.setTags}/>)} 
        </div>  
    )
}

export default FilterBar;