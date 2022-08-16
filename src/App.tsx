import { FC, useRef } from "react";

// Importing Componets
import RevealOnScroll from "./RevealOnScroll";

// DUMMY_DATA
const numbers: number[] = Array.from(Array(50).keys());

const App: FC = () => {
  const elemRef = useRef<HTMLUListElement>(null);

  return (
    <RevealOnScroll
      elemRef={elemRef}
      newClasses='bg-red-500 text-black'
      oldClasses='bg-black text-gray-200'
    >
      <ul
        ref={elemRef}
        className='flex flex-col items-center justify-center gap-y-[10rem]'
      >
        {numbers.map((number, idx) => {
          return (
            <li
              key={idx}
              className='grid place-items-center w-32 h-32 bg-black text-gray-200 transition-all duration-[3s]'
            >
              {++number}
            </li>
          );
        })}
      </ul>
    </RevealOnScroll>
  );
};

export default App;
