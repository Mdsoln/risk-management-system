package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.dto.CategoryDTO;
import tz.go.psssf.risk.entity.Category;

@Mapper
@ApplicationScoped
public interface CategoryMapper {
	
//    CategoryDTO toDTO(Category category);
//    Category toEntity(CategoryDTO categoryDTO);
	
	CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    @Mapping(target = "id", ignore = true) // Ignore id mapping when converting to entity
    Category toEntity(CategoryDTO categoryDTO);

    CategoryDTO toDTO(Category category);
}
