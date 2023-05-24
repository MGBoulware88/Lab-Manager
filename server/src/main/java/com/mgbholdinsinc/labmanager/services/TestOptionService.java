package com.mgbholdinsinc.labmanager.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mgbholdinsinc.labmanager.models.TestOption;
import com.mgbholdinsinc.labmanager.repositories.TestOptionRepository;

@Service
public class TestOptionService {
	@Autowired
	private TestOptionRepository testOptionRepo;

	// get all
	public List<TestOption> findAllTestOptions() {
		List<TestOption> allTestOptions = testOptionRepo.findAll();
		return allTestOptions;
	}
	
	//get one by Id
	public TestOption findOneById(Long id) {
		Optional<TestOption> testOption = testOptionRepo.findById(id);
		if (testOption.isPresent()) {
			return testOption.get();
		} else return null;
	}

	// create one
	public TestOption createTestOption(TestOption test) {
		return testOptionRepo.save(test);
	}

	// update one by ID
	public TestOption updateTestOption(TestOption test) {
		return testOptionRepo.save(test);
	}

	// delete one by ID
	public void deleteTestOptionById(long id) {
		testOptionRepo.deleteById(id);
	}
}
