// src/components/OrderForm.js
import React, { useState } from 'react';

function OrderForm({ onSubmit }) {
    const [formData, setFormData] = useState({ nome: '', telefone: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nome" value={formData.nome} onChange={handleChange} placeholder="Nome" required />
            <input name="telefone" value={formData.telefone} onChange={handleChange} placeholder="Telefone" required />
            <button type="submit">Enviar Pedido</button>
        </form>
    );
}

export default OrderForm;
