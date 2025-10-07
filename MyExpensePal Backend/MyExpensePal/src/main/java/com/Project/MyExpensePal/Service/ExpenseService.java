package com.Project.MyExpensePal.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.Project.MyExpensePal.Entity.ExpenseEntity;
import com.Project.MyExpensePal.Exception.NO_FILTERS_TO_GENETRATE_QUERY_EXCEPTION;
import com.Project.MyExpensePal.Exception.NO_USER_EXPENSES_FOUND_EXCEPTION;



@Service
public interface ExpenseService {

	public ResponseEntity<String> saveExpenseToDatabase(String userId, ExpenseEntity expensesModel);

	public ResponseEntity<ExpenseEntity> retreiveExpenseByExpenseId(UUID expenseId);

	public ResponseEntity<List<ExpenseEntity>> retreiveExpenseByUserId(UUID userId) throws NO_USER_EXPENSES_FOUND_EXCEPTION;

	public ResponseEntity<String> updateExpense(UUID expenseId, ExpenseEntity expensesModel);

	public ResponseEntity<String> deleteExpense(UUID expenseId);

	public ResponseEntity<List<ExpenseEntity>> tenLatestTransactions(UUID userId) throws NO_USER_EXPENSES_FOUND_EXCEPTION;

	public ResponseEntity<Integer> findTotalBasedOnExpenseType(UUID userId, String expenseType);

	public ResponseEntity<List<Map<String, Integer>>> getTopThreeCategoriesOfMonth(UUID userId, String startDate, String endDate);

	public ResponseEntity<List<ExpenseEntity>> getMatchingEntitiesUsingFilter(String userId, ExpenseEntity filterData) throws NO_FILTERS_TO_GENETRATE_QUERY_EXCEPTION;

	public ResponseEntity<Boolean> deleteAllExpensesOfUser(UUID userId);

	public ResponseEntity<List<ExpenseEntity>> getExpensesInDateRangeOf(UUID userId, String fromDate,
			String toDate);

}
