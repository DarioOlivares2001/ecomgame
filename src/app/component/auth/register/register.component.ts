import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router, RouterLink } from '@angular/router';

/**
 * Componente para el registro de usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * Formulario de registro.
   */
  registerForm: FormGroup;

  /**
   * Indicador de éxito de registro.
   */
  registrationSuccess = false;

  /**
   * Constructor del componente.
   *
   * @param fb - FormBuilder para crear el formulario.
   * @param userService - Servicio de usuarios para manejar operaciones relacionadas con usuarios.
   * @param router - Router para la navegación.
   */
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['']
    }, { validators: [this.passwordMatchValidator, this.ageValidator] });
  }

  /**
   * Método de inicialización.
   */
  ngOnInit(): void {}

  /**
   * Maneja el envío del formulario.
   */
  onSubmit() {
    if (this.registerForm.valid) {
      const { username, email, password, birthdate, address } = this.registerForm.value;
      const user = {
        id: Date.now(),
        username,
        email,
        password,
        address,
        birthdate
      };

      this.userService.addUser(user);
      console.log('User registered successfully:', user);

      this.registrationSuccess = true;
      setTimeout(() => {
        this.router.navigate(['/login-component']);
      }, 2000);
    } else {
      console.error('Formulario inválido');
    }
  }

  /**
   * Validador para verificar que las contraseñas coincidan.
   *
   * @param control - AbstractControl del formulario.
   * @returns ValidationErrors o null.
   */
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword ? { passwordMismatch: true } : null;
  }

  /**
   * Validador para verificar la edad del usuario.
   *
   * @param control - AbstractControl del formulario.
   * @returns ValidationErrors o null.
   */
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const birthdate = control.get('birthdate')?.value;
    if (!birthdate) {
      return null;
    }
    const age = this.calculateAge(new Date(birthdate));

    return age < 13 ? { ageRequirement: true } : null;
  }

  /**
   * Calcula la edad a partir de una fecha de nacimiento.
   *
   * @param birthdate - Fecha de nacimiento.
   * @returns Edad calculada.
   */
  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }

    return age;
  }

  /**
   * Reinicia el formulario.
   */
  resetForm() {
    this.registerForm.reset();
  }
}
