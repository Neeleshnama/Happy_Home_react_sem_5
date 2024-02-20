import { animate } from "framer-motion";
import {useEffect,useRef} from "react";
import RevealOnScroll from "../RevealOnScroll/RevealOnScroll"
function abbreviateNumber(value) {
  const suffixes = ["", "K", "M", "B", "T"];
  let magnitude = 0;
  while (value >= 1000) {
    value /= 1000;
    magnitude++;
  }
  if (suffixes[magnitude] === "") return value.toFixed(0);
  return value.toFixed(1) + suffixes[magnitude];
}

const Counter=({ to })=>{
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(0, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = abbreviateNumber(value);
      },
    });

    return () => {
        <RevealOnScroll>
          controls.stop()
        </RevealOnScroll>
       
    };
  }, [to]);

  return <RevealOnScroll> <h2 className="text-black font-bold text-5xl" style={{backgroundColor: "rgb(239 246 255)"}} ref={nodeRef} /></RevealOnScroll>;
}

export default Counter;