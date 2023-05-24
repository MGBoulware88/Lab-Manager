package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.RequisitionStatus;

public interface RequisitionStatusRepository extends CrudRepository<RequisitionStatus, Long>{
	List<RequisitionStatus> findAll();
}
