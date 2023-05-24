package com.mgbholdinsinc.labmanager.models;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="requisitions")
public class Requisition {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotNull
	private Long formId;
	private String accessionNumber;
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "status_id")
	private RequisitionStatus status;
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "patient_id")
	private Patient patient;
	@NotNull
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="insurance_id")
	private Insurance insurance;
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "account_id")
	private Account account;
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ordering_provider_id")
	private OrderingProvider orderingProvider;
	@NotNull
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "requisitions_tests",
			joinColumns = @JoinColumn(name = "requisition_id"),
			inverseJoinColumns = @JoinColumn(name = "test_id"))
	private List<TestOption> testOrder;
	@Column(updatable=false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createdAt;
	//@Column(updatable=false)
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user_id")
	private User createdBy;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updatedAt;
	//TODO: add updatedBy
	//private User updatedBy;
	
	public Requisition() {}
	
	@PrePersist
    protected void onCreate(){
    	this.createdAt = new Date();
    	//call getLoggedUser
    	//this.createdBy = someService.getLoggedUser();
    }
    @PreUpdate
    protected void onUpdate(){
    	this.updatedAt = new Date();
    	//call getLoggedUser
    	//this.updatedBy = someService.getLoggedUser();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getFormId() {
		return formId;
	}

	public void setFormId(Long formId) {
		this.formId = formId;
	}

	public String getAccessionNumber() {
		return accessionNumber;
	}

	public void setAccessionNumber(String accessionNumber) {
		this.accessionNumber = accessionNumber;
	}

	public RequisitionStatus getStatus() {
		return status;
	}

	public void setStatus(RequisitionStatus status) {
		this.status = status;
	}

	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
	}

	public Insurance getInsurance() {
		return insurance;
	}

	public void setInsurance(Insurance insurance) {
		this.insurance = insurance;
	}

	public Account getAccount() {
		return account;
	}

	public void setAccount(Account account) {
		this.account = account;
	}

	public OrderingProvider getOrderingProvider() {
		return orderingProvider;
	}

	public void setOrderingProvider(OrderingProvider orderingProvider) {
		this.orderingProvider = orderingProvider;
	}

	public List<TestOption> getTestOrder() {
		return testOrder;
	}

	public void setTestOrder(List<TestOption> testOrder) {
		this.testOrder = testOrder;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
}
