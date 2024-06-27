// src/components/Menu.js
import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, Container, Grid } from '@mui/material';

const menuItems = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 15 },
];

function Menu({ onAddToCart }) {
    return (
        <Container>
            <Grid container spacing={2}>
                {menuItems.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{item.name}</Typography>
                                <Typography variant="body2">${item.price}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" color="primary" onClick={() => onAddToCart(item)}>
                                    Adicionar ao Carrinho
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Menu;
