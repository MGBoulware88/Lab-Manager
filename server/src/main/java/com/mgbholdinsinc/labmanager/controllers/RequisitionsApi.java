package com.mgbholdinsinc.labmanager.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
//		System.out.println(allReqs);
		return allReqs;
	}
	
	//get one req by Id
	@GetMapping("/{requisition_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public Requisition findReq(@PathVariable("requisition_id")Long reqId) {
//		System.out.println(reqId);
		Requisition thisReq = requisitionService.findRequisitionById(reqId);
		for (TestOption test : thisReq.getTestOrder()) {
			test.setChecked(true);
//			System.out.println(test.getChecked());
		}
//		System.out.println(thisReq.getTestOrder().get(0).getChecked());
		return thisReq;
		
	}
	
	//get reqs via search
	@GetMapping("/search")
	@CrossOrigin(origins="http://localhost:3000")
	public List<Requisition> searchReqs(@RequestParam(value="formId", required=false)String formId, @RequestParam(value="patientFirstName", required=false)String patientFirstName,@RequestParam(value="patientLastName", required=false)String patientLastName, @RequestParam(value="accountName", required=false)String accountName, @RequestParam(value="providerName", required=false)String orderingProviderName, @RequestParam(value="department", required=false)String department, @RequestParam(value="status", required=false)String status) {
		List<Requisition> foundReqs = requisitionService.findRequisitionsBySearch(formId, patientFirstName, patientLastName, accountName, orderingProviderName, department, status);
		return foundReqs;
	}
	
	//create a req
	@PostMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	public Requisition createReq(@RequestParam("patientFirstName")String patientFirstName,@RequestParam("patientLastName")String patientLastName,@RequestParam("patientDob")String patientDob ,@RequestParam("patientSex")String patientSex,@RequestParam("patientAddressStreet")String patientAddressStreet,@RequestParam("patientAddress2")String patientAddress2,@RequestParam("patientAddressCity")String patientAddressCity,@RequestParam("patientAddressState")String patientAddressState,@RequestParam("patientAddressZip")String patientAddressZip,@RequestParam("patientInsuranceInsurer")String patientInsuranceInsurer,@RequestParam("patientInsurancePlanId")String patientInsurancePlanId,@RequestParam("patientInsuranceEffectiveDate")String patientInsuranceEffectiveDate,@RequestParam("patientInsuranceGaurantorRelationship")String patientInsuranceGaurantorRelationship,@RequestParam("patientInsuranceGaurantorFirstName")String patientInsuranceGaurantorFirstName,@RequestParam("patientInsuranceGaurantorLastName")String patientInsuranceGaurantorLastName,@RequestParam("patientInsuranceGaurantorDob")String patientInsuranceGaurantorDob,@RequestParam("account")Long accountId,@RequestParam("orderingProvider")Long orderingProviderId,@RequestParam("testOrder")List<Long> order,@RequestParam("formId")String formId) throws ParseException {
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
		RequisitionStatus reqStatus = reqStatusService.findReqStatusById((long) 1);
		//add Account, Provider, Patient, Address, Insurance, Status, FormId to Req
		newReq.setAccount(orderingAccount);
		newReq.setOrderingProvider(orderingProvider);
		newReq.setAddress(address);
		newReq.setInsurance(insurance);
		newReq.setStatus(reqStatus);
		//TODO: create FormID Generator
		newReq.setFormId(formId);
		//also add Address to Patient
		patient.setAddress(address);
		patient.setInsurance(new ArrayList<Insurance>());
		patient.getInsurance().add(insurance);
		patientService.createPatient(patient);
		newReq.setPatient(patient);
		
		return requisitionService.createRequisition(newReq);
	}
	
	//edit a req
	@PutMapping("{requisition_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public Requisition editReq(@PathVariable("requisition_id")Long reqId,@RequestParam("patientFirstName")String patientFirstName,@RequestParam("patientLastName")String patientLastName,@RequestParam("patientDob")String patientDob ,@RequestParam("patientSex")String patientSex,@RequestParam("patientAddressStreet")String patientAddressStreet,@RequestParam("patientAddress2")String patientAddress2,@RequestParam("patientAddressCity")String patientAddressCity,@RequestParam("patientAddressState")String patientAddressState,@RequestParam("patientAddressZip")String patientAddressZip,@RequestParam("patientInsuranceInsurer")String patientInsuranceInsurer,@RequestParam("patientInsurancePlanId")String patientInsurancePlanId,@RequestParam("patientInsuranceEffectiveDate")String patientInsuranceEffectiveDate,@RequestParam("patientInsuranceGaurantorRelationship")String patientInsuranceGaurantorRelationship,@RequestParam("patientInsuranceGaurantorFirstName")String patientInsuranceGaurantorFirstName,@RequestParam("patientInsuranceGaurantorLastName")String patientInsuranceGaurantorLastName,@RequestParam("patientInsuranceGaurantorDob")String patientInsuranceGaurantorDob,@RequestParam("account")Long accountId,@RequestParam("orderingProvider")Long orderingProviderId,@RequestParam("testOrder")List<Long> order) throws ParseException {
		//fetch req
		Requisition updatedReq = requisitionService.findRequisitionById(reqId);
		System.out.println(updatedReq.getPatient().getFirstName());
		System.out.println(updatedReq.getAddress().getState());
		System.out.println(updatedReq.getAccount().getName());
		System.out.println(updatedReq.getTestOrder());
		System.out.println(updatedReq.getOrderingProvider());
		//**Don't fetch status --not editable on this form**
		//fetch account
		Account account = accountService.findAccountById(accountId);
		//add account to req
		updatedReq.setAccount(account);
		//fetch  provider
		OrderingProvider provider = orderingProviderService.findOrderingProviderById(orderingProviderId);
		//add provider to req
		updatedReq.setOrderingProvider(provider);
		//replace testOrder with current test list
//		System.out.println("Order" + order);
		updatedReq.setTestOrder(new ArrayList<TestOption>());
		for (Long testId : order) {
			TestOption thisTest = testOptionService.findOneById(testId);
			updatedReq.getTestOrder().add(thisTest);
//			System.out.println("TestOrder: " + updatedReq.getTestOrder());
		}
		//fetch patient
		Patient patient = patientService.findPatientById(updatedReq.getPatient().getId());
		//format DOB
		SimpleDateFormat df = new SimpleDateFormat("yyy-MM-dd");
		Date patientDobDate = df.parse(patientDob);
		//update patient fields
		patient.setFirstName(patientFirstName);
		patient.setLastName(patientLastName);
		patient.setDob(patientDobDate);
		patient.setSex(patientSex);
		//fetch address
		Address address = addressService.findAddressById(updatedReq.getAddress().getId());
		address.setStreet(patientAddressStreet);
		//**always set address2 because "" might be an update**
		address.setAddress2(patientAddress2);
		address.setCity(patientAddressCity);
		address.setState(patientAddressState);
		address.setZip(patientAddressZip);
		//add updated address to patient and req
		addressService.createAddress(address);
		updatedReq.setAddress(address);
		patient.setAddress(address);
		//fetch insurance
		Insurance insurance = insuranceService.findInsuranceById(updatedReq.getInsurance().getId());
		//format dates
		Date effectiveDate = df.parse(patientInsuranceEffectiveDate);
		Date gaurantorDobDate = df.parse(patientInsuranceGaurantorDob);
		//update insurance
		insurance.setInsurer(patientInsuranceInsurer);
		insurance.setPlanId(patientInsurancePlanId);
		insurance.setEffectiveDate(effectiveDate);
		insurance.setGaurantorRelationship(patientInsuranceGaurantorRelationship);
		insurance.setGaurantorFirstName(patientInsuranceGaurantorFirstName);
		insurance.setGaurantorLastName(patientInsuranceGaurantorLastName);
		insurance.setGaurantorDob(gaurantorDobDate);
		//add updated insurance to patient and req
		insuranceService.createInsurance(insurance);
		updatedReq.setInsurance(insurance);
		patient.getInsurance().add(insurance);		
		//save patient
		patientService.createPatient(patient);
		//add patient to req
		updatedReq.setPatient(patient);
		//save & return the updated req
		return requisitionService.createRequisition(updatedReq);
	}
	
	//delete a req??

}