package com.MyExpensePal.AuthenticationService.Repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.MyExpensePal.AuthenticationService.Entity.UserEntity;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, UUID> {

	@Query(value = "SELECT * FROM USER_ENTITY WHERE EMAIL=?", nativeQuery = true)
	UserEntity findByEmail(String email);

	boolean existsByEmail(String email);

	@Query(value = "SELECT A.* FROM USER_ENTITY A JOIN user_settings_entity B WHERE A.USER_ID=B.USER_ID AND receive_monthly_expense_report=?;", nativeQuery = true)
	List<UserEntity> findUsersWithPreferenceEnabled(boolean receiveMonthlyExpenseReport);

}
