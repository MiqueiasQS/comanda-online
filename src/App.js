import React, { useState, useEffect } from 'react';
import Menu from './components/Menu';
import Cart from './components/Cart';
// import { db } from './firebase';
import { Button, Modal, Box, TextField, Typography, Toolbar, IconButton, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from './logo.png';
import './App.css';
import Badge from '@mui/material/Badge';

const car = {
  width: '100%',
  height: '100%',
  bgcolor: 'background.paper',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  width: '300px',
};

function App() {
  const [pedido, setPedido] = useState({
    numero_da_mesa: '',
    restaurante: '',
    nome: '',
    telefone: '',
    itens: [],
  });

  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('clienteInfo');
    if (savedData) {
      setPedido(prevState => ({ ...prevState, ...JSON.parse(savedData) }));
    }
  }, []);

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const getTotalItems = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleFormSubmit = async (data) => {
    // const finalOrder = { ...pedido, ...data, itens: cart };
    // await db.collection('pedidos').add(finalOrder);
    setPedido({ numero_da_mesa: '', restaurante: '', nome: '', telefone: '', itens: [] });
    setCart([]);
    setOpenForm(false);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const handleClientInfoSubmit = (e) => {
    e.preventDefault();
    const { nome, telefone } = e.target.elements;
    const clientData = { nome: nome.value, telefone: telefone.value };
    setPedido(prevState => ({ ...prevState, ...clientData }));
    localStorage.setItem('clienteInfo', JSON.stringify(clientData));
    setOpenForm(false);
    handleFormSubmit({});
  };

  return (
    <Container className="main-container" style={{ padding: '0px', maxWidth: '100%' }}>
      <div className="header" >
        <img src={logo} alt="Logo" className="logo" />
        <Typography variant="h5">
          Bem-vindo ao Recanto dos Sabores
        </Typography>
      </div>
      <Menu onAddToCart={handleAddToCart} />
      <Modal open={open} onClose={handleClose}>
        <Box sx={car}>
          <div className="header">
            <img src={logo} alt="Logo" className="logo" />
            <Typography variant="h5" style={{ paddingInline: '20%' }}>
              Carrinho
            </Typography>
          </div>

          <Cart items={cart} onRemove={handleRemoveFromCart} onQuantityChange={handleQuantityChange} />

          <Button variant="contained" color="secondary" onClick={pedido.nome ? () => handleFormSubmit({}) : handleOpenForm} style={{ marginTop: '16px' }} className='button'>
            Finalizar Pedido
          </Button>

          <div className="footer" >
            <Toolbar>
              <IconButton color="inherit" aria-label="menu" onClick={handleClose} style={{ paddingRight: '150px' }}>
                <HomeIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleOpen}>
                <ShoppingCartIcon />
              </IconButton>
            </Toolbar>
          </div>
        </Box>
      </Modal>
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box sx={style}>
          <form onSubmit={handleClientInfoSubmit} style={formStyle}>
            <Typography variant="h5" align="center" gutterBottom>
              Informações do Cliente
            </Typography>
            <TextField label="Nome" name="nome" fullWidth required />
            <TextField label="Telefone" name="telefone" fullWidth required />
            <div>
              <Button variant="contained" color="error" onClick={handleCloseForm} style={{ margin: '5px' }}>
                Voltar
              </Button>
              <Button type="submit" variant="contained" color="primary" style={{ margin: '5px' }} className='button'>
                Enviar
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <div className="footer" >
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" onClick={handleClose} style={{ paddingRight: '150px' }}>
            <HomeIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleOpen}>
            <Badge badgeContent={getTotalItems(cart)} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </div>
    </Container>
  );
}

export default App;
