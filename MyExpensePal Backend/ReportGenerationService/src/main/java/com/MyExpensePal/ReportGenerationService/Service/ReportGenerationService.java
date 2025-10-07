package com.MyExpensePal.ReportGenerationService.Service;

import java.io.FileNotFoundException;
import java.util.UUID;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;

@Service
public interface ReportGenerationService {

	public ResponseEntity<Resource> exportReport(UUID userId, String token) throws FileNotFoundException, JRException;

	public ResponseEntity<Resource> generateReportInDateRangeOf(UUID userId, String fromDate, String toDate, String token)
			throws FileNotFoundException, JRException;

}
