import React from "react";

const CheckList = (li_id)=>{
    var active_span = document.getElementById("#checked"+li_id);
    active_span.classList.toggle("active");
  
    var strike = document.getElementById("#strike"+li_id);
    strike.classList.toggle("strike-none");
  
};

const List_Items = (props)=> {

    return (

        <li id={props.id} >
            <div className="content" >
                <span id={`#checked${props.id}`} onClick={()=>{CheckList(props.id);}}><i className="fa fa-check"></i></span>
                <strike id={`#strike${props.id}`} className="strike-none">{props.list_name}</strike>
            </div>
            <span onClick={()=>{props.onSelect(props.id);}} className="delete"><i className="fa fa-trash"></i></span>
        </li>

    );

};

export default List_Items;