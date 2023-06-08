package com.mgbholdinsinc.labmanager.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.repositories.AccountRepository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Service
public class AccountService {
	@Autowired
	private AccountRepository accountRepo;
	@Autowired
	private EntityManager entityManager;
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
	//get Accounts by search
	public List<Account> findAccountsBySearch(String accountName, String contactName, String contactPhone, String contactEmail) {
		//use Criteria API to dynamically build query
		CriteriaBuilder builder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Account> query = builder.createQuery(Account.class);
		Root<Account> root = query.from(Account.class);
		List<Predicate> predicates = new ArrayList<>();
		//check which params exist
		if (accountName != null && !accountName.isEmpty()) {
			predicates.add(builder.like(root.get("name"), "%" + accountName + "%"));
		}
		if (contactName != null && !contactName.isEmpty()) {
			predicates.add(builder.like(root.get("contactName"), "%" + contactName + "%"));
		}
		if (contactPhone != null && !contactPhone.isEmpty()) {
			predicates.add(builder.like(root.get("contactPhone"), "%" + contactPhone + "%"));
		}
		if (contactEmail != null && !contactEmail.isEmpty()) {
			predicates.add(builder.like(root.get("contactEmail"), "%" + contactEmail + "%"));
		}
		//build the query and execute
	    query.where(predicates.toArray(new Predicate[0])).orderBy(builder.asc(root.get("id")));	    
	    TypedQuery<Account> typedQuery = entityManager.createQuery(query);
		//ofc return the data from the query
		return typedQuery.getResultList();
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
