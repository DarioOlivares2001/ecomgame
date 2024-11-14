import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { AdminmenuComponent } from '../adminmenu/adminmenu.component';
import { AdminproductosComponent } from '../adminproductos/adminproductos.component';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

/**
 * Componente para el encabezado de la aplicación.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule, CommonModule, LoginComponent, RegisterComponent, AdminmenuComponent, AdminproductosComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  /**
   * Indicador de si el usuario es administrador.
   */
  isAdmin: boolean = false;

  /**
   * Indicador de si el usuario ha iniciado sesión.
   */
  isLoggedIn: boolean = false;

  /**
   * Contador de ítems en el carrito.
   */
  cartItemCount: number = 0;

  /**
   * Indicador de latido del corazón para animación.
   */
  heartbeat: boolean = false;

  /**
   * Nombre de usuario del usuario autenticado.
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
   * Muestra u oculta el carrito.
   */
  showCart() {
    document.body.classList.toggle('showCart');
  }

  /**
   * Muestra u oculta el menú de administración.
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
