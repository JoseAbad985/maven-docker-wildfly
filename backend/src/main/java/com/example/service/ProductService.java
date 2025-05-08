package com.example.service;

import com.example.model.Product;
import com.example.repository.ProductRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class ProductService {

    @Inject
    private ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

    public Product findById(Long id) {
        return repository.findById(id);
    }

    @Transactional
    public Product create(Product product) {
        return repository.create(product);
    }

    @Transactional
    public Product update(Long id, Product product) {
        return repository.update(id, product);
    }

    @Transactional
    public void delete(Long id) {
        repository.delete(id);
    }
}