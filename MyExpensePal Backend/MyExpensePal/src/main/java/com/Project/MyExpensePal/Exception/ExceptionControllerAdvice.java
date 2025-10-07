package com.Project.MyExpensePal.Exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionControllerAdvice {

	@ExceptionHandler(EXPENSE_ID_NOT_FOUND.class)
	public ResponseEntity<String> expenseNotFound(EXPENSE_ID_NOT_FOUND exception){
		return new ResponseEntity<String>("The expense Id you are searching is not in the database.", HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(NO_USER_EXPENSES_FOUND_EXCEPTION.class)
	public ResponseEntity<String> userExpenseNotFound(NO_USER_EXPENSES_FOUND_EXCEPTION exception){
		return new ResponseEntity<String>("No expenses found in the database of user id.", HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(HttpMessageNotReadableException.class)
	public ResponseEntity<String> handleIOException(HttpMessageNotReadableException e) {
	    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Malformed JSON request: " + e.getMessage());
	}
	
	@ExceptionHandler(NO_FILTERS_TO_GENETRATE_QUERY_EXCEPTION.class)
	public ResponseEntity<String> handleIOException(NO_FILTERS_TO_GENETRATE_QUERY_EXCEPTION e) {
		return new ResponseEntity<String>("Query Building Failed.", HttpStatus.NOT_FOUND);
	}
	
	

}
