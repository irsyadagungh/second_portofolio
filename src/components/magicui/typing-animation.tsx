import React from "react";
import Typed from "typed.js";

interface TypedJsProps {
  string: string[];
  classname?: string;
}

function TypedJs({ string, classname } : TypedJsProps) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: string,
      typeSpeed: 50,
      loop: true,
      backSpeed: 50,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <div className="App">
      <span ref={el} className={classname}/>
    </div>
  );
}

export default TypedJs;