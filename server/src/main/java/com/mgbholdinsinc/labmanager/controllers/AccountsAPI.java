package com.mgbholdinsinc.labmanager.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.Account;
import com.mgbholdinsinc.labmanager.models.Address;
import com.mgbholdinsinc.labmanager.models.OrderingProvider;
import com.mgbholdinsinc.labmanager.services.AccountService;
import com.mgbholdinsinc.labmanager.services.AddressService;
import com.mgbholdinsinc.labmanager.services.OrderingProviderService;

@RestController
@RequestMapping("/api/accounts")
public class AccountsAPI {
	@Autowired
	public AccountService accountService;
	@Autowired
	public AddressService addressService;
	@Autowired
	public OrderingProviderService providerService;
		
	// GET all Accounts --Manage Accounts page
	@GetMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	public List<Account> getAllAccounts() {
		List<Account> allAccounts = accountService.findAllAccounts();
		for (Account account : allAccounts) {
			List<OrderingProvider> theseProviders = providerService.findAllOrderingProvidersByAccountId(account.getId());
			account.setOrderingProviders(theseProviders);
		}
		return allAccounts;
	}
	
	//GET ONE account --View Account page & Edit Account page
	@GetMapping("/{id}")
	@CrossOrigin(origins="http://localhost:3000")
	public Account getOneAccount(@PathVariable("id") Long id) {
		//find Account
		Account account = accountService.findAccountById(id);
		List<OrderingProvider> providers = providerService.findAllOrderingProvidersByAccountId(id);
		if (providers.isEmpty()) {
			return account;
		} 
			account.setOrderingProviders(new ArrayList<>());
			for (OrderingProvider provider : providers) {
				account.getOrderingProviders().add(provider);
			}
		System.out.println(account.getAddress().getStreet());
		return account;
	}
	
	//GET Accounts by Search fields
	@GetMapping("/search")
	@CrossOrigin(origins="http://localhost:3000")
	public List<Account> searchAccounts(@RequestParam(value="accountName", required=false)String accountName,@RequestParam(value="contactName", required=false)String contactName,@RequestParam(value="contactPhone", required=false)String contactPhone,@RequestParam(value="contactEmail", required=false)String contactEmail) {
		List<Account> foundAccounts = accountService.findAccountsBySearch(accountName, contactName, contactPhone, contactEmail);
		return foundAccounts;
	}
	
	//CREATE One account --Add Account page
	@PostMapping("/new")
	@CrossOrigin(origins="http://localhost:3000")
	public Account createAccount(@RequestParam("name") String name, @RequestParam("contactName") String contactName, @RequestParam("contactPhone") String contactPhone, @RequestParam("contactEmail") String contactEmail, @RequestParam("street") String street, @RequestParam("address2")String address2, @RequestParam("city") String city, @RequestParam("state") String state, @RequestParam("zip") String zip) {
		//instantiate account, provider, address
		Account newAccount = new Account(name, contactName, contactPhone, contactEmail);
		Address thisAddress = new Address(street, address2, city, state, zip);
		addressService.createAddress(thisAddress);
		newAccount.setAddress(thisAddress);
		
		//return the newly saved account || null
		return accountService.createAccount(newAccount);
	}
	
	//UPDATE One Account --Edit page PUT route
	//this might actually be just an Address update, but comes from Edit Account form
	@PutMapping("/{account_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public Account updateAccount(@PathVariable("account_id") Long accountId, @RequestParam("name") String name, @RequestParam("contactName") String contactName, @RequestParam("contactPhone") String contactPhone, @RequestParam("contactEmail") String contactEmail, @RequestParam("street") String street, @RequestParam("address2")String address2, @RequestParam("city") String city, @RequestParam("state") String state, @RequestParam("zip") String zip) {
		//**Providers are not editable on Edit Account form**
		//grab existing providers
		List<OrderingProvider> existingProviders = providerService.findAllOrderingProvidersByAccountId(accountId);
				
		//grab the account to set fields
		Account updatedAccount = accountService.findAccountById(accountId);
		updatedAccount.setName(name);
		updatedAccount.setContactName(contactName);
		updatedAccount.setContactPhone(contactPhone);
		updatedAccount.setContactEmail(contactEmail);
		updatedAccount.getAddress().setStreet(street);
		updatedAccount.getAddress().setAddress2(address2);
		updatedAccount.getAddress().setCity(city);
		updatedAccount.getAddress().setState(state);
		updatedAccount.getAddress().setZip(zip);
		
		updatedAccount.setOrderingProviders(existingProviders);
		//return updated Account
		return accountService.createAccount(updatedAccount);
	}
	
	@DeleteMapping("/{account_id}")
	@CrossOrigin(origins="http://localhost:3000")
	public void deleteAccount(@PathVariable("account_id") Long id) {
		Account account = accountService.findAccountById(id);
		for (OrderingProvider provider : account.getOrderingProviders()) {
			provider.setAccount(null);
		}
		
		accountService.deleteAccountById(id);
	}
	
}
