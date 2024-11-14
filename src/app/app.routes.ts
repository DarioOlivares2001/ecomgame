import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { ProductlistComponent } from './component/productlist/productlist.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminmenuComponent } from './component/adminmenu/adminmenu.component';
import { AdminproductosComponent } from './component/adminproductos/adminproductos.component';
import { AdminusuariosComponent } from './component/adminusuarios/adminusuarios.component';
import { InicioComponent } from './component/inicio/inicio.component';
import { PasswordresetComponent } from './component/passwordreset/passwordreset.component';
import { FacturaComponent } from './component/factura/factura.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio-component', pathMatch: 'full' },
  { path: 'productlist-component', component: ProductlistComponent },
  { path: 'cart-component', component: CartComponent },
  { path: 'login-component', component: LoginComponent },
  { path: 'register-component', component: RegisterComponent },
  { path: 'adminproductos-component', component:AdminproductosComponent },
  { path: 'adminusuarios-component', component: AdminusuariosComponent },
  { path: 'adminmenu-component', component: AdminmenuComponent },
  { path: 'inicio-component', component: InicioComponent },
  { path: 'passwordreset-component', component: PasswordresetComponent },
  { path: 'factura-component', component: FacturaComponent  },
  { path: '**', redirectTo: 'inicio-component' },


];
