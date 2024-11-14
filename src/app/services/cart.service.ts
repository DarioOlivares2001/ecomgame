import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio para manejar el carrito de compras.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  /**
   * Sujeto para los ítems del carrito.
   */
  private items = new BehaviorSubject<any[]>(this.getCartFromLocalStorage());
  items$ = this.items.asObservable();

  /**
   * Carrito de compras.
   */
  private cart: any[] = this.getCartFromLocalStorage();

  /**
   * Añade un producto al carrito.
   * @param product - El producto a añadir al carrito.
   */
  addToCart(product: any) {
    const existingProductIndex = this.cart.findIndex(item => item.id === product.id);
    if (existingProductIndex >= 0) {
      this.cart[existingProductIndex].quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  /**
   * Cambia la cantidad de un producto en el carrito.
   * @param id - El ID del producto.
   * @param action - La acción a realizar ('mas' para incrementar, 'menos' para decrementar).
   */
  changeQuantity(id: number, action: string) {
    const productIndex = this.cart.findIndex(item => item.id === id);
    if (productIndex >= 0) {
      if (action === 'mas') {
        this.cart[productIndex].quantity += 1;
      } else if (action === 'menos') {
        this.cart[productIndex].quantity -= 1;
        if (this.cart[productIndex].quantity <= 0) {
          this.cart.splice(productIndex, 1);
        }
      }
      this.updateCart();
    }
  }

  /**
   * Actualiza el carrito y guarda los cambios en el almacenamiento local.
   */
  private updateCart() {
    this.items.next([...this.cart]);
    this.saveCartToLocalStorage();
  }

  /**
   * Guarda el carrito en el almacenamiento local.
   */
  private saveCartToLocalStorage() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  /**
   * Obtiene el carrito del almacenamiento local.
   * @returns El carrito de compras.
   */
  public getCartFromLocalStorage(): any[] {
    if (typeof window !== 'undefined' && localStorage) {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    }
    return [];
  }

  /**
   * Obtiene el total del carrito de compras.
   * @returns El total del carrito.
   */
  getTotal() {
    return this.cart.reduce((total, item) => total + (item.precio * item.quantity), 0);
  }

  /**
   * Vacía el carrito de compras.
   */
  public clearCart() {
    this.cart = [];
    this.items.next([]);
    this.saveCartToLocalStorage();
  }
}
