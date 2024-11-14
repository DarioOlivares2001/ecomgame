import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from './register.component';
import { UserService } from '../../../services/user.service';
import { of } from 'rxjs';

class MockUserService {
  addUser(user: any) {
    return of(user);
  }
}

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, RegisterComponent],
      providers: [
        { provide: UserService, useClass: MockUserService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener un formulario con 6 controles', () => {
    expect(component.registerForm.contains('username')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('confirmPassword')).toBeTruthy();
    expect(component.registerForm.contains('birthdate')).toBeTruthy();
    expect(component.registerForm.contains('address')).toBeTruthy();
  });

  it('debería hacer que el control de nombre de usuario sea obligatorio', () => {
    const control = component.registerForm.get('username');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('debería validar el control de correo electrónico', () => {
    const control = component.registerForm.get('email');
    control?.setValue('noesuncorreo');
    expect(control?.valid).toBeFalsy();
    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('debería validar que las contraseñas coincidan', () => {
    const control = component.registerForm;
    control.get('password')?.setValue('Password1');
    control.get('confirmPassword')?.setValue('Password2');
    expect(control.hasError('passwordMismatch')).toBeTruthy();
  });

  it('no debería llamar a userService.addUser cuando el formulario es inválido', () => {
    spyOn(userService, 'addUser').and.callThrough();
    component.registerForm.setValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      birthdate: '',
      address: ''
    });
    component.onSubmit();
    expect(userService.addUser).not.toHaveBeenCalled();
  });
});
