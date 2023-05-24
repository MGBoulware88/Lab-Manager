package com.mgbholdinsinc.labmanager.models;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="insurances")
public class Insurance {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotEmpty(message="Insurer is required.")
	private String insurer;
	@NotEmpty
	private String planId;
	@NotEmpty
	private Date effectiveDate;
	@NotEmpty
	private String gaurantorRelationship;
	@NotEmpty
	private String gaurantorFirstName;
	@NotEmpty
	private String gaurantorLastName;
	@NotEmpty
	private Date gaurantorDob;
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="patient_id")
	private Patient patient;
	@OneToOne(mappedBy="insurance", cascade=CascadeType.ALL, fetch=FetchType.LAZY)
	private Requisition requisition;
	@Column(updatable=false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updatedAt;
	
	public Insurance() {}
	public Insurance(String insurer, String insurancePlanId, Date insuranceEffectiveDate, String relationship, String insuranceGaurantorFirstName, String insuranceGaurantorLastName, Date insuranceGaurantorDob) {
		this.insurer = insurer;
		this.planId = insurancePlanId;
		this.effectiveDate = insuranceEffectiveDate;
		this.gaurantorRelationship = relationship;
		this.gaurantorFirstName = insuranceGaurantorFirstName;
		this.gaurantorLastName = insuranceGaurantorLastName;
		this.gaurantorDob = insuranceGaurantorDob;
	}
	
	@PrePersist
    protected void onCreate(){
    	this.createdAt = new Date();
    }
    @PreUpdate
    protected void onUpdate(){
    	this.updatedAt = new Date();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getInsurer() {
		return insurer;
	}

	public void setInsurer(String insurer) {
		this.insurer = insurer;
	}

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public Date getEffectiveDate() {
		return effectiveDate;
	}

	public void setEffectiveDate(Date effectiveDate) {
		this.effectiveDate = effectiveDate;
	}

	public String getGaurantorRelationship() {
		return gaurantorRelationship;
	}

	public void setGaurantorRelationship(String gaurantorRelationship) {
		this.gaurantorRelationship = gaurantorRelationship;
	}

	public String getGaurantorFirstName() {
		return gaurantorFirstName;
	}

	public void setGaurantorFirstName(String gaurantorFirstName) {
		this.gaurantorFirstName = gaurantorFirstName;
	}

	public String getGaurantorLastName() {
		return gaurantorLastName;
	}

	public void setGaurantorLastName(String gaurantorLastName) {
		this.gaurantorLastName = gaurantorLastName;
	}

	public Date getGaurantorDob() {
		return gaurantorDob;
	}

	public void setGaurantorDob(Date gaurantorDob) {
		this.gaurantorDob = gaurantorDob;
	}
	
	public Patient getPatient() {
		return patient;
	}

	public void setPatient(Patient patient) {
		this.patient = patient;
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
