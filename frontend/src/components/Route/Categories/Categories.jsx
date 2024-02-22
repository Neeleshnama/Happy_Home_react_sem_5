import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData} from "../../../static/data";
import styles from "../../../styles/styles";
import  "../../../styles/style_hover.css";



const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${styles.section} hidden sm:block bg-bg-blue-900`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-blue-100 p-9 rounded-md `} // addilng reveal and active 
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={` bg-blue-200 rounded-md mb-12`}
        id="categories"
      >
     <div className='text-[27px] text-center pt-8 bg-blue-100 md:text-start text-white pb-[20px] justify-center items-center justify-between'>
          <h1 style={{
           color:"black",
           padding: "12px 19px",
           
          }}>Our Services</h1>
          <h1 className=" text-5xl px-4 pb-4 text-blue-900" 
           >Quality Services for Quality Homes</h1>
        </div>
        <div className=" pl-14 grid grid-cols-1 bg-blue-100 gap-[5px] md:grid-cols-2 md:gap-[10px] lg:grid-cols-2 lg:gap-[20px] xl:grid-cols-4  justify-center items-center justify-between ">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
  //               <div
  //                 className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden"
  //                 key={i.id}
  //                 onClick={() => handleSubmit(i)}
  //               >
  //                  <h2 style={{  color:"white", margin: "15px" , fontSize:"1.75rem"}} >{i.title}</h2>
  //                 {/* <h5 className={`text-[18px] leading-[1.3]`}>
  //                  <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-grey-500 relative inline-block">
  //   <span class="relative text-white"> {i.title}</span>
  // </span>
  //                   </h5> */}
  //                 <img
  //                   src={i.image_Url}
  //                   className="w-[120px] object-cover hover_categories"
  //                   alt=""
  //                 />
  //     <button style={{ marginTop:"10px",padding: "10px 20px", backgroundColor: "white", color: "black", borderRadius: "4px", border: "none", cursor: "pointer" }}>
  //       See More
  //     </button>
  //               </div>
  <div style={{ backgroundColor:"white",width: "300px", height:"330px",
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2) 0 6px 20px 0 rgba(0, 0, 0, 0.19)", padding: "25px", borderRadius: "10px", marginBottom:"40px" }}>
    <div style={{ display: "flex",
    flexDirection:"column", alignItems: "left" }}>
    <img src={i.image_Url}
     style={{
      height: "50px",
      width: "50px",
      borderRadius: "50%",
      marginRight: "16px",
     }} />
     
      <h2 className=" h-16 " style={{ margin: "15px" , fontSize:"1.75rem"}} >{i.title}</h2>
    </div>
    <p className=" h-16 " style={{ marginTop: "-2px", marginBottom: "16px" }}>
      
    </p>
    <button className="h-12"style={{ marginTop:"10px",padding: "10px 20px", backgroundColor: "rgb(30 58 138)", color: "white", borderRadius: "4px", border: "none", cursor: "pointer" }}
    onClick={() => handleSubmit(i)}>
      Visit
    </button>
  </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
