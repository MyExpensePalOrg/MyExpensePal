package com.Project.MyExpensePal.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.Project.MyExpensePal.Entity.ExpenseEntity;

import jakarta.transaction.Transactional;

@Repository
public interface ExpensesRepository extends JpaRepository<ExpenseEntity, UUID> {

	@Query(nativeQuery = true, value = "SELECT * FROM EXPENSE_ENTITY WHERE USER_ID=?")
	List<ExpenseEntity> findByUserId(UUID userId);

	@Query(nativeQuery = true, value = "SELECT * FROM my_expense_pal.expense_entity where user_id=? ORDER BY date desc, time desc LIMIT 10;")
	List<ExpenseEntity> tenLatestTransactions(UUID userId);

	@Query(nativeQuery = true, value = "select sum(expense) from my_expense_pal.expense_entity where user_id=? and expense_type=?;")
	Integer expensesTotalBasedOnExpenseType(UUID userId, String expenseType);

	@Query(nativeQuery = true, value = "SELECT expense_type, sum(expense) total FROM my_expense_pal.expense_entity where user_id=? and"
			+ " `date` between ? and ? group by expense_type order by total desc limit 3;")
	List<Map<String, Integer>> getTopThreeCategoriesOfMonth(UUID userId, LocalDate fromDate , LocalDate toDate);

	@Modifying
	@Transactional
	@Query(nativeQuery = true, value = "DELETE FROM my_expense_pal.expense_entity WHERE user_id = :userId;")
	void deleteExpenseByUserId(@Param("userId") UUID userId);
}
