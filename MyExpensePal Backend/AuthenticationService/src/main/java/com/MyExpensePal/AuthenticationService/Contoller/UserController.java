package com.MyExpensePal.AuthenticationService.Contoller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MyExpensePal.AuthenticationService.Dto.UpdateUserDto;
import com.MyExpensePal.AuthenticationService.Dto.UserDto;
import com.MyExpensePal.AuthenticationService.Dto.UserLoginDto;
import com.MyExpensePal.AuthenticationService.Entity.UserEntity;
import com.MyExpensePal.AuthenticationService.Exception.EMAIL_ALREADY_IN_USE_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Exception.INCORRECT_PASSWORD_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Exception.USER_NOT_FOUND_EXCEPTION;
import com.MyExpensePal.AuthenticationService.Service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<UserDto> registerUser(@RequestBody UserEntity user) {
		return userService.registerUser(user);
	}

	@PostMapping("/login")
	public ResponseEntity<String> loginUser(@RequestBody UserLoginDto loginDto) {
		return userService.validateUser(loginDto);
	}

	@PostMapping("/validateToken")
	public ResponseEntity<UUID> validateToken(@RequestHeader(value = "Authorization") String authHeader)
			throws USER_NOT_FOUND_EXCEPTION {
		if (authHeader == null || !authHeader.startsWith("Bearer "))
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);

		String token = authHeader.substring(7);
		return userService.validateToken(token);
	}

	@GetMapping("/getUserByEmail/{email}")
	public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) throws USER_NOT_FOUND_EXCEPTION {
		return userService.findUserByEmail(email);
	}

	@GetMapping("/getUser")
	public ResponseEntity<UserDto> getUSerById(@RequestHeader("userId") String userId) throws USER_NOT_FOUND_EXCEPTION {
		return userService.findUserById(UUID.fromString(userId));
	}
	
	@GetMapping("/getAllUsers/{receiveMonthlyExpenseReport}")
	public ResponseEntity<List<UserDto>> getAllUsers(@PathVariable boolean receiveMonthlyExpenseReport){
		return userService.findUsersForMonthlyReport(receiveMonthlyExpenseReport);
	}

	@GetMapping("/isUserInDatabase")
	public ResponseEntity<Boolean> isUserExistsInDatabase(@RequestHeader("userId") String userId) {
		return userService.isUserExistsInDatabase(UUID.fromString(userId));
	}

	@PutMapping("/updateUser")
	public ResponseEntity<UserDto> updateUser(@RequestHeader("userId") String userId,
			@RequestBody UpdateUserDto updateUserDto)
			throws USER_NOT_FOUND_EXCEPTION, EMAIL_ALREADY_IN_USE_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION {
		return userService.updateUser(userId, updateUserDto);
	}

	@DeleteMapping("/resetAccount")
	public ResponseEntity<Boolean> resetAccount(@RequestHeader("userId") String userId,
			@RequestHeader("password") String password, @RequestHeader("Authorization") String token) throws USER_NOT_FOUND_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION {
		return userService.resetAccount(UUID.fromString(userId), password, token);
	}

	// Pass password in header
	@DeleteMapping("/deleteAccount")
	public ResponseEntity<Boolean> deleteUser(@RequestHeader("userId") String userId,
			@RequestHeader("password") String password, @RequestHeader("Authorization") String token) throws USER_NOT_FOUND_EXCEPTION, INCORRECT_PASSWORD_EXCEPTION {
		return userService.deleteUserFromDatabase(UUID.fromString(userId), password, token);
	}

}
