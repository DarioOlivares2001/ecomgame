import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

/**
 * Componente para el menú de administración.
 */
@Component({
  selector: 'app-adminmenu',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.css']
})
export class AdminmenuComponent {
  /**
   * Estado que indica si el menú está abierto.
   */
  isMenuOpen: boolean = false;

  /**
   * Alterna el estado del menú de administración.
   */
  toggleAdminMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    document.body.classList.toggle('showAdmin');
  }
}
