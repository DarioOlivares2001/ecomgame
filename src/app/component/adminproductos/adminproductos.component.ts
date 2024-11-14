import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';

interface Product {
  id: number;
  nombre: string;
  precio: number;
  image: string;
}

declare var bootstrap: any;

/**
 * Componente para la administración de productos.
 */
@Component({
  selector: 'app-adminproductos',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './adminproductos.component.html',
  styleUrls: ['./adminproductos.component.css']
})
export class AdminproductosComponent implements OnInit {
  /**
   * Referencia al modal del formulario de producto.
   */
  @ViewChild('productFormModal') productFormModal!: ElementRef;

  /**
   * Formulario reactivo para la gestión de productos.
   */
  productForm: FormGroup;

  /**
   * Indica si se está editando un producto existente.
   */
  isEdit = false;

  /**
   * Índice del producto actualmente seleccionado para edición.
   */
  currentIndex: number | null = null;

  /**
   * Fuente de la imagen del producto.
   */
  imageSrc: string | null = null;

  /**
   * Producto actualmente seleccionado para visualización.
   */
  selectedProduct: Product | null = null;

  /**
   * Lista de productos.
   */
  products: Product[] = [];

  /**
   * Constructor del componente.
   * @param fb - FormBuilder para crear el formulario.
   * @param productService - Servicio de productos para manejar operaciones relacionadas con productos.
   * @param platformId - Identificador de la plataforma para detección de plataforma.
   */
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  /**
   * Método de inicialización.
   */
  ngOnInit() {
    this.productService.products$.subscribe(products => this.products = products);
  }

  /**
   * Prepara el formulario para agregar un nuevo producto.
   */
  newProduct() {
    this.isEdit = false;
    this.productForm.reset();
    this.imageSrc = null;
  }

  /**
   * Prepara el formulario para editar un producto existente.
   * @param productId - ID del producto a editar.
   */
  editProduct(productId: number) {
    this.isEdit = true;
    const product = this.products.find(p => p.id === productId);
    if (product) {
      this.currentIndex = productId;
      this.productForm.patchValue(product);
      this.imageSrc = product.image;
    }
  }

  /**
   * Elimina un producto.
   * @param productId - ID del producto a eliminar.
   */
  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
  }

  /**
   * Guarda el producto, ya sea agregando uno nuevo o actualizando uno existente.
   */
  saveProduct() {
    const newProduct: Product = {
      id: this.isEdit && this.currentIndex !== null ? this.currentIndex : 0,
      nombre: this.productForm.value.nombre,
      precio: this.productForm.value.precio,
      image: this.imageSrc || 'assets/images/Profile Icon.webp'
    };

    if (this.isEdit && this.currentIndex !== null) {
      newProduct.id = this.currentIndex;
      this.productService.updateProduct(newProduct);
    } else {
      this.productService.addProduct(newProduct);
    }

    this.productForm.reset();
    this.imageSrc = null;

    if (isPlatformBrowser(this.platformId) && this.productFormModal) {
      const modalInstance = bootstrap.Modal.getInstance(this.productFormModal.nativeElement);
      if (modalInstance) {
        modalInstance.hide();
      } else {
        const newModalInstance = new bootstrap.Modal(this.productFormModal.nativeElement);
        newModalInstance.hide();
      }
    }
  }

  /**
   * Maneja el cambio de archivo de imagen del producto.
   * @param event - Evento de cambio de archivo.
   */
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const fileName = file.name;
      this.imageSrc = `assets/images/${fileName}`;
    }
  }

  /**
   * Visualiza los detalles de un producto seleccionado.
   * @param product - Producto a visualizar.
   */
  viewProduct(product: Product) {
    this.selectedProduct = product;
  }
}
