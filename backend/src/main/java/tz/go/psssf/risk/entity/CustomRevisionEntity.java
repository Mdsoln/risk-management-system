package tz.go.psssf.risk.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import org.hibernate.envers.DefaultRevisionEntity;
import org.hibernate.envers.RevisionEntity;

/**
 * Custom revision entity that extends DefaultRevisionEntity.
 * This class is created to fix the Hibernate Envers error:
 * "HHH015007: Illegal argument on static metamodel field injection : org.hibernate.envers.DefaultRevisionEntity_#class_; 
 * expected type : org.hibernate.metamodel.model.domain.internal.EntityTypeImpl; 
 * encountered type : jakarta.persistence.metamodel.MappedSuperclassType"
 */
@Entity
@Table(name = "revinfo")
@RevisionEntity
public class CustomRevisionEntity extends DefaultRevisionEntity {
    // No additional fields or methods needed
    // This class exists solely to provide the @Entity annotation
    // to fix the Hibernate Envers metamodel generation issue
}