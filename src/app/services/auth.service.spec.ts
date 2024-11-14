import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

class MockRouter {
  navigate(path: string[]) {}
}

describe('AuthService', () => {
  let service: AuthService;
  let router: MockRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as unknown as MockRouter;
    spyOn(router, 'navigate');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería iniciar sesión como administrador', () => {
    service.loginAsAdmin();
    expect(service.isAdmin()).toBe(true);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getUsername()).toBe('Admin User');
    expect(localStorage.getItem('isAdmin')).toBe('true');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('username')).toBe('Admin User');
    expect(router.navigate).toHaveBeenCalledWith(['adminproductos-component']);
  });

  it('debería iniciar sesión como usuario', () => {
    service.loginAsUser('Regular User');
    expect(service.isAdmin()).toBe(false);
    expect(service.isLoggedIn()).toBe(true);
    expect(service.getUsername()).toBe('Regular User');
    expect(localStorage.getItem('isAdmin')).toBe('false');
    expect(localStorage.getItem('isLoggedIn')).toBe('true');
    expect(localStorage.getItem('username')).toBe('Regular User');
  });

  it('debería cerrar sesión', () => {
    service.loginAsAdmin();
    service.logout();
    expect(service.isAdmin()).toBe(false);
    expect(service.isLoggedIn()).toBe(false);
    expect(service.getUsername()).toBeNull();
    expect(localStorage.getItem('isAdmin')).toBeNull();
    expect(localStorage.getItem('isLoggedIn')).toBeNull();
    expect(localStorage.getItem('username')).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['inicio-component']);
  });

  it('debería devolver el estado de administrador correcto', () => {
    expect(service.isAdmin()).toBe(false);
    service.loginAsAdmin();
    expect(service.isAdmin()).toBe(true);
  });

  it('debería devolver el estado de inicio de sesión correcto', () => {
    expect(service.isLoggedIn()).toBe(false);
    service.loginAsUser('Regular User');
    expect(service.isLoggedIn()).toBe(true);
  });

  it('debería devolver el nombre de usuario correcto', () => {
    expect(service.getUsername()).toBeNull();
    service.loginAsUser('Regular User');
    expect(service.getUsername()).toBe('Regular User');
  });
});
