import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import stylesModule from "./styles.module.css"

const Hero = () => {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh]  ${stylesModule["container-main"]}`}
        >
            <img 
             
                src="https://img.freepik.com/free-photo/green-sofa-white-living-room-with-free-space_43614-834.jpg?size=626&ext=jpg&ga=GA1.1.1412446893.1705017600&semt=ais" 
                style={{
                    filter: "blur(12px)",
            
                        height:"700px",
                        width: "1600px",
                        overflow:" hidden",


                }}
               
               

            />
            <div className={`${stylesModule.centered}`}>
                <div style={{
                    justifyContent: "center",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <h2 className={`text-[35px] leading-[1.2] 800px:text-[50px] text-white font-[600] `}>
                        Making your home life easier<br/> with HAPPY HOME,<br/>
                        We bring our service to your door step.
                       
                    </h2>
                   
                
                    <Link to="/products" className="inline-block">
                        <div className={`${styles.button} mt-5`}>
                            <span className="text-[#fff] font-[Poppins] text-[18px]">
                                Book Now
                            </span>
                        </div>
                    </Link>
                </div>
            <div>
                <img src="https://kitpro.site/hocare/wp-content/uploads/sites/92/2022/06/young-successful-plumber-in-workwear-standing-in-b-2021-09-24-03-09-38-utc2.png" style={{
                    height: "100%"
                }} />
            </div>
            </div>
        </div>
    );
};

export default Hero;
