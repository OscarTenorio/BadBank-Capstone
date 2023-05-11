import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';


function Card(props) {

  function cardClasses(){
    const txt = props.txtcolor ? ' text-' + props.txtcolor : ' text-white';
    const bgcolor = props.bgcolor ? ' bg-' + props.bgcolor : ' ';
    const margin = props.margin ? ' ' + props.margin : ' my-5 mx-auto';
    const extra = props.extra ? ' ' + props.extra : '';
    return 'card' + margin + bgcolor + txt + extra;
  }

  function headerClasses(){
    const headerclasses = props.headerclasses ? ' ' + props.headerclasses : '';
    const headerbgcolor = props.headerbgcolor ? ' ' + props.headerbgcolor : '';
    const headercolor = props.headercolor ? ' ' + props.headercolor : '';
    return 'card-header text-center' + headerclasses + headerbgcolor + headercolor
  }

  const width = props.width ? ' ' + props.width : ' 18rem';
  const maxheight = props.maxheight ? ' ' + props.maxheight : ' 25rem';


  return(
    <div className={cardClasses()} style={{width:width, maxHeight:maxheight}}>
      <div className={headerClasses()}>{props.header}</div>
      <div className="card-body">
        {props.title && (<h5 className="card-title text-center">{props.title}</h5>)}
        {props.text}
        {props.status && (<div className="primary text-info font-weight-bold my-2" id="createStatus">{props.status}</div>)}
        {props.body}
      </div>
    </div>
  );
};

export default Card;