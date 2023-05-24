package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.Address;

public interface AddressRepository extends CrudRepository<Address, Long>{
	List<Address> findAll();
}
