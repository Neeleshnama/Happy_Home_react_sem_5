import React from 'react'
import Header from "../components/Layout/Header";
import Hero from "../components/Route/Hero/Hero";
import Categories from "../components/Route/Categories/Categories";
import BestDeals from "../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../components/Events/Events";
import Sponsored from "../components/Route/Sponsored";
import Footer from "../components/Layout/Footer";
import PlayerComponent from '../components/PlayerComponent'
import { useEffect, useRef, useState } from "react";
import Slide from 'react-reveal/Slide';
import { Fade, Rotate } from 'react-reveal';


const RevealOnScroll = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
      const scrollObserver = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
              setIsVisible(true);
              scrollObserver.unobserve(entry.target);
          }
      });

      scrollObserver.observe(ref.current);

      return () => {
          if (ref.current) {
              scrollObserver.unobserve(ref.current);
          }
      };
  }, []);

  const classes = `transition-opacity duration-2000 
      ${isVisible ? "opacity-100" : "opacity-0"
      }`;

  return (
      <div ref={ref} className={classes}>
          {children}
      </div>
  );
};
const HomePage = () => {
  return (
    <div>
        <Header activeHeading={1} />
        <RevealOnScroll>
        <Rotate>
        <Hero />
        </Rotate>
        </RevealOnScroll>
        <Slide right>
       <RevealOnScroll>
        <Categories />
        </RevealOnScroll>
        </Slide>
        

        <RevealOnScroll>
           <BestDeals />
           </RevealOnScroll>
           <RevealOnScroll>
        <Events />
        </RevealOnScroll>
        <RevealOnScroll>
        <FeaturedProduct />
        </RevealOnScroll>
        <RevealOnScroll>
        <Sponsored />
        </RevealOnScroll>
        <RevealOnScroll>
        <Footer />
        </RevealOnScroll>
    </div>
  )
}

export default HomePage