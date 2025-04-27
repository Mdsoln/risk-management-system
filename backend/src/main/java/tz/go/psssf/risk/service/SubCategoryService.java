//package tz.go.psssf.risk.service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import io.quarkus.hibernate.orm.panache.PanacheQuery;
//import jakarta.enterprise.context.ApplicationScoped;
//import jakarta.inject.Inject;
//import jakarta.transaction.Transactional;
//import jakarta.ws.rs.WebApplicationException;
//import tz.go.psssf.risk.dto.SubCategoryDTO;
//import tz.go.psssf.risk.entity.SubCategory;
//import tz.go.psssf.risk.mapper.CategoryMapper;
//import tz.go.psssf.risk.mapper.SubCategoryMapper;
//import tz.go.psssf.risk.repository.SubCategoryRepository;
//
//
//@ApplicationScoped
//public class SubCategoryService {
//
//    @Inject
//    SubCategoryRepository subCategoryRepository;
//
//    public List<SubCategoryDTO> listAll() {
//        List<SubCategory> subCategories = subCategoryRepository.listAll();
//        return subCategories.stream().map(SubCategoryMapper.INSTANCE::toDTO).collect(Collectors.toList());
//    }
//
//    public SubCategoryDTO findById(Long id) {
//        SubCategory subCategory = subCategoryRepository.findById(id);
//        if (subCategory == null) {
//            throw new WebApplicationException("SubCategory not found", 404);
//        }
//        return SubCategoryMapper.INSTANCE.toDTO(subCategory);
//    }
//
//    @Transactional
//    public SubCategoryDTO create(SubCategoryDTO subCategoryDTO) {
//        SubCategory subCategory = SubCategoryMapper.INSTANCE.toEntity(subCategoryDTO);
//        subCategoryRepository.persist(subCategory);
//        return SubCategoryMapper.INSTANCE.toDTO(subCategory);
//    }
//
//    @Transactional
//    public SubCategoryDTO update(Long id, SubCategoryDTO subCategoryDTO) {
//        SubCategory entity = subCategoryRepository.findById(id);
//        if (entity == null) {
//            throw new WebApplicationException("SubCategory not found", 404);
//        }
////        entity.name = subCategoryDTO.name;
////        entity.category = CategoryMapper.INSTANCE.toEntity(subCategoryDTO.category);
//        return SubCategoryMapper.INSTANCE.toDTO(entity);
//    }
//
//    @Transactional
//    public void delete(Long id) {
//        SubCategory entity = subCategoryRepository.findById(id);
//        if (entity == null) {
//            throw new WebApplicationException("SubCategory not found", 404);
//        }
//        subCategoryRepository.delete(entity);
//    }
//
//    public PanacheQuery<SubCategory> findWithPaginationSortingFiltering(int page, int size, String sort, String filter) {
//        String query = filter != null ? "name like ?1" : null;
//        return subCategoryRepository.find(query, sort, filter != null ? "%" + filter + "%" : null).page(page, size);
//    }
//}