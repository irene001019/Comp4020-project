import { Link } from "react-router-dom";

//card-title, card-text, card-icon, card Link
function Card(props){
return(
  
    <div className={props.className} style={props.style} >
      <Link to={props.to} className=" btn card-body">
        <h1 className="card-title">{props.icon}</h1>
        <p className="card-text">{props.text}</p>
      </Link>
    </div>
);
}
export default Card;