import React, { useState, useEffect } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="flex justify-center text-2xl font-semibold mb-6 text-gray-800">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(item => (
          <div key={item.id} className="border border-gray-300 p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
