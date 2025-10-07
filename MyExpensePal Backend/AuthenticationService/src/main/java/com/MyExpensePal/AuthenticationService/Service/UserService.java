package com.MyExpensePal.AuthenticationService.Service;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.MyExpensePal.AuthenticationService.Dto.UpdateUserDto;
import com.MyExpensePal.AuthenticationService.Dto.UserDto;
import com.MyExpensePal.AuthenticationService.Dto.UserLoginDto;
import com.MyExpensePal.AuthenticationService.Entity.UserEntity;
import com.MyExpensePal.AuthenticationService.Exception.EMAIL_ALREADY_IN_USE_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Exception.INCORRECT_PASSWORD_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Exception.USER_NOT_FOUND_EXCEPTION;
import com.github.andrewoma.dexx.collection.List;

@Service
public interface UserService {

	public ResponseEntity<UserDto> registerUser(UserEntity user);

	public ResponseEntity<String> validateUser(UserLoginDto loginDto);

	public ResponseEntity<UUID> validateToken(String token) throws USER_NOT_FOUND_EXCEPTION;

	public ResponseEntity<UserDto> findUserByEmail(String email) throws USER_NOT_FOUND_EXCEPTION;

	public ResponseEntity<Boolean> deleteUserFromDatabase(UUID userId, String password, String token)
			throws USER_NOT_FOUND_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION;

	public ResponseEntity<UserDto> findUserById(UUID userId) throws USER_NOT_FOUND_EXCEPTION;

	public ResponseEntity<Boolean> isUserExistsInDatabase(UUID userId);

	public ResponseEntity<UserDto> updateUser(String userId, UpdateUserDto updateUserDto)
			throws USER_NOT_FOUND_EXCEPTION, EMAIL_ALREADY_IN_USE_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION;

	public ResponseEntity<Boolean> resetAccount(UUID userId, String password, String token)
			throws USER_NOT_FOUND_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION;

	public ResponseEntity<java.util.List<UserDto>> findUsersForMonthlyReport(boolean receiveMonthlyExpenseReport);

}
