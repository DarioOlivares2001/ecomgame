import { Injectable } from '@angular/core';

/**
 * Servicio para manejar el almacenamiento en localStorage.
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  /**
   * Verifica si localStorage está disponible.
   * @returns `true` si localStorage está disponible, `false` en caso contrario.
   */
  isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorageTest__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Obtiene un ítem de localStorage.
   * @param key - La clave del ítem a obtener.
   * @returns El valor del ítem almacenado o `[]` si no se encuentra.
   */
  getItem(key: string): any {
    if (this.isLocalStorageAvailable()) {
      return JSON.parse(localStorage.getItem(key) || '[]');
    }
    return [];
  }

  /**
   * Establece un ítem en localStorage.
   * @param key - La clave del ítem a almacenar.
   * @param value - El valor del ítem a almacenar.
   */
  setItem(key: string, value: any): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  /**
   * Obtiene la lista de usuarios del almacenamiento local.
   * @returns La lista de usuarios.
   */
  getUsers(): any[] {
    return this.getItem('users');
  }

  /**
   * Valida un usuario por email y contraseña.
   * @param email - El email del usuario.
   * @param password - La contraseña del usuario.
   * @returns `true` si el usuario es válido, `false` en caso contrario.
   */
  validateUser(email: string, password: string): boolean {
    const users = this.getUsers();
    console.log('Usuarios registrados:', users);
    return users.some(user => user.email === email && user.password === password);
  }

  /**
   * Obtiene un usuario por su email.
   * @param email - El email del usuario.
   * @returns El usuario encontrado o `undefined` si no se encuentra.
   */
  getUserByEmail(email: string): any {
    const users = this.getUsers();
    return users.find(user => user.email === email);
  }
}
