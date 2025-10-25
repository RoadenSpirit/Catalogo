import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useStore } from '@nanostores/react';
import { cart } from '../store/cartStore';

export default function AddToCartButton({ productData, baseClasses }) {
    const $cart = useStore(cart);
    const [isAdded, setIsAdded] = useState(false);

    const handleClick = () => {
        cart.set([...$cart, { ...productData, quantity: 1 }]);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000); // Reset after 2 seconds
    };

    const addedClasses = "!bg-green-500 hover:!bg-green-600 text-white"; // Clases para cuando el producto está añadido

    return (
            <button 
                onClick={handleClick}
                disabled={isAdded}
                className={twMerge(
                    baseClasses,
                    isAdded && addedClasses 
                )}
                aria-label={isAdded ? `Añadido: ${productData.name}` : `Añadir ${productData.name} al carrito`}
            >
                {isAdded ? (
                    // Ícono de "Check"
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-900">
                        <path d="M20 6L9 17L4 12"/>
                    </svg>
                ) : (
                    // Ícono de "Carrito" y "Más"
                    <>
                        {/* Ícono de Carrito */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-900">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        {/* Símbolo de Más */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-900">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </>
                )}
            </button>
    );
}