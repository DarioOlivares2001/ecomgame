import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

/**
 * Componente para restablecer la contraseña del usuario.
 */
@Component({
  selector: 'app-passwordreset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  /**
   * Formulario de restablecimiento de contraseña.
   */
  passwordResetForm!: FormGroup;

  /**
   * Indica si el email de restablecimiento de contraseña ha sido enviado.
   */
  emailSent = false;

  /**
   * Indica si el usuario no fue encontrado.
   */
  userNotFound = false;

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear el formulario de restablecimiento de contraseña.
   */
  constructor(private fb: FormBuilder) {}

  /**
   * Método de inicialización.
   */
  ngOnInit(): void {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
   * Devuelve el control del campo email del formulario.
   */
  get email() {
    return this.passwordResetForm.get('email');
  }

  /**
   * Maneja el envío del formulario de restablecimiento de contraseña.
   */
  onSubmit(): void {
    this.userNotFound = false;
    this.emailSent = false;

    if (this.passwordResetForm.valid) {
      const email = this.passwordResetForm.value.email;
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email);

      if (user) {
        console.log(`Enviar email a ${email} con la contraseña ${user.password}`);
        this.emailSent = true;
      } else {
        this.userNotFound = true;
      }
    }
  }
}
