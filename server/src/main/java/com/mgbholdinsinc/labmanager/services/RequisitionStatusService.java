package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.RequisitionStatus;
import com.mgbholdinsinc.labmanager.repositories.RequisitionStatusRepository;

@Service
public class RequisitionStatusService {
	@Autowired
	private RequisitionStatusRepository reqStatusRepo;
	//get all
	public List<RequisitionStatus> finaAllReqStatuses() {
		List<RequisitionStatus> allReqStatuses = reqStatusRepo.findAll();
		return allReqStatuses;
	}
	//get one by ID
	public RequisitionStatus findReqStatusById(Long id) {
		Optional<RequisitionStatus> optionalReqStatus = reqStatusRepo.findById(id);
		if (optionalReqStatus.isPresent()) {
			return optionalReqStatus.get();
		} else return null;
	}
}
