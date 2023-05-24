package com.mgbholdinsinc.labmanager.controllers;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.models.Address;
import com.mgbholdinsinc.labmanager.models.Insurance;
import com.mgbholdinsinc.labmanager.models.OrderingProvider;
import com.mgbholdinsinc.labmanager.models.Patient;
import com.mgbholdinsinc.labmanager.models.Requisition;
import com.mgbholdinsinc.labmanager.models.TestOption;
import com.mgbholdinsinc.labmanager.services.AccountService;
import com.mgbholdinsinc.labmanager.services.AddressService;
import com.mgbholdinsinc.labmanager.services.InsuranceService;
import com.mgbholdinsinc.labmanager.services.OrderingProviderService;
import com.mgbholdinsinc.labmanager.services.PatientService;
import com.mgbholdinsinc.labmanager.services.RequisitionService;
import com.mgbholdinsinc.labmanager.services.TestOptionService;

@RestController
@RequestMapping("/api/requisitions")
public class RequisitionsApi {
	@Autowired
	public RequisitionService requisitionService;
	@Autowired
	public PatientService patientService;
	@Autowired
	public AccountService accountService;
	@Autowired
	public OrderingProviderService orderingProviderService;
	@Autowired
	public InsuranceService insuranceService;
	@Autowired
	public TestOptionService testOptionService;
	@Autowired
	AddressService addressService;
	
	@GetMapping("")
	public List<Requisition> viewAllReqs() {
		return requisitionService.findAllRequisitions();
	}
	
	//TODO: get all reqs
	
	//TODO: view a req
	
	//TODO: edit a req
	
	@PostMapping("")
	public Requisition createRequisition(
			@RequestParam(value="patientFirstName") String patientFirstName,
			@RequestParam(value="patientLastName") String patientLastName,
			@RequestParam(value="patientDob") Date patientDob,
			@RequestParam(value="patientSex") String patientSex,
			@RequestParam(value="patientAddressStreet") String patientAddressStreet,
			@RequestParam(value="patientAddress2") String patientAddress2,
			@RequestParam(value="patientAddressCity") String patientAddressCity,
			@RequestParam(value="patientAddressState") String patientAddressState,
			@RequestParam(value="patientAddressZip") String patientAddressZip,
			@RequestParam(value="insurer") String insurer,
			@RequestParam(value="insurancePlanId") String insurancePlanId,
			@RequestParam(value="insuranceEffectiveDate") Date insuranceEffectiveDate,
			@RequestParam(value="patientInsuranceGaurantorRelationship") String relationship,
			@RequestParam(value="insuranceGaurantorFirstName") String insuranceGaurantorFirstName,
			@RequestParam(value="insuranceGaurantorLastName") String insuranceGaurantorLastName,
			@RequestParam(value="insuranceGaurantorDob") Date insuranceGaurantorDob,
			@RequestParam(value="orderingAccount") Long orderingAccount,
			@RequestParam(value="orderingProvider") Long orderingProvider,
			@RequestParam(value="order") List<Long> tests) {
		//instantiate the patient
		Patient patient = new Patient(patientFirstName, patientLastName, patientDob, patientSex);
		//instantiate the patient's address and save
		Address address = patientAddress2.equals("")? new Address(patientAddressStreet, patientAddressCity, patientAddressState, patientAddressZip): new Address(patientAddressStreet, patientAddress2, patientAddressCity, patientAddressState, patientAddressZip);
		//this will always be null for new patients, but won't in the future --adding the check now
		if (patient.getAddress() == null) {
			patient.setAddress(new ArrayList<>());
		}
		//add the new address to their list of addresses if not exist --future task
		patient.getAddress().add(address);
		
		Insurance insurance = new Insurance(insurer, insurancePlanId, insuranceEffectiveDate, relationship, insuranceGaurantorFirstName, insuranceGaurantorLastName, insuranceGaurantorDob);
		//this will always be null for new patients, but won't in the future --adding the check now
		if (patient.getInsurance() == null) {
			patient.setInsurance(new ArrayList<>());
		}
		patient.getInsurance().add(insurance);
		//instantiate account and provider by finding from db
		Account account = accountService.findAccountById(orderingAccount);
		OrderingProvider provider = orderingProviderService.findOrderingProviderById(orderingProvider);
		//loop through the list of tests and instantite them
		List<TestOption> testOrder = new ArrayList<>();
		for (Long test: tests) {
			TestOption thisTest = testOptionService.findOneById(test);
			if (thisTest == null) {
				continue;
			} else testOrder.add(thisTest);
		}
		//instantiate the req and all of the things
		Requisition requisition = new Requisition();
		requisition.setPatient(patient);
		requisition.setInsurance(insurance);
		requisition.setAccount(account);
		requisition.setOrderingProvider(provider);
		requisition.setTestOrder(new ArrayList<>());
		requisition.setTestOrder(testOrder);
		//TODO: add a FormId class to generate the form#
		return requisitionService.createRequisition(requisition);
	}
}
