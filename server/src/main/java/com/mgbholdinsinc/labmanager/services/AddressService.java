package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Address;
import com.mgbholdinsinc.labmanager.repositories.AddressRepository;

@Service
public class AddressService {
	@Autowired
	private AddressRepository addressRepo;
	// get all
	public List<Address> findAllAddresses() {
		List<Address> allAddresses = addressRepo.findAll();
		return allAddresses;
	}

	// get one by ID
	public Address findAddressById(Long id) {
		Optional<Address> optionalAddress = addressRepo.findById(id);
		if (optionalAddress.isPresent()) {
			return optionalAddress.get();
		} else
			return null;
	}

	// create one
	public Address createAddress(Address address) {
		return addressRepo.save(address);
	}

	// update one by ID
	public Address updateAddress(Address address) {
		return addressRepo.save(address);
	}

	// delete one by ID
	public void deleteAddressById(long id) {
		addressRepo.deleteById(id);
	}
}
