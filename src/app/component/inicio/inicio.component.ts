import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

/**
 * Componente de inicio que muestra una lista de productos y permite agregarlos al carrito.
 */
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  /**
   * Lista de productos disponibles.
   */
  products: any[] = [];

  /**
   * Constructor del componente.
   * @param productService - Servicio de productos para manejar operaciones relacionadas con productos.
   * @param cartService - Servicio del carrito para manejar operaciones relacionadas con el carrito.
   */
  constructor(private productService: ProductService, private cartService: CartService) {}

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.productService.products$.subscribe(data => {
      this.products = data;
    });
  }

  /**
   * Añade un producto al carrito.
   * @param product - El producto a añadir al carrito.
   */
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

}
