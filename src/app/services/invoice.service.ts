import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Interfaz que representa una factura.
 */
interface Invoice {
  id?: number;
  orderNumber: number;
  invoiceNumber: number;
  items: any[];
  total: number;
  userInfo: {
    nombre: string;
    email: string;
    direccion: string;
  };
  date: string;
}

/**
 * Servicio para manejar las operaciones relacionadas con facturas.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  /**
   * URL de la API.
   */
  private apiUrl = 'https://api-jogo-qucx.onrender.com';

  /**
   * Opciones HTTP para las solicitudes.
   */
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Lista de facturas.
   */
  private invoices: Invoice[] = [];

  /**
   * Sujeto para la lista de facturas.
   */
  private invoicesSubject = new BehaviorSubject<Invoice[]>(this.invoices);
  invoices$ = this.invoicesSubject.asObservable();

  /**
   * Constructor del servicio de facturas.
   * @param http - Cliente HTTP para realizar solicitudes.
   */
  constructor(private http: HttpClient) {
    this.loadInvoices();
  }

  /**
   * Carga las facturas desde la API.
   */
  private loadInvoices() {
    this.http.get<Invoice[]>(`${this.apiUrl}/invoices`).subscribe(data => {
      this.invoices = data;
      this.invoicesSubject.next(this.invoices);
    });
  }

  /**
   * Obtiene la lista de facturas.
   * @returns Lista de facturas.
   */
  getInvoices(): Invoice[] {
    return this.invoices;
  }

  /**
   * Añade una nueva factura.
   * @param invoice - La factura a añadir.
   */
  addInvoice(invoice: Invoice) {
    this.http.post<Invoice>(`${this.apiUrl}/invoices`, invoice, this.httpOptions).subscribe({
      next: (response) => {
        this.invoices.push(response);
        this.invoicesSubject.next(this.invoices);
        console.log('Factura agregada con éxito');
      },
      error: (error) => {
        console.error('Error al agregar factura', error);
      }
    });
  }

  /**
   * Actualiza una factura existente.
   * @param invoice - La factura a actualizar.
   */
  updateInvoice(invoice: Invoice) {
    this.http.put(`${this.apiUrl}/invoices/${invoice.id}`, invoice, this.httpOptions).subscribe({
      next: () => {
        const index = this.invoices.findIndex(i => i.id === invoice.id);
        if (index !== -1) {
          this.invoices[index] = invoice;
          this.invoicesSubject.next(this.invoices);
        }
        console.log('Factura actualizada con éxito');
      },
      error: (error) => {
        console.error('Error al actualizar factura', error);
      }
    });
  }

  /**
   * Elimina una factura.
   * @param invoiceId - El ID de la factura a eliminar.
   */
  deleteInvoice(invoiceId: number) {
    const url = `${this.apiUrl}/invoices/${invoiceId}`;
    this.http.delete(url, this.httpOptions).subscribe({
      next: () => {
        this.invoices = this.invoices.filter(i => i.id !== invoiceId);
        this.invoicesSubject.next(this.invoices);
        console.log('Factura eliminada con éxito');
      },
      error: (error) => {
        console.error('Error al eliminar la factura', error);
      }
    });
  }

  /**
   * Obtiene una factura por su ID.
   * @param invoiceId - El ID de la factura a obtener.
   * @returns Un observable con la factura correspondiente.
   */
  getInvoiceById(invoiceId: number): Observable<Invoice | undefined> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/invoices`).pipe(
      map(invoices => invoices.find(invoice => invoice.id === invoiceId))
    );
  }
}
