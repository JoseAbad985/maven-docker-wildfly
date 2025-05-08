import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    loading = false;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        const id = this.route.snapshot.paramMap.get('id');

        if (id) {
            this.productService.getProductById(+id).subscribe({
                next: (data) => {
                    this.product = data;
                    this.loading = false;
                },
                error: (err) => {
                    this.error = 'Error loading product: ' + (err.message || 'Unknown error');
                    this.loading = false;
                    console.error('Error loading product', err);
                }
            });
        } else {
            this.error = 'Product ID not provided';
            this.loading = false;
        }
    }

    editProduct(): void {
        if (this.product && this.product.id) {
            this.router.navigate(['/products/edit', this.product.id]);
        }
    }

    goToList(): void {
        this.router.navigate(['/products']);
    }

    deleteProduct(): void {
        if (!this.product || !this.product.id) return;

        if (confirm('Are you sure you want to delete this product?')) {
            this.productService.deleteProduct(this.product.id).subscribe({
                next: () => {
                    this.router.navigate(['/products']);
                },
                error: (err) => {
                    this.error = 'Error deleting product: ' + (err.message || 'Unknown error');
                    console.error('Error deleting product', err);
                }
            });
        }
    }
}