package com.mgbholdinsinc.labmanager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.models.OrderingProvider;
import com.mgbholdinsinc.labmanager.services.AccountService;
import com.mgbholdinsinc.labmanager.services.OrderingProviderService;

@RestController
@RequestMapping("/api/providers")
public class OrderingProvidersApi {
	@Autowired
	OrderingProviderService providerService;
	@Autowired
	AccountService accountService;
	
	@GetMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	public List<OrderingProvider> getAllProviders() {
		return providerService.findAllOrderingProviders();	
	}
	
	@GetMapping("/{account_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public List<OrderingProvider> getAllProvidersForOneAccountById(@PathVariable("account_id") Long accountId) {
		List<OrderingProvider> providers = providerService.findAllOrderingProvidersByAccountId(accountId);
		System.out.println(providers);
		return providers;
	}
	
	@PostMapping("/new/{account_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public OrderingProvider addProvider(@PathVariable("account_id") Long accountId, @RequestParam("name") String name, @RequestParam("npi") String npi) {
		//instanitate the existing account
		Account targetAccount = accountService.findAccountById(accountId);
		OrderingProvider newProvider = new OrderingProvider(name, npi);
		newProvider.setAccount(targetAccount);	
		return providerService.createOrderingProvider(newProvider);
	}
	
}
