package com.mydata.hms.service;

import com.mydata.hms.dto.AdminDto;
import com.mydata.hms.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mydata.hms.entity.Admin;
import com.mydata.hms.entity.User;
import com.mydata.hms.repository.AdminRepository;

@Service
public class AdminService {
	@Autowired
	AdminRepository ar;
	public AdminDto saveAdmin(Admin admin)
	{
		Admin savedAdmin =  ar.save(admin);

		return Mapper.mapToAdminDto(savedAdmin);
	}
	public boolean login(String email, String password) {
        String dbPass = ar.findPasswordByEmail(email);

        if (dbPass != null) {
            return dbPass.equals(password);
		}
        return false;
    }

	}
