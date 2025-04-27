package tz.go.psssf.risk.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import tz.go.psssf.risk.dto.SubCategoryDTO;
import tz.go.psssf.risk.entity.SubCategory;

@Mapper
public interface SubCategoryMapper {
    SubCategoryMapper INSTANCE = Mappers.getMapper(SubCategoryMapper.class);

    SubCategoryDTO toDTO(SubCategory subCategory);
    SubCategory toEntity(SubCategoryDTO subCategoryDTO);
}
