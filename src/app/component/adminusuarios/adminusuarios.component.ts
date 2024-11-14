import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  address?: string;
}

declare var bootstrap: any;

/**
 * Componente para la administración de usuarios.
 */
@Component({
  selector: 'app-adminusuarios',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adminusuarios.component.html',
  styleUrls: ['./adminusuarios.component.css']
})
export class AdminusuariosComponent implements OnInit {
  /**
   * Referencia al modal del formulario de usuario.
   */
  @ViewChild('userFormModal') userFormModal!: ElementRef;

  /**
   * Formulario reactivo para la gestión de usuarios.
   */
  userForm: FormGroup;

  /**
   * Indica si se está editando un usuario existente.
   */
  isEdit = false;

  /**
   * Índice del usuario actualmente seleccionado para edición.
   */
  currentIndex: number | null = null;

  /**
   * Usuario actualmente seleccionado para visualización.
   */
  selectedUser: User | null = null;

  /**
   * Lista de usuarios.
   */
  users: User[] = [];

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear el formulario.
   * @param userService - Servicio de usuarios para manejar operaciones relacionadas con usuarios.
   * @param platformId - Identificador de la plataforma para detección de plataforma.
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthdate: ['', Validators.required],
      address: ['']
    });
  }

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.userService.users$.subscribe(users => this.users = users);
  }

  /**
   * Prepara el formulario para agregar un nuevo usuario.
   */
  newUser() {
    this.isEdit = false;
    this.userForm.reset();
  }

  /**
   * Prepara el formulario para editar un usuario existente.
   * @param index - Índice del usuario a editar.
   */
  editUser(index: number) {
    this.isEdit = true;
    this.currentIndex = index;
    const user = this.users[index];
    this.userForm.patchValue(user);
  }

  /**
   * Elimina un usuario.
   * @param index - Índice del usuario a eliminar.
   */
  deleteUser(index: number) {
    const userId = this.users[index].id;
    this.userService.deleteUser(userId);
  }

  /**
   * Guarda el usuario, ya sea agregando uno nuevo o actualizando uno existente.
   */
  saveUser() {
    const newUser: User = {
      id: this.isEdit && this.currentIndex !== null ? this.users[this.currentIndex].id : this.users.length + 1,
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      birthdate: this.userForm.value.birthdate,
      address: this.userForm.value.address
    };

    if (this.isEdit && this.currentIndex !== null) {
      newUser.id = this.users[this.currentIndex].id;
      this.userService.updateUser(newUser);
    } else {
      this.userService.addUser(newUser);
    }

    console.log('Nuevo usuario agregado:', newUser);

    this.userForm.reset();

    if (isPlatformBrowser(this.platformId) && this.userFormModal) {
      const modalInstance = bootstrap.Modal.getInstance(this.userFormModal.nativeElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const newModalInstance = new bootstrap.Modal(this.userFormModal.nativeElement);
        newModalInstance.hide();
      }
    }
  }

  /**
   * Visualiza los detalles de un usuario seleccionado.
   * @param user - Usuario a visualizar.
   */
  viewUser(user: User) {
    this.selectedUser = user;
  }
}
