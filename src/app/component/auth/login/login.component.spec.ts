import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { LoginComponent } from './login.component';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { of } from 'rxjs';

class MockAuthService {
  loginAsAdmin() {}
  loginAsUser(username: string) {}
}

class MockUserService {
  validateUser(email: string, password: string) {
    return email === 'test@test.com' && password === 'password';
  }
  getUserByEmail(email: string) {
    return { username: 'Test User' };
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterTestingModule,
        RouterLink,
        LoginComponent // Importa el componente autónomo aquí
      ],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario válido cuando todos los campos están llenos correctamente', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('debería mostrar un mensaje de error por un correo electrónico inválido', () => {
    component.loginForm.setValue({ email: 'invalid-email', password: 'password' });
    component.onSubmit();
    expect(component.errorMessage).toBe('Por favor, complete todos los campos correctamente.');
  });

  it('debería mostrar un mensaje de error por credenciales inválidas', () => {
    component.loginForm.setValue({ email: 'wrong@test.com', password: 'wrongpassword' });
    component.onSubmit();
    expect(component.errorMessage).toBe('Correo electrónico o contraseña inválidos');
  });



  it('debería iniciar sesión como usuario regular y navegar a inicio-component', () => {
    spyOn(authService, 'loginAsUser');
    spyOn(router, 'navigate').and.stub();

    component.loginForm.setValue({ email: 'test@test.com', password: 'password' });
    component.onSubmit();

    expect(authService.loginAsUser).toHaveBeenCalledWith('Test User');
    expect(router.navigate).toHaveBeenCalledWith(['inicio-component']);
  });
});
