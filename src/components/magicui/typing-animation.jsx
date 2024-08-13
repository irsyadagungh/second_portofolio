import React from "react";
import Typed from "typed.js";

function TypedJs({ string, classname }) {
  // Create reference to store the DOM element containing the animation
  const el = React.useRef(null);

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