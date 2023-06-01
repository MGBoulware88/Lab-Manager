package com.mgbholdinsinc.labmanager.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.mgbholdinsinc.labmanager.models.RequisitionStatus;
import com.mgbholdinsinc.labmanager.models.TestOption;
import com.mgbholdinsinc.labmanager.services.AccountService;
import com.mgbholdinsinc.labmanager.services.AddressService;
import com.mgbholdinsinc.labmanager.services.InsuranceService;
import com.mgbholdinsinc.labmanager.services.OrderingProviderService;
import com.mgbholdinsinc.labmanager.services.PatientService;
import com.mgbholdinsinc.labmanager.services.RequisitionService;
import com.mgbholdinsinc.labmanager.services.RequisitionStatusService;
import com.mgbholdinsinc.labmanager.services.TestOptionService;

@RestController
@RequestMapping("/api/requisitions")
public class RequisitionsApi {
	@Autowired
	public RequisitionService requisitionService;
	@Autowired
	public RequisitionStatusService reqStatusService;
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
	
	//get all reqs
	@GetMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	public List<Requisition> getAllReqs() {
		List<Requisition> allReqs = requisitionService.findAllRequisitions();
		System.out.println(allReqs);
		return allReqs;
	}
	
	//get one req by Id
	
	//create a req
	@PostMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	public Requisition createReq(@RequestParam("patientFirstName")String patientFirstName,@RequestParam("patientLastName")String patientLastName,@RequestParam("patientDob")String patientDob ,@RequestParam("patientSex")String patientSex,@RequestParam("patientAddressStreet")String patientAddressStreet,@RequestParam("patientAddress2")String patientAddress2,@RequestParam("patientAddressCity")String patientAddressCity,@RequestParam("patientAddressState")String patientAddressState,@RequestParam("patientAddressZip")String patientAddressZip,@RequestParam("patientInsuranceInsurer")String patientInsuranceInsurer,@RequestParam("patientInsurancePlanId")String patientInsurancePlanId,@RequestParam("patientInsuranceEffectiveDate")String patientInsuranceEffectiveDate,@RequestParam("patientInsuranceGaurantorRelationship")String patientInsuranceGaurantorRelationship,@RequestParam("patientInsuranceGaurantorFirstName")String patientInsuranceGaurantorFirstName,@RequestParam("patientInsuranceGaurantorLastName")String patientInsuranceGaurantorLastName,@RequestParam("patientInsuranceGaurantorDob")String patientInsuranceGaurantorDob,@RequestParam("account")Long accountId,@RequestParam("orderingProvider")Long orderingProviderId,@RequestParam("testOrder")List<Long> order) throws ParseException {
		//grab account by ID
		Account orderingAccount = accountService.findAccountById(accountId);
		//grab provider by ID
		OrderingProvider orderingProvider = orderingProviderService.findOrderingProviderById(orderingProviderId);
		//convert patientDob to Date
		SimpleDateFormat df = new SimpleDateFormat("yyy-MM-dd");
		Date patientDobDate = df.parse(patientDob);		
		//create patient
		Patient patient = new Patient(patientFirstName, patientLastName, patientDobDate, patientSex);
		//create address
		Address address = new Address(patientAddressStreet, patientAddress2, patientAddressCity, patientAddressState, patientAddressZip);
		//Save Address
		addressService.createAddress(address);
		//convert to Dates
		Date effectiveDate = df.parse(patientInsuranceEffectiveDate);
		Date gaurantorDobDate = df.parse(patientInsuranceGaurantorDob);
		//create Insurance
		Insurance insurance = new Insurance(patientInsuranceInsurer, patientInsurancePlanId, effectiveDate, patientInsuranceGaurantorRelationship, patientInsuranceGaurantorFirstName, patientInsuranceGaurantorLastName, gaurantorDobDate);
		//save Insurance
		insuranceService.createInsurance(insurance);
		//create empy testOrder for Req
		Requisition newReq = new Requisition();
		newReq.setTestOrder(new ArrayList<TestOption>());
		//create test order
		for (Long testId : order) {
			TestOption thisTest = testOptionService.findOneById(testId);
			newReq.getTestOrder().add(thisTest);
		}
		//grab starting Status
		RequisitionStatus reqStatus = new RequisitionStatus();
		reqStatus.setStatus("New Order");
		//save
		reqStatusService.createStatus(reqStatus);
		//add Account, Provider, Patient, Address to Req
		newReq.setAccount(orderingAccount);
		newReq.setOrderingProvider(orderingProvider);
		newReq.setAddress(address);
		newReq.setInsurance(insurance);
		newReq.setStatus(reqStatus);
		newReq.setFormId(0012345);
		//also add Address to Patient
		patient.setAddress(address);
		patient.setInsurance(new ArrayList<Insurance>());
		patient.getInsurance().add(insurance);
		patientService.createPatient(patient);
		newReq.setPatient(patient);
		
		return requisitionService.createRequisition(newReq);
	}
	
	//edit a req
	
	//delete a req??

}