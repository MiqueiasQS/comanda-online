import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Container, Grid } from '@mui/material';

const menuItems = [
    { id: 1, name: 'Strogonoff', price: 70, image: 'https://p2.trrsf.com/image/fget/cf/1200/1200/middle/images.terra.com/2022/08/03/1769155807-receita-de-strogonoff-de-carne-ou-frango-02.jpeg' },
    { id: 2, name: 'Canelone', price: 115, image: 'https://www.sumerbol.com.br/uploads/images/2017/10/canelone-1507062505.jpg' },
    { id: 3, name: 'Carbonara', price: 55, image: 'https://i.panelinha.com.br/i1/228-q-2473-blog-ayu6706.webp' },
    { id: 4, name: 'Lasanha', price: 40, image: 'https://saborfacil.com/wp-content/uploads/2024/01/lasanha-de-carne-moida.png' },
];

function Menu({ onAddToCart }) {
    return (
        <Container>
            <Grid container spacing={2}>
                {menuItems.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card style={{ display: 'flex', flexDirection: 'row' }}>
                            <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={item.image} alt={item.name} style={{ width: '90%', height: 'auto', objectFit: 'cover', borderRadius: '100%' }} /> {/* Imagem à esquerda */}
                            </div>
                            <div style={{ flex: 1 }}>
                                <CardContent>
                                    <Typography variant="h5">{item.name}</Typography>
                                    <Typography variant="body2">R$ {item.price}</Typography>
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
