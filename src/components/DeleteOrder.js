import React, { useState } from 'react';
import axios from 'axios';

const DeleteOrder = () => {
  const [orderId, setOrderId] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.delete(`http://localhost:8000/orders/${orderId}`)
      .then(response => {
        console.log('Order deleted successfully:', response.data);
        setOrderId('');
      })
      .catch(error => console.error('There was an error deleting the order!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Delete Order</h2>
      <input
        type="text"
        value={orderId}
        onChange={e => setOrderId(e.target.value)}
        placeholder="Order ID"
      />
      <button type="submit">Delete</button>
    </form>
  );
};

export default DeleteOrder;
