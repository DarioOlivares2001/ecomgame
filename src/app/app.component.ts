import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { CartComponent } from './component/cart/cart.component';
import { CommonModule } from '@angular/common';
import { AdminmenuComponent } from './component/adminmenu/adminmenu.component';
import { AdminproductosComponent } from './component/adminproductos/adminproductos.component';
import { AuthService } from './services/auth.service';
import { NotificacionbannerComponent } from './component/notificacionbanner/notificacionbanner.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { FacturaComponent } from './component/factura/factura.component';
import { Nabvar2Component } from './component/nabvar2/nabvar2.component';

/**
 * Componente raíz de la aplicación.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    RouterLink,
    RouterLinkActive,
    ProductlistComponent,
    CartComponent,
    CommonModule,
    RouterModule,
    AdminmenuComponent,
    AdminproductosComponent,
    NotificacionbannerComponent,
    InicioComponent,
    FacturaComponent,
    Nabvar2Component
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  /**
   * Título de la aplicación.
   */
  title = 'Experimento';

  /**
   * Indica si el usuario actual es administrador.
   */
  isAdmin: boolean = false;

  /**
   * Constructor del componente.
   * @param authService - Servicio de autenticación para manejar el estado del usuario.
   */
  constructor(private authService: AuthService) {}

  /**
   * Método para mostrar u ocultar el carrito de compras.
   */
  toggleCart() {
    document.body.classList.toggle('showCart');
  }

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }
}
