import {
  FC,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface RevealOnScrollComponent {
  elemRef: RefObject<HTMLElement>;
  options?: ObserverOptions;
  target?: "elem" | "children";
  newClasses: string;
  oldClasses?: string;
  children: ReactNode;
}

interface ObserverOptions {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

// this defaultOptions object has the same values as the default config
// of the IntersectoinObserver API so it's not really needed and is only
// mentioned here to explain what each property does
const defaultOptions: ObserverOptions = {
  root: null,
  // the root being null means the view-port is considered as the root
  // which is also the default value of the observer
  // use a DOM selector method or a React-Ref to change the root
  rootMargin: "0px 0px 0px 0px",
  // This set of values serves to grow or shrink each side of the
  // root element's bounding box before computing the intersections.
  // values can be in either pixels or percentages
  // the default is all zeros
  // it can have any number of values from 0 to 4
  // "0px 0px 0px 0px" ==> top - right - bottom - left (like css margin)
  threshold: 0,
  // the threshold is a number from 0.0 to 1.0 (including both)
  // which indicates that how much of the entry should be
  // visible within the root for the callback to be invoked
  // for example threshold: 1.0 means that when 100% of the
  // target is visible within the element specified by the
  // root option the callback is invoked
};
// read https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API for more info

const RevealOnScroll: FC<RevealOnScrollComponent> = ({
  elemRef,
  // a React-Ref to the element that we want to observe either itself of its children
  options,
  // IntersectionObserver API Options
  target = "children",
  // defaulted to be equal to children if not specified
  // if set to 'elem' defines that we want
  // to observe the element itself and not its children
  // otherwise its children are observed
  newClasses,
  // the new classes that are to be added on intersecting
  // can be tailwind - bootstrap or even HTML classe
  oldClasses,
  // the old classes that are to be replaced with the new ones - if defined
  children,
  // the children of the Component
}) => {
  const [entries, setEntries] = useState<Element[]>();

  useEffect(() => {
    if (target === "elem") {
      setEntries([elemRef.current as Element]);
      return;
    }

    const containerChlidren = Array.from(elemRef.current!.children);
    if (containerChlidren) {
      setEntries(containerChlidren);
    }
  }, [elemRef, target]);

  // in case you are having problems with classes and styles
  // that might be due to the strict mode double checking or
  // re-renders on state changes so provide checking like I did
  // like (targetElem.className.includes(...))
  const observerInitializer = useCallback(() => {
    if (entries && entries.length) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const targetElem = entry.target as HTMLElement;
            // this part can be customized
            if (oldClasses && targetElem.className.includes(oldClasses)) {
              const elemClassName = targetElem.className;
              const oldClassesLength = oldClasses.length;
              const oldClassesStartIdx = elemClassName.indexOf(oldClasses);
              const oldClassesEndIdx = oldClassesStartIdx + oldClassesLength;

              targetElem.className = [
                elemClassName.slice(0, oldClassesStartIdx),
                elemClassName.slice(oldClassesEndIdx + 1),
              ].join("");
            } else {
              if (!targetElem.className.includes(newClasses)) {
                targetElem.className += " " + newClasses;
              }
            }
            // stoping the observation after intersectig
            observer.unobserve(targetElem);
          }
        });
      }, options || defaultOptions);

      entries.forEach(entry => {
        observer.observe(entry);
      });
    }
  }, [entries, newClasses, oldClasses, options]);

  useEffect(() => {
    observerInitializer();
    // cleaning the side-effects of the useEffect hook
    return observerInitializer();
  }, [entries, observerInitializer]);

  return <>{children}</>;
};

export default RevealOnScroll;
