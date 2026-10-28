import { useEffect, useRef, useState } from "react";

const Reveal = ({ as: Element = "div", className = "", children, ...props }) => {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !("IntersectionObserver" in window)) {
      element?.classList.replace("reveal-pending", "reveal-visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`${className}${visible ? " reveal-visible" : " reveal-pending"}`}
      {...props}
    >
      {children}
    </Element>
  );
};

export default Reveal;
