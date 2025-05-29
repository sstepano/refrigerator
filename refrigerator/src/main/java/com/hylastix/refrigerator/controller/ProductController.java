package com.hylastix.refrigerator.controller;

import com.hylastix.refrigerator.error.FieldErrorMessage;
import com.hylastix.refrigerator.model.Product;
import com.hylastix.refrigerator.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts(){
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id){
        Optional<Product> product = productService.getProductById(id);
        if(product.isPresent()){
            return ResponseEntity.ok(product.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody Product product){
        long id = product.getId();
        if(id == 0) {
            product.setExpired(product.getBestBeforeDate().isBefore(LocalDate.now()));
            return new ResponseEntity(productService.saveProduct(product), HttpStatus.CREATED);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @Valid @RequestBody Product product){
        if(id != product.getId()) return ResponseEntity.badRequest().build();
        Optional<Product> productOptional = productService.getProductById(id);
        if(productOptional.isPresent()){
            Product updatedProduct = productOptional.get();
            updatedProduct.setName(product.getName());
            updatedProduct.setTimeStored(product.getTimeStored());
            updatedProduct.setBestBeforeDate(product.getBestBeforeDate());
            updatedProduct.setExpired(product.getBestBeforeDate().isBefore(LocalDate.now()));
            return ResponseEntity.ok(productService.saveProduct(updatedProduct));
        } else {
            return  ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable long id){
        Optional<Product> productOptional = productService.getProductById(id);
        if(productOptional.isPresent()) {
            productService.deleteProductById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Void> removeAllProducts() {
        productService.deleteAllProducts();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/expired")
    List<Product> findByExpired(@RequestParam(value="expired", required=false, defaultValue = "true") boolean expired){
        return productService.findByExpired(expired);
    }

    @GetMapping("/name")
    List<Product> findByName(@RequestParam(value="name", required=true) String name){
        return productService.findByName(name);
    }

    @GetMapping("/paginating")
    Page<Product> getAllProductsPage(@RequestParam(value="pageSize", defaultValue="3") int pageSize, @RequestParam(value="page", defaultValue="0") int page, @RequestParam(value="sortBy", defaultValue="bestBeforeDate") String sortBy){
        Sort sort = Sort.by(sortBy);
        Pageable pageable = PageRequest.of(page, pageSize, sort);
        return productService.getAllProductsPage(pageable);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    List<FieldErrorMessage> exceptionHandler(MethodArgumentNotValidException e){
       List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
       List<FieldErrorMessage> fieldErrorMessages = fieldErrors.stream().map(fieldError -> new FieldErrorMessage(fieldError.getField(), fieldError.getDefaultMessage())).collect(Collectors.toList());
       return fieldErrorMessages;
    }
}
