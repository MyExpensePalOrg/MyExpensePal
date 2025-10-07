package com.MyExpensePal.AuthenticationService.ServiceImpl;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.MyExpensePal.AuthenticationService.Dto.UserSettingsDto;
import com.MyExpensePal.AuthenticationService.Entity.UserEntity;
import com.MyExpensePal.AuthenticationService.Entity.UserSettingsEntity;
import com.MyExpensePal.AuthenticationService.Exception.ENTITY_FAILED_TO_SAVE_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Exception.USER_NOT_FOUND_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Mappers.SettingsMapper;
import com.MyExpensePal.AuthenticationService.Repository.UserRepository;
import com.MyExpensePal.AuthenticationService.Repository.UserSettingsRepository;
import com.MyExpensePal.AuthenticationService.Service.SettingsService;

@Service
public class SettingsServiceImpl implements SettingsService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserSettingsRepository settingsRepository;

	@Override
	public ResponseEntity<UserSettingsDto> saveSettings(UUID userId, UserSettingsDto settingsDto)
			throws USER_NOT_FOUND_EXCEPTION, ENTITY_FAILED_TO_SAVE_EXCEPTION {
		UserSettingsEntity settingsEntity = SettingsMapper.DtoToEntity(settingsDto);
		UserEntity userEntity = userRepository.findById(userId).get();
		if (userEntity == null)
			throw new USER_NOT_FOUND_EXCEPTION();
		settingsEntity.setUserEntity(userEntity);
		try {
			return new ResponseEntity<UserSettingsDto>(
					SettingsMapper.EntityToDto(settingsRepository.save(settingsEntity)), HttpStatus.CREATED);
		} catch (Exception e) {
			throw new ENTITY_FAILED_TO_SAVE_EXCEPTION();
		}
	}

	@Override
	public ResponseEntity<UserSettingsDto> getSettingsByUserId(UUID userId) {
		UserSettingsEntity settings = settingsRepository.findByUserId(userId);
		return new ResponseEntity<UserSettingsDto>(SettingsMapper.EntityToDto(settings), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<UserSettingsDto> updateSettings(UUID userId, UserSettingsDto newUserSettings)
			throws ENTITY_FAILED_TO_SAVE_EXCEPTION {
		UserSettingsEntity settings = settingsRepository.findByUserId(userId);
		settings.setIncome(newUserSettings.getIncome());
		settings.setReceiveMonthlyExpenseReport(newUserSettings.isReceiveMonthlyExpenseReport());
		try {
			return new ResponseEntity<UserSettingsDto>(SettingsMapper.EntityToDto(settingsRepository.save(settings)),
					HttpStatus.OK);
		} catch (Exception e) {
			throw new ENTITY_FAILED_TO_SAVE_EXCEPTION();
		}
	}

}
