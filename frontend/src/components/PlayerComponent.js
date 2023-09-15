
import React, { useRef } from 'react';
import '../Assests/style.css'

function PlayerComponent() {
  
   return (
    <>
      <div>
       
        <video width="3000" height="300" controls autoPlay  loop id='back'>
  <source src="./video.mp4" type="video/mp4"/>
 
  Your browser does not support the video tag.
     </video>
        </div>
        </>
   )
};


export default PlayerComponent;