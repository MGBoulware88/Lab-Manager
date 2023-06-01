package com.mgbholdinsinc.labmanager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.TestOption;
import com.mgbholdinsinc.labmanager.services.TestOptionService;

@RestController
@RequestMapping("/api/test_options")
public class TestOptionsApi {
	@Autowired
	TestOptionService testOptionService;
	
	@PostMapping("/add")
	@CrossOrigin(origins="http://localhost:3000")
	TestOption addTest(@RequestParam("name")String name, @RequestParam("department")String dept) {
		TestOption newTest = new TestOption(name, dept);
		return testOptionService.createTestOption(newTest);
	}
	
	@GetMapping("")
	@CrossOrigin(origins="http://localhost:3000")
	List<TestOption> getAllTests() {
		return testOptionService.findAllTestOptions();
	}
	
}
