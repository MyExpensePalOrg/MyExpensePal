package com.MyExpensePal.ReportGenerationService.ServiceImpl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;
import org.springframework.web.client.RestTemplate;

import com.MyExpensePal.ReportGenerationService.Model.ExpensesModel;
import com.MyExpensePal.ReportGenerationService.Service.ReportGenerationService;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Component
public class ReportGenerationServiceImpl implements ReportGenerationService {

	@Autowired
	RestTemplate restTemplate;

	@Override
	public ResponseEntity<Resource> exportReport(UUID userId) throws FileNotFoundException, JRException {

		List<ExpensesModel> expenseList = retrieveExpenseList(userId);
		File expenseTemplate = ResourceUtils.getFile("classpath:ExpenseReport.jrxml");
		JasperReport jasperReport = JasperCompileManager.compileReport(expenseTemplate.getAbsolutePath());
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(expenseList);
		Map<String, Object> parameters = new HashMap<>();
		parameters.put("Created By", "Bhargav");
		JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);

		byte[] file = JasperExportManager.exportReportToPdf(jasperPrint);
		return generatedFile(file);
	}

	private List<ExpensesModel> retrieveExpenseList(UUID userId) {
		//Passing UserId in header to Expense Service.
		String api = "lb://MY-EXPENSE-PAL/expense/userId";
		HttpHeaders headers = new HttpHeaders();
		headers.add("userId", userId.toString());
		HttpEntity<String> entity = new HttpEntity<>(headers);
		return restTemplate.exchange(api, HttpMethod.GET, entity, List.class).getBody();
	}

	private ResponseEntity<Resource> generatedFile(byte[] file) {
		ByteArrayResource resource = new ByteArrayResource(file);
		HttpHeaders header = new HttpHeaders();
		header.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=ExpenseReport.pdf");
		return ResponseEntity.ok().headers(header).contentLength(file.length).contentType(MediaType.APPLICATION_PDF)
				.body(resource);

	}

}
