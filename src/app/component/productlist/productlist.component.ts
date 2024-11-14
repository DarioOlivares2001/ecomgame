import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

/**
 * Componente que muestra una lista de productos y permite agregarlos al carrito de compras.
 */
@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
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
   * Añade un producto al carrito de compras.
   * @param product - El producto a añadir al carrito.
   */
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
}
