import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  birthdate: string;
  address?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonFilePath = 'assets/users.json'; // Ruta local del archivo JSON
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>(this.users);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  // Cargar los usuarios desde el archivo JSON
  private loadUsers() {
    this.http.get<User[]>(this.jsonFilePath).subscribe(data => {
      this.users = data;
      this.usersSubject.next(this.users);
    });
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    // Simula la adición de un nuevo usuario al archivo local
    this.users.push(user);
    this.usersSubject.next(this.users);
    console.log('Usuario agregado con éxito');
  }

  updateUser(user: User) {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.usersSubject.next(this.users);
      console.log('Usuario actualizado con éxito');
    }
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(u => u.id !== userId);
    this.usersSubject.next(this.users);
    console.log('Usuario eliminado con éxito');
  }

  getUserByUsername(username: string): Observable<User | undefined> {
    return new Observable((observer) => {
      const user = this.users.find(user => user.username === username);
      observer.next(user);
      observer.complete();
    });
  }

  validateUser(email: string, password: string): boolean {
    const user = this.users.find(user => user.email === email && user.password === password);
    return !!user;
  }

  getUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
}
