package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.repositories.AccountRepository;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepo;
	//get all
	public List<Account> findAllAccounts() {
		List<Account> allAccounts = accountRepo.findAll();
		return allAccounts;
	}
	//get one by ID
	public Account findAccountById(Long id) {
		Optional<Account> optionalAccount = accountRepo.findById(id);
		if (optionalAccount.isPresent()) {
			return optionalAccount.get();
		} else return null;
	}
	//create one
	public Account createAccount(Account account) {
		return accountRepo.save(account);
	}
	//update one by ID
	public Account updateAccount(Account account) {
		return accountRepo.save(account);
	}
	//delete one by ID
	public void deleteAccountById(Long id) {
		accountRepo.deleteById(id);
	}
	
	//get address ID
	public Long findAddressIdByAccountId(Long id) {
		return accountRepo.findAddressIdByAccountId(id);
	}
}
