import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  productForm: FormGroup;
  @Input() currentProduct: Product | null = null;
  @Input() formType: 'CREATE' | 'UPDATE' = 'CREATE';
  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();

  private productService = inject(ProductService);

  constructor(private fb: FormBuilder){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      timeStored: [''],
      bestBeforeDate: ['', Validators.required],
      id: [0]
    });
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes["currentProduct"] && changes["currentProduct"].currentValue){
      const product = changes["currentProduct"].currentValue as Product;

      const bestBeforeDateFormatted = product.bestBeforeDate ? new Date(product.bestBeforeDate).toISOString().split('T')[0] : '';

      this.productForm.patchValue({
        ...product,
        bestBeforeDate: bestBeforeDateFormatted
      })
    }
  }

  handleSubmit(){
    if(this.productForm.valid){
      const newProduct = {
        ...this.productForm.value,
        bestBeforeDate: new Date(this.productForm.value.bestBeforeDate),
        expired: this.formType === "UPDATE" ? this.productForm.value.expired: false,
        id: this.formType === "UPDATE" ? this.productForm.value.id: null
      };

      if(this.formType === "CREATE"){
        this.productService.addProduct(newProduct).subscribe(() => {
          this.closePanel.emit('SUBMIT');
        });
      } else {
        this.productService.updateProduct(newProduct).subscribe(() => {
          this.closePanel.emit('SUBMIT');
        });
      }   
    }
  }

  handleCancel(){
    this.closePanel.emit('CANCEL');
  }
}

