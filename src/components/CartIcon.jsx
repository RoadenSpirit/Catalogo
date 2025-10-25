import React, { useState, useEffect, useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { useStore } from '@nanostores/react';
import { cart, removeFromCart } from '../store/cartStore'; // Importa removeFromCart

export default function CartIcon() {
    const $cart = useStore(cart);
    const itemCount = $cart.length;

    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const totalPrice = $cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
    const toggleMenu = () => setIsOpen(prev => !prev);

    // Nueva función para eliminar un producto
    const handleRemoveItem = (productId) => {
        removeFromCart(productId);
        // No es necesario recargar el componente manualmente, useStore ya lo hará.
        // El total y el conteo se actualizarán automáticamente.
    };
    
    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleMenu}
                title="Ver carrito de compras"
                className="relative p-2 rounded-full text-white hover:bg-slate-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-golden-yellow"
            >
                <svg
                    className="w-7 h-7"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>

                {itemCount > 0 && (
                    <span
                        className={twMerge(
                            "absolute top-0 right-0 inline-flex items-center justify-center w-6 h-6 text-xs font-bold leading-none transform translate-x-1/2 -translate-y-1/2 bg-golden-yellow text-gray-900 rounded-full",
                            itemCount > 9 ? "p-1" : ""
                        )}
                    >
                        {itemCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-30 transition-opacity duration-200">
                    <h4 className="px-4 py-3 bg-golden-yellow/70 text-gray-900 font-semibold border-b border-slate-700">
                        Tu Carrito ({itemCount})
                    </h4>

                    {itemCount === 0 ? (
                        <p className="p-4 text-gray-400 text-sm text-center">
                            El carrito está vacío. ¡Añade productos!
                        </p>
                    ) : (
                        <>
                            <ul className="max-h-60 overflow-y-auto divide-y divide-slate-700">
                                {$cart.map(item => (
                                    <li key={item.id} className="flex items-center justify-between p-3 transition duration-150 hover:bg-slate-700/70">
                                        <div className="flex flex-col min-w-0">
                                            <a href={`/products/${item.slug}`} className="text-sm font-medium text-milk-white truncate hover:text-golden-yellow" onClick={() => setIsOpen(false)}>
                                                {item.name}
                                            </a>
                                            <span className="text-xs text-gray-400 mt-0.5">
                                                Cant: {item.quantity} x {formatCurrency(item.price)}
                                            </span>
                                        </div>
                                        <div className="flex items-center"> {/* Contenedor para precio y botón */}
                                            <span className="text-sm font-semibold text-price-green ml-4 flex-shrink-0">
                                                {formatCurrency(item.price * item.quantity)}
                                            </span>
                                            {/* Botón para eliminar */}
                                            <button
                                                onClick={() => handleRemoveItem(item.id)}
                                                className="ml-3 p-1 text-red-500 hover:text-red-700 transition duration-150 rounded-full border border-red-500 hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                title="Eliminar del carrito"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path></svg>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-4 border-t border-slate-700 bg-gray-800/70">
                                <div className="flex justify-between items-center text-base font-bold mb-3">
                                    <span className="text-milk-white">Total:</span>
                                    <span className="text-price-green">{formatCurrency(totalPrice)}</span>
                                </div>
                                <button
                                    onClick={() => { alert("Checkout pendiente!"); setIsOpen(false); }}
                                    className="w-full bg-golden-yellow hover:bg-golden-yellow/90 text-gray-900 font-bold py-2 rounded-lg transition duration-200"
                                >
                                    Ir a Pagar
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}