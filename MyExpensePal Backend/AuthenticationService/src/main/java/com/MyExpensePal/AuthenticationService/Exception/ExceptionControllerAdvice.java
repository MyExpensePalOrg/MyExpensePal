package com.MyExpensePal.AuthenticationService.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {

	@ExceptionHandler(USER_NOT_FOUND_EXCEPTION.class)
	public ResponseEntity<String> expenseNotFound(USER_NOT_FOUND_EXCEPTION exception){
		return new ResponseEntity<String>("The User you are searching is not in the database.", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(EMAIL_ALREADY_IN_USE_EXCEPTION.class)
	public ResponseEntity<String> emailAlreadyInUse(EMAIL_ALREADY_IN_USE_EXCEPTION exception) {
		return new ResponseEntity<String>("Email already in use, trying different mail.", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(INCORRECT_PASSWORD_EXCEPTION.class)
	public ResponseEntity<String> emailAlreadyInUse(INCORRECT_PASSWORD_EXCEPTION exception) {
		return new ResponseEntity<String>("Incorrect Password.", HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(ENTITY_FAILED_TO_SAVE_EXCEPTION.class)
	public ResponseEntity<String> emailAlreadyInUse(ENTITY_FAILED_TO_SAVE_EXCEPTION exception) {
		return new ResponseEntity<String>("Entity Failed to save", HttpStatus.OK);
	}
	
}
