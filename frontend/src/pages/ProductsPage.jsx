import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import { toast } from "react-toastify";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const {allProducts,isLoading} = useSelector((state) => state.products);
  const {user} = useSelector((state) => state.user);

  const [data, setData] = useState([]);
//console.log(user.city);
  // useEffect(() => {
  //   if (categoryData === null) {
  //     const d = allProducts;

  //     setData(d);

  //   } else {
  //     const d =
  //     allProducts && allProducts.filter((i) => i.category === categoryData);
  //     setData(d);
  //   }
  //   //    window.scrollTo(0,0);
  // }, [allProducts]);


  
useEffect(() => {
  
  // Filter products based on user's city, state, and country
  try{
  if (categoryData === null) {
  const filteredProducts =  allProducts && allProducts.filter((product) => {
    // Check if product has shop information and user has city, state, and country
    if (
      product.shop &&
      product.shop.city &&
      product.shop.state &&
      product.shop.country &&
      user.city &&
      user.state &&
      user.country
    ) {
      return (
        product.shop.city === user.city &&
        product.shop.state === user.state &&
        product.shop.country === user.country
      );
    }
    return false; // Exclude products with missing shop or user information
  });

  // Filter by category if specified
  const filteredByCategory =filteredProducts
    
       
      
  setData(filteredByCategory);}
  else{
     const d =
       allProducts && allProducts.filter((i) => i.category === categoryData);
     setData(d);
  }}
  catch{
    toast.error('login  first to see available services in your area');
  }
  
}, [allProducts,  user]);

  return (
  <>
  {
    isLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={3} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
    )
  }
  </>
  );
};

export default ProductsPage;
