import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

/**
 * Componente para la gestión del carrito de compras.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  /**
   * Lista de ítems en el carrito.
   */
  items: any[] = [];

  /**
   * Total del carrito.
   */
  total: number = 0;

  /**
   * Constructor del componente.
   * @param cartService - Servicio del carrito para manejar operaciones relacionadas con el carrito.
   * @param router - Router para la navegación.
   */
  constructor(private cartService: CartService, private router: Router) {}

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.items = items;
      this.total = this.cartService.getTotal();
    });
  }

  /**
   * Cierra el carrito de compras.
   */
  closeCart() {
    document.body.classList.remove('showCart');
  }

  /**
   * Navega a la página de factura y cierra el carrito de compras.
   */
  pay() {
    this.router.navigate(['/factura-component']);
    document.body.classList.remove('showCart');
  }

  /**
   * Cambia la cantidad de un ítem en el carrito.
   * @param id - ID del ítem.
   * @param action - Acción a realizar (incrementar o disminuir cantidad).
   */
  changeQuantity(id: number, action: string) {
    this.cartService.changeQuantity(id, action);
    this.total = this.cartService.getTotal();
    this.triggerTotalJump();
  }

  /**
   * Activa una animación visual para indicar que el total ha sido actualizado.
   */
  triggerTotalJump() {
    const totalElement = document.querySelector('.total');
    if (totalElement) {
      totalElement.classList.add('total-update');
      setTimeout(() => totalElement.classList.remove('total-update'), 300);
    }
  }
}
