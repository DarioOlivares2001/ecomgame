import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

/**
 * Interfaz que representa un producto.
 */
interface Product {
  id: number;
  nombre: string;
  precio: number;
  image: string;
}

/**
 * Servicio para manejar las operaciones relacionadas con productos.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  /**
   * Ruta local del archivo JSON de productos.
   */
  private jsonFilePath = 'assets/productos.json'; // Ruta local del archivo JSON

  /**
   * Opciones HTTP para las solicitudes.
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Lista de productos.
   */
  private products: Product[] = [];

  /**
   * Sujeto para la lista de productos.
   */
  private productsSubject = new BehaviorSubject<Product[]>(this.products);
  products$ = this.productsSubject.asObservable();

  /**
   * Constructor del servicio de productos.
   * @param http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    this.loadProducts();
  }

  /**
   * Carga los productos desde el archivo JSON local.
   */
  private loadProducts() {
    this.http.get<Product[]>(this.jsonFilePath).subscribe(data => {
      this.products = data;
      this.productsSubject.next(this.products);
    });
  }

  /**
   * Obtiene la lista de productos.
   * @returns Lista de productos.
   */
  getProducts(): Product[] {
    return this.products;
  }

  /**
   * Añade un nuevo producto.
   * @param product - El producto a añadir.
   */
  addProduct(product: Product) {
    // Simula la adición de un nuevo producto al archivo local
    this.products.push(product);
    this.productsSubject.next(this.products);
    console.log('Producto agregado con éxito');
  }

  /**
   * Actualiza un producto existente.
   * @param product - El producto a actualizar.
   */
  updateProduct(product: Product) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.productsSubject.next(this.products);
      console.log('Producto actualizado con éxito');
    }
  }

  /**
   * Elimina un producto.
   * @param productId - El ID del producto a eliminar.
   */
  deleteProduct(productId: number) {
    this.products = this.products.filter(p => p.id !== productId);
    this.productsSubject.next(this.products);
    console.log('Producto eliminado con éxito');
  }
}
