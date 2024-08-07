# http-request-prabhat

A utility package for making HTTP requests with axios and SWR.

## Installation

```sh
npm install http-request-prabhat

import { useData, get, post, put, del } from 'http-request-package';

// Usage examples in a React component

const MyComponent = () => {
  const { data, isLoading, isError } = useData('https://jsonplaceholder.typicode.com/posts/1');

  // Define functions for get, post, put, and delete requests
  // ...

  return (
    // JSX for the component
  );
};


