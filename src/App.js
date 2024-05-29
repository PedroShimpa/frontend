import React from 'react';
import OrderList from './components/OrderList';
import CreateOrder from './components/CreateOrder';
import UpdateOrder from './components/UpdateOrder';
import DeleteOrder from './components/DeleteOrder';
import { Container, Typography } from '@mui/material';

function App() {
  return (
    <Container component="main" >
      <Typography component="h1" variant="h4" gutterBottom>
        Sistema de Gerenciamento de Pedidos
      </Typography>
      <CreateOrder />
      <OrderList />
    </Container>
  );
}


export default App;
