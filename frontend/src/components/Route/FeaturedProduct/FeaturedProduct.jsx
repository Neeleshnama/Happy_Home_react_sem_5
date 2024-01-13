import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";
import {productData} from "../../../static/data";
import HomeCard from "../../HomeCard/HomeCard";



const FeaturedProduct = () => {
const {allProducts} = useSelector((state) => state.products);
//const {allProducts} =useSelector((productData));


   
  return (
    <div>
      <div className={`${styles.section}`} style={{
        marginTop:"-120px"
      }}>
        <div className={`${styles.heading} text-white`}>
          <h1>Our Services</h1>
        </div>
     
     
      </div>
    </div>
  );

 
};

export default FeaturedProduct;
