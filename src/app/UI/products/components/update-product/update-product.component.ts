import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateProductUseCase } from '../../../../products/application/update-product-use-case';
import { Product } from '../../../../products/domain/models/product';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';



import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule,MatDialogActions,MatDialogContent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {
  productToUpdate: Product;

  constructor(
    private updateProductUseCase: UpdateProductUseCase,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {
    this.productToUpdate = { ...data }; // Clonar datos para evitar cambios directos
  }

  updateProduct(): void {
    if (!this.productToUpdate.Id) {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Debe ingresar un ID válido.',
        confirmButtonColor: '#FF6F61'
      });
      return;
    }

    this.updateProductUseCase.execute(this.productToUpdate).subscribe({
      next: (updated) => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Actualizado',
          text: `El producto ha sido actualizado con éxito.`,
          confirmButtonColor: '#FF6F61'
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Error al actualizar producto:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo actualizar el producto.',
          confirmButtonColor: '#FF6F61'
        });
      }
    });
  }
  cancel(): void {
    this.dialogRef.close(false);
  }
}
