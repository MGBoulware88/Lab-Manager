package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.Requisition;

public interface RequisitionRepository extends CrudRepository<Requisition, Long>{
	List<Requisition> findAll();
	List<Requisition> findRequisitionsByFormId(long id);
}
