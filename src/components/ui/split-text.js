import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const SplitText = ({
  text,
  type = "char",
  initialX = 50,
  animateX = 0,
  initialOpacity = 0,
  duration = 1,
  stagger = 0.03,
  uniqueClassName = "char",
  delay = 0,
}) => {
  const textRef = useRef(null);
  const animationType = type;

  useEffect(() => {
    const text = textRef.current;
    if (text) {
      const words = text.textContent.split(" ");
      text.innerHTML = ""; // Clear existing content

      words.forEach((word, index) => {
        const wordSpan = document.createElement("span");
        wordSpan.className = "word";
        wordSpan.style.display = "inline-block";
        text.appendChild(wordSpan);

        if (animationType === "char") {
          word.split("").forEach((letter) => {
            const letterSpan = document.createElement("span");
            letterSpan.className = uniqueClassName;
            letterSpan.textContent = letter;
            wordSpan.appendChild(letterSpan);
          });
        } else {
          const wordWrapper = document.createElement("span");
          wordWrapper.className = uniqueClassName;
          wordWrapper.textContent = word;
          wordSpan.appendChild(wordWrapper);
        }

        if (index < words.length - 1) {
          const spaceSpan = document.createElement("span");
          spaceSpan.textContent = " ";
          text.appendChild(spaceSpan);
        }
      });

      gsap.set(`.${uniqueClassName}`, { display: "inline-block" });
      gsap.from(`.${uniqueClassName}`, {
        duration: duration,
        x: initialX,
        opacity: initialOpacity,
        stagger: stagger,
        ease: "power4.out",
        delay: delay * 0.5,
      });
    }
  }, [animationType, uniqueClassName]);

  return <span ref={textRef}>{text}</span>;
};

export default SplitText;
