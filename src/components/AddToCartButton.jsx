import React from 'react';
import { useStore } from '@nanostores/react'; // 1. Importar el hook de nanostores
import { cart, addToCart } from '../store/cartStore'; // 2. Importar la tienda y la acción
import { twMerge } from 'tailwind-merge';

export default function AddToCartButton({ productData, baseClasses }) {
    // 3. Suscribirse al estado de la tienda
    // $cart ahora contendrá el valor actual del array del carrito
    const $cart = useStore(cart);
    
    // La lógica de estado es la misma, pero ahora usa la tienda global
    const isAdded = $cart.some(item => item.id === productData.id);

    const handleClick = (e) => {
        e.stopPropagation(); 
        e.preventDefault();
        
        // 4. Llamar a la acción importada directamente
        addToCart(productData); 
    };

    const addedClasses = 'bg-gray-500 from-gray-500 to-gray-500 opacity-75 shadow-none hover:scale-100 active:scale-100 cursor-default';

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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-amber-100">
                    <path d="M20 6L9 17L4 12"/>
                </svg>
            ) : (
                // Ícono de "Carrito y Más"
                <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-100">
                        <path d="M12 5v14M5 12h14"/>
                    </svg>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-100">
                        <path d="M3 3h2l.5 3M7 6h14l-1.5 9H6M5 21a1 1 0 100-2 1 1 0 000 2zm13 0a1 1 0 100-2 1 1 0 000 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </>
            )}
        </button>
    );
}