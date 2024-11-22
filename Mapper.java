package com.mydata.hms.mapper;

import com.mydata.hms.dto.AdminDto;
import com.mydata.hms.entity.Admin;

public class Mapper {

    public static AdminDto mapToAdminDto(Admin admin){
        return new AdminDto(admin.getId(), admin.getFirstName(), admin.getLastName(), admin.getEmail(), admin.getPassword());
    }

    public static Admin mapToAdmin(AdminDto adminDto){
        return new Admin(adminDto.getId(), adminDto.getFirstName(), adminDto.getLastName(), adminDto.getEmail(), adminDto.getPassword());
    }
}
