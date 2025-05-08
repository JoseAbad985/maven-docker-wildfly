package com.example.repository;

import com.example.model.Product;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import java.util.List;

@ApplicationScoped
@Transactional
public class ProductRepository {

    @PersistenceContext
    private EntityManager em;

    public List<Product> findAll() {
        return em.createQuery("SELECT p FROM Product p", Product.class)
                .getResultList();
    }

    public Product findById(Long id) {
        return em.find(Product.class, id);
    }

    @Transactional
    public Product create(Product product) {
        em.persist(product);
        em.flush(); // Ensure the entity is immediately written to the database
        return product;
    }

    @Transactional
    public Product update(Long id, Product product) {
        Product existing = em.find(Product.class, id);
        if (existing == null) {
            throw new IllegalArgumentException("Product with id " + id + " not found");
        }
        product.setId(id);
        return em.merge(product);
    }

    @Transactional
    public void delete(Long id) {
        Product p = em.find(Product.class, id);
        if (p != null) {
            em.remove(p);
        }
    }
}