package com.mgbholdinsinc.labmanager.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mgbholdinsinc.labmanager.models.LoginUser;
import com.mgbholdinsinc.labmanager.models.User;
import com.mgbholdinsinc.labmanager.services.UserService;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping("/")
	public String index(Model model) {
		model.addAttribute("newUser", new User());
		model.addAttribute("newLogin", new LoginUser());
		return "index.jsp";
	}
	
	@PostMapping("/register")
    public String register(@Valid @ModelAttribute("newUser") User newUser, 
            BindingResult result, Model model, HttpSession session) {
		if (result.hasErrors()) {
			model.addAttribute("newUser", newUser);
			model.addAttribute("newLogin", new LoginUser());
			return "index.jsp";
		}
		//try to create user --returns null if anything fails
		User user = userService.register(newUser, result);
		//if user is null, return back to form
		if(user == null) {
			model.addAttribute("newUser", newUser);
			model.addAttribute("newLogin", new LoginUser());
			return "index.jsp";
		} else {
			//login the validated user
			session.setAttribute("id", user.getId());
			session.setAttribute("userName", user.getName());
			return "redirect:/classes";
		}
    }
	
    @PostMapping("/login")
    public String login(@Valid @ModelAttribute("newLogin") LoginUser newLogin, 
            BindingResult result, Model model, HttpSession session) {
    	if (result.hasErrors()) {
			model.addAttribute("newUser", new User());
			model.addAttribute("newLogin", newLogin);
			return "index.jsp";
		}
    	//try to create user --returns null if anything fails
        User user = userService.login(newLogin, result);
        //if user is null, return back to form
        if (user == null) {
        	model.addAttribute("newLogin", newLogin);
        	model.addAttribute("newUser", new User());
        	return "index.jsp";
        } else {
        	//login the validated user
        	session.setAttribute("id", user.getId());
        	session.setAttribute("userName", user.getName());
        	return "redirect:/classes";
        }
    }
    
    @GetMapping("/logout")
    public String logout(HttpSession session) {
    	try {
    		session.invalidate();
    	} catch (IllegalStateException e) {
    		System.err.println("No one was logged in" + e);
    		return "redirect:/";
    	}
    	return "redirect:/";
    }
}
