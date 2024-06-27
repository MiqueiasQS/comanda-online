import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Container, Grid } from '@mui/material';
import StrogonoffImage from '../logo.png'; // Importe a imagem necessária

const menuItems = [
    { id: 1, name: 'Strogonoff', price: 70, image: StrogonoffImage }, // Adicione a propriedade `image` ao objeto
    { id: 2, name: 'Strogonoff de camarão', price: 115, image: StrogonoffImage }, // Exemplo com outra imagem
    { id: 3, name: 'Carbonara', price: 55, image: StrogonoffImage },
    { id: 4, name: 'Lasanha', price: 40, image: StrogonoffImage },
];

function Menu({ onAddToCart }) {
    return (
        <Container>
            <Grid container spacing={2}>
                {menuItems.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '90%', height: 'auto', objectFit: 'cover' }} /> {/* Imagem à esquerda */}
                            </div>
                            <div style={{ flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h5">{item.name}</Typography>
                                    <Typography variant="body2">${item.price}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" color="primary" onClick={() => onAddToCart(item)} className='button'>
                                        Adicionar ao Carrinho
                                    </Button>
                                </CardActions>
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Menu;
