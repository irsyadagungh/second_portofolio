import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface SplitTextProps {
  text: string;
  type?: "char" | "word";
  initialX?: number;
  animateX?: number;
  initialOpacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  className?: string;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  type = "char",
  initialX = 50,
  animateX = 0,
  initialOpacity = 0,
  duration = 1,
  stagger = 0.03,
  delay = 0,
  className = "",
}) => {
  const elementsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    gsap.set(elementsRef.current, {
      opacity: initialOpacity,
      x: initialX,
    });

    gsap.to(elementsRef.current, {
      opacity: 1,
      x: animateX,
      duration,
      stagger,
      ease: "power4.out",
      delay,
    });
  }, [
    duration,
    stagger,
    initialX,
    animateX,
    initialOpacity,
    delay,
  ]);

  const splitArray =
    type === "word" ? text.split(" ") : text.split("");

  return (
    <span className={className}>
      {splitArray.map((part, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) elementsRef.current[i] = el;
          }}
          style={{
            display: "inline-block",
            marginRight: type === "word" ? "0.25em" : undefined,
          }}
        >
          {part}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
