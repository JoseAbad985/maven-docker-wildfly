import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    loading = false;
    error: string | null = null;

    constructor(
        private productService: ProductService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.loadProducts();
    }

    loadProducts(): void {
        this.loading = true;
        this.productService.getAllProducts().subscribe({
            next: (data) => {
                this.products = data;
                this.loading = false;
            },
            error: (err) => {
                this.error = 'Error loading products: ' + (err.message || 'Unknown error');
                this.loading = false;
                console.error('Error loading products', err);
            }
        });
    }

    deleteProduct(id: number): void {
        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(id).subscribe({
                next: () => {
                    this.products = this.products.filter(p => p.id !== id);
                },
                error: (err) => {
                    this.error = 'Error deleting product: ' + (err.message || 'Unknown error');
                    console.error('Error deleting product', err);
                }
            });
        }
    }

    editProduct(id: number): void {
        this.router.navigate(['/products/edit', id]);
    }

    viewProduct(id: number): void {
        this.router.navigate(['/products', id]);
    }
}