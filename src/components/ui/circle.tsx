import React, { forwardRef } from "react";

type CircleProps = {
  className?: string;
  children: React.ReactNode;
};

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ className, children }: CircleProps, ref) => {
  return (
    <div
      ref={ref}
      className={`
        z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        ${className}
      `}
    >
      {children}
    </div>
  );
});
Circle.displayName = "Circle";



export default Circle;
