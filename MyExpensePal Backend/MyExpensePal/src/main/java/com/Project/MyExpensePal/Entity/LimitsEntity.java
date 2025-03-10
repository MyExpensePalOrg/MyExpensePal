package com.Project.MyExpensePal.Entity;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class LimitsEntity {

	// Food, Bills, Entertainment
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID limitId;
	@Column(nullable = false)
	private UUID userId;
	private Long limitForFood;
	private Long limitForBills;
	private Long limitForEntertainment;
}
