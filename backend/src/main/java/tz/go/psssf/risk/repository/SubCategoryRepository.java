package tz.go.psssf.risk.repository;


import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.SubCategory;

@ApplicationScoped
public class SubCategoryRepository implements PanacheRepositoryBase<SubCategory, String> {
}