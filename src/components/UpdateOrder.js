import React, { useState } from 'react';
import axios from 'axios';

const UpdateOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState({ name: '', description: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:8000/orders/${orderId}`, order)
      .then(response => {
        console.log('Order updated successfully:', response.data);
        setOrder({ name: '', description: '' });
        setOrderId('');
      })
      .catch(error => console.error('There was an error updating the order!', error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Order</h2>
      <input
        type="text"
        value={orderId}
        onChange={e => setOrderId(e.target.value)}
        placeholder="Order ID"
      />
      <input
        type="text"
        name="name"
        value={order.name}
        onChange={handleChange}
        placeholder="Order Name"
      />
      <input
        type="text"
        name="description"
        value={order.description}
        onChange={handleChange}
        placeholder="Order Description"
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateOrder;
