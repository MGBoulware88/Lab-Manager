package com.mgbholdinsinc.labmanager.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import com.mgbholdinsinc.labmanager.models.LoginUser;
import com.mgbholdinsinc.labmanager.models.User;
import com.mgbholdinsinc.labmanager.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
    private UserRepository userRepo;
    
	// This method will be called from the controller
    // whenever a user submits a registration form.
    
    public User register(User newUser, BindingResult result) {
    
    	//if pw doesn't match, return null    	
    	if (!newUser.getPassword().equals(newUser.getConfirm())) {
    	    result.rejectValue("confirm", "Matches", "The Confirm Password must match Password!");
    	    return null;
    	}
    	//if user already exist, return null
    	Optional<User> potentialUser = userRepo.findByEmail(newUser.getEmail());
		if (potentialUser.isPresent()) {
			result.rejectValue("email", "Taken", "This email is already taken!");
			return null;
		}
		// Hash and set password, save user to database
		String hashedPassword = BCrypt.hashpw(newUser.getPassword(), BCrypt.gensalt());
		newUser.setPassword(hashedPassword);
		userRepo.save(newUser);
		return newUser;
    }
 // This method will be called from the controller
    // whenever a user submits a login form.
    public User login(LoginUser newLoginObject, BindingResult result) {
    	//try to find user
    	Optional<User> potentialUser = userRepo.findByEmail(newLoginObject.getEmail());
    	//not found, return null "email not found"
    	if (potentialUser.isEmpty()) {
    		result.rejectValue("email", "Matches", "Email not found!");
    		return null;
    	}
    	//if user exists, get the user out of Optional Object
    	User user = potentialUser.get();
    	
    	//pw not match, return null "invalid pw"
    	if (!BCrypt.checkpw(newLoginObject.getPassword(), user.getPassword())) {
    	    result.rejectValue("password", "Matches", "Invalid Password!");
    	    return null;
    	}
    	//if we get this far, valid user, return user
    	return user;
    }
    
    public User findUserById(Long id) {
    	Optional<User> user = userRepo.findById(id);
    	return user.get();
    }
}
