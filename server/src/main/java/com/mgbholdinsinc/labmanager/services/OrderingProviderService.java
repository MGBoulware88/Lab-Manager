package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.OrderingProvider;
import com.mgbholdinsinc.labmanager.repositories.OrderingProviderRepository;

@Service
public class OrderingProviderService {
	@Autowired
	private OrderingProviderRepository orderingProviderRepo;
	// get all
	public List<OrderingProvider> findAllOrderingProviders() {
		List<OrderingProvider> allOrderingProviders = orderingProviderRepo.findAll();
		return allOrderingProviders;
	}

	// get one by ID
	public OrderingProvider findOrderingProviderById(Long id) {
		Optional<OrderingProvider> optionalOrderingProvider = orderingProviderRepo.findById(id);
		if (optionalOrderingProvider.isPresent()) {
			return optionalOrderingProvider.get();
		} else
			return null;
	}

	// create one
	public OrderingProvider createOrderingProvider(OrderingProvider provider) {
		return orderingProviderRepo.save(provider);
	}

	// update one by ID
	public OrderingProvider updateOrderingProvider(OrderingProvider provider) {
		return orderingProviderRepo.save(provider);
	}

	// delete one by ID
	public void deleteOrderingProviderById(long id) {
		orderingProviderRepo.deleteById(id);
	}
	
	//find all Providers for a specific Account
	public List<OrderingProvider> findAllOrderingProvidersByAccountId(Long id) {
		return orderingProviderRepo.findByAccount_Id(id);
	}
}
