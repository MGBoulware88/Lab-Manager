package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.Insurance;

public interface InsuranceRepository extends CrudRepository<Insurance, Long>{
	List<Insurance> findAll();
}