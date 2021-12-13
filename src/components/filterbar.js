import React from "react";
import categories from "../configs/tags.json";


const tagChanged = (e, tags, setTags) => {
    if (e.target.checked) {
        setTags(Array(...tags, e.target.value))
    } else {
        setTags(tags.filter(tag => tag != e.target.value))
    }
}  

const FilterCategory = (props) => {
    console.log(props.category.name);
    return (
        <div>
            <h3>{props.category.name}</h3>
            {props.category.options.map(tag => {
                return (
                    <div>
                        <input type="Checkbox" Value={tag} onChange={(e) => tagChanged(e, props.tags, props.setTags)}/>
                        <label for={tag}>{tag}</label>
                    </div>
                )
            })}
        </div>
    )
}

const FilterBar = (props) => {
    return (
        <div>
            {categories.map(category => <FilterCategory category={category} tags={props.tags} setTags={props.setTags}/>)} 
        </div>  
    )
}

export default FilterBar;