import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service'; // Importa el StorageService

/**
 * Servicio de autenticación para manejar el estado del usuario y la autenticación.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * Sujeto para indicar si el usuario es administrador.
   */
  private isAdminSubject = new BehaviorSubject<boolean>(this.getFromLocalStorage('isAdmin') === 'true');
  isAdmin$ = this.isAdminSubject.asObservable();

  /**
   * Sujeto para indicar si el usuario ha iniciado sesión.
   */
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getFromLocalStorage('isLoggedIn') === 'true');
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  /**
   * Sujeto para el nombre de usuario.
   */
  private usernameSubject = new BehaviorSubject<string | null>(this.getFromLocalStorage('username'));
  username$ = this.usernameSubject.asObservable();

  /**
   * Constructor del servicio de autenticación.
   * @param router - Router para manejar la navegación.
   * @param storageService - Servicio para manejar el almacenamiento local.
   */
  constructor(private router: Router, private storageService: StorageService) {}

  /**
   * Inicia sesión como administrador.
   */
  loginAsAdmin() {
    this.isAdminSubject.next(true);
    this.isLoggedInSubject.next(true);
    this.setToLocalStorage('isAdmin', 'true');
    this.setToLocalStorage('isLoggedIn', 'true');
    this.setToLocalStorage('username', 'Admin User');
    this.usernameSubject.next('Admin User');
    this.router.navigate(['adminproductos-component']);
  }

  /**
   * Inicia sesión como usuario.
   * @param username - Nombre de usuario.
   * @param password - Contraseña del usuario.
   */
  loginAsUser(username: string, password: string) {
    // Validar el usuario antes de iniciar sesión
    const user = this.storageService.getUserByEmail(username);
    if (user && this.storageService.validateUser(username, password)) {
      this.isAdminSubject.next(false);
      this.isLoggedInSubject.next(true);
      this.setToLocalStorage('isAdmin', 'false');
      this.setToLocalStorage('isLoggedIn', 'true');
      this.setToLocalStorage('username', username);
      this.usernameSubject.next(username);
      this.router.navigate(['userdashboard']);
    } else {
      console.error('Usuario o contraseña incorrectos');
    }
  }

  /**
   * Cierra la sesión del usuario.
   */
  logout() {
    this.isAdminSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.usernameSubject.next(null);
    this.removeFromLocalStorage('isAdmin');
    this.removeFromLocalStorage('isLoggedIn');
    this.removeFromLocalStorage('username');
    this.router.navigate(['inicio-component']);
  }

  /**
   * Verifica si el usuario actual es administrador.
   * @returns `true` si el usuario es administrador, `false` en caso contrario.
   */
  isAdmin() {
    return this.isAdminSubject.value;
  }

  /**
   * Verifica si el usuario ha iniciado sesión.
   * @returns `true` si el usuario ha iniciado sesión, `false` en caso contrario.
   */
  isLoggedIn() {
    return this.isLoggedInSubject.value;
  }

  /**
   * Obtiene el nombre de usuario actual.
   * @returns El nombre de usuario actual o `null` si no hay usuario.
   */
  getUsername(): string | null {
    return this.usernameSubject.value;
  }

  /**
   * Obtiene un valor del almacenamiento local.
   * @param key - La clave del valor a obtener.
   * @returns El valor almacenado o `null` si no se encuentra.
   */
  private getFromLocalStorage(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Establece un valor en el almacenamiento local.
   * @param key - La clave del valor a almacenar.
   * @param value - El valor a almacenar.
   */
  private setToLocalStorage(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  /**
   * Elimina un valor del almacenamiento local.
   * @param key - La clave del valor a eliminar.
   */
  private removeFromLocalStorage(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}
