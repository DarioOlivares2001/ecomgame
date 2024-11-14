import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { InvoiceService } from '../../services/invoice.service';

/**
 * Componente para la visualización de la factura.
 */
@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  /**
   * Lista de ítems en la factura.
   */
  items: any[] = [];

  /**
   * Total de la factura.
   */
  total: number = 0;

  /**
   * Información del usuario.
   */
  userInfo = {
    nombre: '',
    email: '',
    direccion: ''
  };

  /**
   * Número de orden de venta.
   */
  orderNumber: number = 0;

  /**
   * Número de factura.
   */
  invoiceNumber: number = 0;

  /**
   * Constructor del componente.
   * @param cartService - Servicio del carrito para manejar operaciones relacionadas con el carrito.
   * @param authService - Servicio de autenticación para manejar el estado del usuario.
   * @param router - Router para la navegación.
   * @param userService - Servicio de usuarios para manejar operaciones relacionadas con usuarios.
   * @param invoiceService - Servicio de facturas para manejar operaciones relacionadas con facturas.
   */
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private invoiceService: InvoiceService
  ) {}

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.items = this.cartService.getCartFromLocalStorage();
    this.total = this.cartService.getTotal();
    this.cartService.clearCart();

    const username = this.authService.getUsername();
    if (username) {
      this.userService.getUserByUsername(username).subscribe(user => {
        if (user) {
          this.userInfo.nombre = user.username;
          this.userInfo.email = user.email;
          this.userInfo.direccion = user.address || 'No disponible';
          this.orderNumber = this.generateOrderNumber();
          this.invoiceNumber = this.generateInvoiceNumber();
          this.saveInvoice();
        }
      });
    }
  }

  /**
   * Genera un número de orden de venta aleatorio.
   * @returns Número de orden de venta.
   */
  generateOrderNumber(): number {
    return Math.floor(Math.random() * 1000000);
  }

  /**
   * Genera un número de factura aleatorio.
   * @returns Número de factura.
   */
  generateInvoiceNumber(): number {
    return Math.floor(Math.random() * 1000000);
  }

  /**
   * Guarda la factura en el servicio de facturas.
   */
  saveInvoice() {
    const invoice = {
      id: 0,
      orderNumber: this.orderNumber,
      invoiceNumber: this.invoiceNumber,
      items: this.items,
      total: this.total,
      userInfo: this.userInfo,
      date: new Date().toISOString()
    };

    this.invoiceService.addInvoice(invoice);
  }
}
