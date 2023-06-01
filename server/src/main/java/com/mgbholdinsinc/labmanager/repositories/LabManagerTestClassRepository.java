package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.LabManagerTestClass;

public interface LabManagerTestClassRepository extends CrudRepository<LabManagerTestClass, Long>{
	List<LabManagerTestClass> findAll();
}
