import { persistentAtom } from '@nanostores/persistent';

// 1. DEFINICIÓN DE LA TIENDA
// persistentAtom(nombreClave, valorInicial, opciones)
// 'cart' será la clave en localStorage.
// [] es el valor inicial.
export const cart = persistentAtom('cart', [], {
    encode: JSON.stringify, // Cómo guardar en localStorage
    decode: JSON.parse,     // Cómo leer de localStorage
});

console.log("[NanoStore LOG] 🏪 Tienda de carrito (persistente) inicializada.");

// 2. DEFINICIÓN DE ACCIONES
// Estas son funciones auxiliares que modifican la tienda.

/**
 * Agrega un producto al carrito.
 * Lee el estado actual, lo modifica y lo guarda.
 */
export function addToCart(product) {
    // Obtenemos el valor ACTUAL de la tienda
    const currentCart = cart.get(); 
    
    const exists = currentCart.some(item => item.id === product.id);

    if (exists) {
        console.log(`[NanoStore LOG] 🚫 Producto ${product.name} ya existe. Saltando.`);
        return; // No hacemos nada si ya existe
    }

    // Creamos el nuevo estado
    const newCart = [
        ...currentCart,
        { 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            slug: product.slug,
            quantity: 1 
        }
    ];

    // 3. ACTUALIZACIÓN DE LA TIENDA
    // .set() actualiza la tienda.
    // Esto automáticamente:
    // 1. Actualiza el estado global.
    // 2. Guarda en localStorage (gracias a persistentAtom).
    // 3. Notifica a TODOS los componentes suscritos (CartIcon, AddToCartButton).
    cart.set(newCart);
    console.log(`[NanoStore LOG] ✅ Producto ${product.name} añadido. Nuevo tamaño: ${newCart.length}`);
}

/**
 * (Opcional) Eliminar un producto
 */
export function removeFromCart(productId) {
    const currentCart = cart.get();
    const newCart = currentCart.filter(item => item.id !== productId);
    cart.set(newCart);
    console.log(`[NanoStore LOG] 🗑️ Producto ${productId} eliminado.`);
}