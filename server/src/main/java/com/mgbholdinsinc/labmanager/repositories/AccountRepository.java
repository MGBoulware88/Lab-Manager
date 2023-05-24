package com.mgbholdinsinc.labmanager.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.mgbholdinsinc.labmanager.models.Account;

public interface AccountRepository extends CrudRepository<Account, Long>{
	List<Account> findAll();
}
