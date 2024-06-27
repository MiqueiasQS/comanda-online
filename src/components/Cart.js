// src/components/Cart.js
import React from 'react';
import { Button, IconButton, Container, Typography } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';

function Cart({ items, onRemove, onQuantityChange }) {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <Container style={{ color: 'black' }}>
            {items.length === 0 ? (
                <Typography variant="body1" align="center">
                    O carrinho está vazio.
                </Typography>
            ) : (
                items.map((item, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <Typography variant="body1">
                            {item.quantity} x {item.name} - ${item.price * item.quantity}
                        </Typography>
                        <div>
                            <IconButton onClick={() => onQuantityChange(index, 1)}><Add /></IconButton>
                            <IconButton onClick={() => onQuantityChange(index, -1)}><Remove /></IconButton>
                            <IconButton onClick={() => onRemove(index)}><Delete /></IconButton>
                        </div>
                    </div>
                ))
            )}
            <Typography variant="h5" align="center" gutterBottom>
                Total: ${total.toFixed(2)}
            </Typography>
        </Container>
    );
}

export default Cart;
