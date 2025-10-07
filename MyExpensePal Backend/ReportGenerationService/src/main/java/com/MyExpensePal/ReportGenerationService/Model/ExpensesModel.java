package com.MyExpensePal.ReportGenerationService.Model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.UUID;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ExpensesModel {
	
	private UUID expenseId;
	private UUID userId;
	private String expenseName;
	private Integer expense;
	private ExpenseType expenseType;
	private String location;
	private TransactionType transactionType;
	private LocalDate date;
	private LocalTime time;
	private Date createdOn;
	private Date lastModified;
	

}
