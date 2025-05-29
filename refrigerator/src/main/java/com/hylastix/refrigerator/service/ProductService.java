package com.hylastix.refrigerator.service;

import com.hylastix.refrigerator.model.Product;
import com.hylastix.refrigerator.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(long id){
        return productRepository.findById(id);
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public void deleteProductById(long id){
        productRepository.deleteById(id);
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    public List<Product> findByExpired(boolean expired) {
        return productRepository.findByExpired(expired);
    }

    public List<Product> findByName(String name) {
        return productRepository.findByName(name);
    }

    public Page<Product> getAllProductsPage(Pageable pageable){
        return productRepository.findAll(pageable);
    }
}
