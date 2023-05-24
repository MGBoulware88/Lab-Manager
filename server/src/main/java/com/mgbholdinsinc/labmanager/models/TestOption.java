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
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="tests")
public class TestOption {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotEmpty
	private String name;
	@NotEmpty
	private String department;
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name = "requisitions_tests",
			joinColumns = @JoinColumn(name = "test_id"),
			inverseJoinColumns = @JoinColumn(name = "requisition_id"))
	private List<Requisition> requisitions;
	@Column(updatable=false)
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date createdAt;
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date updatedAt;
	
	public TestOption() {}
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<Requisition> getRequisitions() {
		return requisitions;
	}

	public void setRequisitions(List<Requisition> requisitions) {
		this.requisitions = requisitions;
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
