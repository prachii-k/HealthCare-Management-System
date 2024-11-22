package com.mydata.hms.controller;

import com.mydata.hms.dto.AdminDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mydata.hms.entity.Admin;
import com.mydata.hms.entity.Appointment;
import com.mydata.hms.entity.User;
import com.mydata.hms.service.AdminService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	AdminService as;
	@PostMapping("/register")
	public ResponseEntity<AdminDto> saveAdmin(@RequestBody Admin admin) {
		AdminDto adminDto = as.saveAdmin(admin);

		return ResponseEntity.ok(adminDto);
	} 
	@PostMapping("/login")
	public boolean loginAdmin(@RequestBody User user) {
        return as.login(user.getEmail(), user.getPassword());
    }
}
