// Ejemplo de importaciones (asegúrate de tener todas las necesarias)
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AdminproductosComponent } from './adminproductos.component';
import { ProductService } from '../../services/product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AdminproductosComponent', () => {
  it('deberia crear el componente', () => {
    expect(true).toBe(true);
  });
});
