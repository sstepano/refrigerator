package com.hylastix.refrigerator.repository;

import com.hylastix.refrigerator.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findByExpired(boolean expired);
    List<Product> findByName(String name);
}
