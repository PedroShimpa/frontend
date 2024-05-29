import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Paper,
  Box,
  Divider,
  Modal,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
	getOrders()
  }, []);

  const getOrders = () => {
	axios.get('http://localhost:8000/orders')
	.then(response => {
	  if (Array.isArray(response.data) && response.data.length > 0) {
		const filteredOrders = response.data.filter(order => order.customer_name && order.status && order.date);
		setOrders(filteredOrders);
		console.log(filteredOrders)
	  } else {
		console.error('No orders found.');
	  }
	})
	.catch(error => console.error('There was an error fetching the orders!', error));
  }

  const handleToggle = (order) => {
    setOpen(!open);
    setSelectedOrder(order);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    axios.put(`http://localhost:8000/orders/update-order-status/${selectedOrder.id}`, { status: newStatus })
      .then(response => {
        console.log('Status updated successfully');
        handleCloseModal();
        getOrders()
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography component="h1" variant="h5" gutterBottom>
          Pedidos
        </Typography>
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
          <List>
            {orders.map((order, index) => (
              <div key={order.id}>
                <ListItem button onClick={() => handleToggle(order)}>
                  <ListItemText primary={order.customer_name} secondary={`Data: ${formatDate(order.date)}`} />
                </ListItem>
                <Collapse in={open && selectedOrder && selectedOrder.id === order.id} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={`id: ${order.id}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Status: ${order.status}`} />
                      <Button onClick={handleOpenModal}>Atualizar</Button>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={`Endereço: ${order.delivery_address}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={`Total: R$ ${order.total}`} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary={`Itens:`} />
                      <List component="div" disablePadding>
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <ListItem>
                              <ListItemText primary={`${item.name}, Preço: R$${item.price}`} />
                            </ListItem>
                            {itemIndex !== order.items.length - 1 && <Divider />}
                          </div>
                        ))}
                      </List>
                    </ListItem>
                  </List>
                </Collapse>
              </div>
            ))}
          </List>
        </Paper>
      </Box>
      {/* Modal para atualização de status */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Atualizar Status
          </Typography>
          <FormControl fullWidth>
            <Select
              value={newStatus}
              onChange={handleStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>Selecione o novo status</em>
              </MenuItem>
              <MenuItem value="Em produção">Em produção</MenuItem>
              <MenuItem value="Em entrega">Em Entrega</MenuItem>
              <MenuItem value="Entregue">Entregue</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleUpdateStatus} disabled={!newStatus} sx={{ mt: 2 }} variant="contained" color="primary">
            Atualizar
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	return `${day}/${month}/${year} ${hour}:${minutes}`;
};

export default OrderList;
