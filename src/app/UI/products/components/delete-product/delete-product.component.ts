import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DeleteProductUseCase } from '../../../../products/application/delete-product-use-case';
import Swal from 'sweetalert2';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogActions } from '@angular/material/dialog';
import { MatDialogClose } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';


@Component({
  selector: 'app-delete-product',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    
  ],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss'
})
export class DeleteProductComponent {
  constructor(
    private deleteProductUseCase: DeleteProductUseCase,
    public dialogRef: MatDialogRef<DeleteProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {}

  confirmDelete(): void {
    this.deleteProductUseCase.execute(this.data.id).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Producto Eliminado',
          text: `El producto con ID ${this.data.id} ha sido eliminado con éxito.`,
          timer: 2000,
          showConfirmButton: false
        });
        this.dialogRef.close(true);
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el producto. Inténtalo de nuevo.',
        });
        console.error('Error al eliminar producto:', error);
        this.dialogRef.close(false);
      }
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
