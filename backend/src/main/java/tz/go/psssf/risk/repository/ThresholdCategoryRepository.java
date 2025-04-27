package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.ThresholdCategory;

import java.util.Optional;

@ApplicationScoped
public class ThresholdCategoryRepository implements PanacheRepositoryBase<ThresholdCategory, String> {

    /**
     * Finds a ThresholdCategory by its code.
     *
     * @param code The code of the ThresholdCategory.
     * @return An Optional containing the ThresholdCategory if found, otherwise empty.
     */
    public Optional<ThresholdCategory> findByCode(String code) {
        return find("code", code).firstResultOptional();
    }
}
