import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
    productForm: FormGroup;
    isEditMode = false;
    productId: number | null = null;
    loading = false;
    error: string | null = null;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.productForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0.01)]]
        });
    }

    // Getter for easy access to form fields
    get f() { return this.productForm.controls; }

    ngOnInit(): void {
        // Check if we're in edit mode
        const id = this.route.snapshot.paramMap.get('id');
        if (id && id !== 'new') {
            this.isEditMode = true;
            this.productId = +id;
            this.loadProduct();
        }
    }

    loadProduct(): void {
        if (!this.productId) return;

        this.loading = true;
        this.productService.getProductById(this.productId).subscribe({
            next: (product) => {
                this.productForm.patchValue({
                    name: product.name,
                    description: product.description,
                    price: product.price
                });
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error al Cargar Producto: ' + (err.message || 'Error Desconocido');
                this.loading = false;
                console.error('Error al Cargar Producto:', err);
            }
        });
    }

    onSubmit(): void {
        this.submitted = true;

        // Stop here if form is invalid
        if (this.productForm.invalid) {
            return;
        }

        const product: Product = {
            name: this.f.name.value,
            description: this.f.description.value,
            price: this.f.price.value
        };

        this.loading = true;

        if (this.isEditMode && this.productId) {
            this.productService.updateProduct(this.productId, product).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (err) => {
                    this.error = 'Error updating product: ' + (err.message || 'Unknown error');
                    this.loading = false;
                    console.error('Error updating product', err);
                }
            });
        } else {
            this.productService.createProduct(product).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (err) => {
                    this.error = 'Error creating product: ' + (err.message || 'Unknown error');
                    this.loading = false;
                    console.error('Error creating product', err);
                }
            });
        }
    }
}