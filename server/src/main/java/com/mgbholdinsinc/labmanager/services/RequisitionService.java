package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Requisition;
import com.mgbholdinsinc.labmanager.repositories.RequisitionRepository;

@Service
public class RequisitionService {
	@Autowired
	private RequisitionRepository reqRepo;
	// get all
	public List<Requisition> findAllRequisitions() {
		List<Requisition> allRequisitions = reqRepo.findAll();
		return allRequisitions;
	}

	// get one by ID
	public Requisition findRequisitionById(Long id) {
		Optional<Requisition> optionalRequisition = reqRepo.findById(id);
		if (optionalRequisition.isPresent()) {
			return optionalRequisition.get();
		} else
			return null;
	}

	// create one
	public Requisition createRequisition(Requisition req) {
		return reqRepo.save(req);
	}

	// update one by ID
	public Requisition updateRequisition(Requisition req) {
		return reqRepo.save(req);
	}

	// delete one by ID
	public void deleteRequisitionById(long id) {
		reqRepo.deleteById(id);
	}
}
