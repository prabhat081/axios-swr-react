# axios-swr-react

A utility package for making HTTP requests with axios and SWR.

## Installation

```sh
npm install axios-swr-react
```

## Usage

### `useData` Hook

The `useData` hook is used to fetch data with SWR and axios. It provides `data`, `isLoading`, and `isError` states.

```jsx
import React from 'react';
import { useData } from 'axios-swr-react';

const MyComponent = () => {
  const { data, isLoading, isError } = useData('/api/data');

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
```

### HTTP Methods

The package provides reusable functions for GET, POST, PUT, and DELETE HTTP methods.

#### GET Request

```jsx
import { get } from 'axios-swr-react';

const fetchData = async () => {
  try {
    const data = await get('/api/data');
    console.log(data);
  } catch (error) {
    console.error('Error fetching data', error);
  }
};
```

#### POST Request

```jsx
import { post } from 'axios-swr-react';

const sendData = async () => {
  try {
    const data = { key: 'value' };
    const response = await post('/api/data', data);
    console.log(response);
  } catch (error) {
    console.error('Error sending data', error);
  }
};
```

#### PUT Request

```jsx
import { put } from 'axios-swr-react';

const updateData = async () => {
  try {
    const data = { key: 'newValue' };
    const response = await put('/api/data/1', data);
    console.log(response);
  } catch (error) {
    console.error('Error updating data', error);
  }
};
```

#### DELETE Request

```jsx
import { del } from 'axios-swr-react';

const deleteData = async () => {
  try {
    const response = await del('/api/data/1');
    console.log(response);
  } catch (error) {
    console.error('Error deleting data', error);
  }
};
```

### Mutation Example

You can use the `mutate` function from SWR to revalidate the data after making a POST, PUT, or DELETE request.

```jsx
import React from 'react';
import { useData, post, put, del } from 'axios-swr-react';
import { mutate } from 'swr';

const MyComponent = () => {
  const { data, isLoading, isError } = useData('/api/data');

  const handleAddData = async () => {
    const newData = { key: 'value' };
    await post('/api/data', newData);
    mutate('/api/data'); // Revalidate the data after the POST request
  };

  const handleUpdateData = async () => {
    const updatedData = { key: 'newValue' };
    await put('/api/data/1', updatedData);
    mutate('/api/data'); // Revalidate the data after the PUT request
  };

  const handleDeleteData = async () => {
    await del('/api/data/1');
    mutate('/api/data'); // Revalidate the data after the DELETE request
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleAddData}>Add Data</button>
      <button onClick={handleUpdateData}>Update Data</button>
      <button onClick={handleDeleteData}>Delete Data</button>
    </div>
  );
};
```

## License

MIT
