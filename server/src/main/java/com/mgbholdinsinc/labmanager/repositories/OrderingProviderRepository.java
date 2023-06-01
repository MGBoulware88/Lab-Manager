package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.OrderingProvider;

public interface OrderingProviderRepository extends CrudRepository<OrderingProvider, Long>{
	List<OrderingProvider> findAll();
	List<OrderingProvider> findByAccount_Id(Long id);
}
