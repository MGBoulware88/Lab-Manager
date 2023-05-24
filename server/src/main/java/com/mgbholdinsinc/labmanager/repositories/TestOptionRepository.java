package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.TestOption;

public interface TestOptionRepository extends CrudRepository<TestOption, Long>{
	List<TestOption> findAll();
}
