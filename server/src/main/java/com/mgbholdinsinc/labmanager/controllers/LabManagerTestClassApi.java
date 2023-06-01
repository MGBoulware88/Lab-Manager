package com.mgbholdinsinc.labmanager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.LabManagerTestClass;
import com.mgbholdinsinc.labmanager.services.LabManagerTestClassService;

@RestController
@RequestMapping("/api/tests")
public class LabManagerTestClassApi {
	@Autowired
	LabManagerTestClassService testService;
	
	@PostMapping("/new")
	public LabManagerTestClass create(@RequestParam("name")String name) {
		LabManagerTestClass newTest = new LabManagerTestClass();
		newTest.setName(name);
		return testService.create(newTest);
	}
}
