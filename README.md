# RevealOnScroll Component
A react component that you can wrap around your components or elements
in order to observe your elements to see wether they are intersecting with
the browser view-port of the specified root and then providing functionality
whenever the elements are intersecting - such as adding tailwind classes or etc.

## Demo

![Alt Text](https://media.giphy.com/media/dHdtd9s0wkJzelxUxo/giphy.gif)
## Tech Stack

React, TypeScript, TailwindCSS (for testing purposes)


## Usage/Example

```javascript
import { useRef } from 'react';

// Importing Components
import RevealOnScroll from './RevealOnScroll';

// DUMMY_DATA
const numbers: number[] = Array.from(Array(50).keys());

function App() {
  const elemRef = useRef<HTMLUListElement>(null);

  return (
      <RevealOnScroll>
        <ul
          ref={elemRef}
          className='flex flex-col gap-y-[10rem]'
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
  )
}

export default App;
```


## Scripts

to install the required dependencies

```bash
  npm install
```

to run the project's demo

```bash
  npm run start
```

this project was built with cra (create-react-app) so it supports the scripts
which are set by cra during initialization of the project