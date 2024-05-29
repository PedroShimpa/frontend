import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import OrderList from './OrderList'; // Importe o componente OrderList aqui

const CreateOrder = () => {
  const [order, setOrder] = useState({
    customer_name: '',
    date: '',
    delivery_address: '',
    items: [{ name: '', price: '', quantity: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = order.items.map((item, i) => {
      if (i === index) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setOrder({ ...order, items: newItems });
  };

  const addItem = () => {
    setOrder({ ...order, items: [...order.items, { name: '', price: '', quantity: '' }] });
  };

  const removeItem = (index) => {
    const newItems = order.items.filter((item, i) => i !== index);
    setOrder({ ...order, items: newItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/orders', order)
      .then(response => {
        withReactContent(Swal).fire('OK', 'Pedido adicionado com sucesso', 'success');
        setOrder({
          customer_name: '',
          delivery_address: '',
          items: [{ name: '', price: '', quantity: '' }],
        });
      })
      .catch(error => withReactContent(Swal).fire('ATENÇÃO', 'Algo saiu errado ao criar o pedido', 'error'));
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5">
          Criar Pedido
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="customer_name"
                value={order.customer_name}
                onChange={handleChange}
                label="Nome do Cliente"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="delivery_address"
                value={order.delivery_address}
                onChange={handleChange}
                label="Endereço"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Items</Typography>
            </Grid>
            {order.items.map((item, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    label="Produto"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="price"
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    label="Preço"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    name="quantity"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    label="Quantidade"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <IconButton color="secondary" onClick={() => removeItem(index)}>
                    <RemoveCircle />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircle />}
                onClick={addItem}
              >
                Adicionar itens
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Criar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateOrder;
