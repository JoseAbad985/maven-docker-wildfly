package com.example.resource;

import com.example.model.Product;
import com.example.service.ProductService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Path("/products")
@ApplicationScoped
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductResource {

    private static final Logger LOGGER = Logger.getLogger(ProductResource.class.getName());

    @Inject
    private ProductService service;

    @GET
    public Response listAll() {
        try {
            LOGGER.info("Fetching all products");
            List<Product> products = service.findAll();
            return Response.ok(products).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting products", e);
            return Response.serverError()
                    .entity("Error getting products: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("{id}")
    public Response getOne(@PathParam("id") Long id) {
        try {
            LOGGER.info("Fetching product with ID: " + id);
            Product p = service.findById(id);
            return p != null
                    ? Response.ok(p).build()
                    : Response.status(Response.Status.NOT_FOUND).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting product with ID: " + id, e);
            return Response.serverError()
                    .entity("Error getting product: " + e.getMessage())
                    .build();
        }
    }

    @POST
    public Response create(Product product) {
        try {
            LOGGER.info("Creating product: " + product);
            Product created = service.create(product);
            LOGGER.info("Product created with ID: " + created.getId());
            return Response.status(Response.Status.CREATED)
                    .entity(created)
                    .build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error creating product", e);
            return Response.serverError()
                    .entity("Error creating product: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("{id}")
    public Response update(@PathParam("id") Long id, Product product) {
        try {
            LOGGER.info("Updating product with ID: " + id);
            Product updated = service.update(id, product);
            return Response.ok(updated).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error updating product with ID: " + id, e);
            return Response.serverError()
                    .entity("Error updating product: " + e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") Long id) {
        try {
            LOGGER.info("Deleting product with ID: " + id);
            service.delete(id);
            return Response.noContent().build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error deleting product with ID: " + id, e);
            return Response.serverError()
                    .entity("Error deleting product: " + e.getMessage())
                    .build();
        }
    }
}