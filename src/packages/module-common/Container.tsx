import React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "", ...props }: ContainerProps) {
  return (
    <div
      className={`w-full max-w-[1290px] mx-auto px-(--gutter) desk:px-0 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Container;
