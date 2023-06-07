package com.mgbholdinsinc.labmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.models.OrderingProvider;
import com.mgbholdinsinc.labmanager.models.Patient;
import com.mgbholdinsinc.labmanager.models.Requisition;
import com.mgbholdinsinc.labmanager.models.RequisitionStatus;
import com.mgbholdinsinc.labmanager.models.TestOption;
import com.mgbholdinsinc.labmanager.repositories.RequisitionRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class RequisitionService {
	@Autowired
	private RequisitionRepository reqRepo;
	@Autowired
	private EntityManager entityManager;

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
	
	// get reqs by search string(s)
	public List<Requisition> findRequisitionsBySearch(String formId, String patientFirstName, String patientLastName, String accountName, String orderingProviderName, String department, String status) {
		//use Criteria API to dynamically build query
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Requisition> query = builder.createQuery(Requisition.class);
		Root<Requisition> root = query.from(Requisition.class);
		List<Predicate> predicates = new ArrayList<>();
		//check which params exist
		if (formId !=null && !formId.isEmpty()) {
			predicates.add(builder.like(root.get("formId"), "%" + formId + "%"));
		}
		if (patientFirstName != null && !patientFirstName.isEmpty()) {
			Join<Requisition, Patient> patientJoin = root.join("patient");
			predicates.add(builder.like(patientJoin.get("firstName"), "%" + patientFirstName + "%"));
		}
		if (patientLastName != null && !patientLastName.isEmpty()) {
			Join<Requisition, Patient> patientJoin = root.join("patient");
			predicates.add(builder.like(patientJoin.get("lastName"), "%" + patientLastName + "%"));
		}
		if (accountName != null && !accountName.isEmpty()) {
			Join<Requisition, Account> accountJoin = root.join("account");
			predicates.add(builder.like(accountJoin.get("name"), "%" + accountName + "%"));
		}
	    if (orderingProviderName != null && !orderingProviderName.isEmpty()) {
	    	Join<Requisition, OrderingProvider> providerJoin = root.join("orderingProvider");
	        predicates.add(builder.like(providerJoin.get("name"), "%" + orderingProviderName + "%"));
	    }
	    if (status != null && !status.isEmpty()) {
	    	Join<Requisition, RequisitionStatus> statusJoin = root.join("status");
	        predicates.add(builder.equal(statusJoin.get("status"), "%" + status + "%"));
	    }
	    if (department != null && !department.isEmpty()) {
	    	Join<Requisition, TestOption> departmentJoin = root.join("testOrder");
	    	predicates.add(builder.like(departmentJoin.get("department"), "%" + department + "%"));
	    }
		//build the query and execute
	    query.where(predicates.toArray(new Predicate[0])).orderBy(builder.asc(root.get("formId")));	    
	    TypedQuery<Requisition> typedQuery = entityManager.createQuery(query);
		//ofc return the data from the query
		return typedQuery.getResultList();
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
