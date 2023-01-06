import React from 'react'
import { useNavigate, useParams } from "react-router-dom";


const Box = (props) => {
    const navigate = useNavigate();
  const params = useParams();
    function handleViewUnits(e) {
        // console.log("skjfnskf");
        const { verticalId } = params;
        const courseId = e.target.id;
    
        console.log(courseId);
    
        navigate(`/user/verticals/${verticalId}/courses/${courseId}/units/all`);
      }
  return (
    <>
   
    <div className="box col" style={{ width:"100px", position:"relative"}} key={props.course._id}>
           <h2 style={{color:"#735F32"}} ><b> {props.course.name}</b></h2>
           <h5>{props.course.desc}</h5>
           <span>{props.course.unitArr.length} Units </span>
           <br />
           <button
             className="btn btn-primary"
             style={{ margin: "10px" }}
             id={props.course._id}
             onClick={handleViewUnits}
           >
             View units
           </button>
         </div>
    
    
    
    </>
    
  )
}

export default Box