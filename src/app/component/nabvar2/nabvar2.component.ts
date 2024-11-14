import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AdminmenuComponent } from '../adminmenu/adminmenu.component';
import { AdminproductosComponent } from '../adminproductos/adminproductos.component';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

/**
 * Componente de la barra de navegación con funcionalidad para usuarios y administradores.
 */
@Component({
  selector: 'app-nabvar2',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, LoginComponent, RegisterComponent, AdminmenuComponent, AdminproductosComponent],
  templateUrl: './nabvar2.component.html',
  styleUrls: ['./nabvar2.component.css']
})
export class Nabvar2Component implements OnInit {
  /**
   * Indica si el usuario actual es un administrador.
   */
  isAdmin: boolean = false;

  /**
   * Indica si el usuario actual ha iniciado sesión.
   */
  isLoggedIn: boolean = false;

  /**
   * Número de ítems en el carrito de compras.
   */
  cartItemCount: number = 0;

  /**
   * Indica si se debe mostrar una animación de latido en el ícono del carrito.
   */
  heartbeat: boolean = false;

  /**
   * Nombre de usuario del usuario actual.
   */
  username: string | null = null;

  /**
   * Constructor del componente.
   * @param authService - Servicio de autenticación para manejar el estado del usuario.
   * @param cartService - Servicio del carrito para manejar operaciones relacionadas con el carrito.
   */
  constructor(private authService: AuthService, private cartService: CartService) {}

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });

    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });

    this.authService.username$.subscribe(username => {
      this.username = username;
    });

    this.cartService.items$.subscribe(items => {
      this.cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
      this.heartbeat = true;
      setTimeout(() => this.heartbeat = false, 600);
    });
  }

  /**
   * Muestra u oculta el carrito de compras.
   */
  showCart() {
    document.body.classList.toggle('showCart');
  }

  /**
   * Muestra u oculta el menú de administrador.
   */
  toggleAdminMenu() {
    document.body.classList.toggle('showAdmin');
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    this.authService.logout();
  }
}
