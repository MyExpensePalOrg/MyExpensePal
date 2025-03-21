package com.MyExpensePal.ReportGenerationService.Controller;

import java.io.FileNotFoundException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MyExpensePal.ReportGenerationService.Service.ReportGenerationService;

import net.sf.jasperreports.engine.JRException;

@RestController
@RequestMapping("/report/")
public class ReportGeneratorController {
	
	@Autowired
	ReportGenerationService generationService;
	
	@GetMapping("/generateReport")
	public ResponseEntity<Resource> generateReport(@RequestHeader("userId") String userId) throws FileNotFoundException, JRException {
		return generationService.exportReport(UUID.fromString(userId));
	}

}
