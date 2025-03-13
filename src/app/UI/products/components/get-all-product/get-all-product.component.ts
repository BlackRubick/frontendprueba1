import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UpdateProductComponent } from '../update-product/update-product.component';
import { DeleteProductComponent } from '../delete-product/delete-product.component';

import { Product } from '../../../../products/domain/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { GetAllProductsUseCase } from '../../../../products/application/get-all-product-use-case';
@Component({
  selector: 'app-get-all-product',
  standalone: true,
  imports: [MatTableModule, MatDialogModule],
  templateUrl: './get-all-product.component.html',
  styleUrls: ['./get-all-product.component.scss']
})
export class GetAllProductComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource = new MatTableDataSource<Product>();

  constructor(private dialog: MatDialog, private GetProdutUseCase: GetAllProductsUseCase) {}

  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts(): void {
    this.GetProdutUseCase.execute().subscribe({
      next: (response: any) => {
        console.log('Productos cargados:', response);
        // Si los datos vienen dentro de una propiedad tickets
        this.dataSource.data = response.tickets || [];
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }



  // Abrir diálogo para eliminar un producto
  openDialogDelete(productId: number): void {
    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: { id: productId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      } else {
        console.log('Eliminación cancelada o fallida');
      }
    });
  }

  // Abrir diálogo para actualizar un producto
  openDialog(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      data: {
        id: product.Id,
        name: product.Name,
        price: product.Price
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProducts();
      } else {
        console.log('Actualización cancelada o fallida');
      }
    });
  }

  // Método para actualizar un producto
  updateElement(element: Product): void {
    console.log("Actualizar producto:", element);
    this.openDialog(element);
  }

  // Método para eliminar un producto
  deleteElement(productId: number): void {
    this.openDialogDelete(productId);
    console.log("Eliminar producto con ID:", productId);
  }
}
