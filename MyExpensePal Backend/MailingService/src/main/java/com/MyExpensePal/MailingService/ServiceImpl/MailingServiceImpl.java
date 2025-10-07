package com.MyExpensePal.MailingService.ServiceImpl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.MyExpensePal.MailingService.Model.UserDto;
import com.MyExpensePal.MailingService.Service.MailingService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailingServiceImpl implements MailingService {

	@Autowired
	JavaMailSender javaMailSender;

	@Autowired
	RestTemplate restTemplate;

	@Value("${spring.mail.username}")
	private String fromEmail;

	@Override
	public String generateAndSendFullReport(UUID userId, String token) throws MessagingException {
		// Creating an entity with userId in it.
		HttpHeaders headers = new HttpHeaders();
		headers.add("userId", userId.toString());
		headers.add("Authorization", token);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		UserDto user = getUser(entity);
		Resource generatedReport = generateExpenseReport(entity);

		return createAMalingObject(user,"", "", generatedReport);

	}

	@Override
	@Scheduled(cron = "0 0 1 * * *")
	public void sendMonthlyReportToUsers() throws MessagingException {
		//Set the Date range
		LocalDateTime today = LocalDateTime.now();
		YearMonth lastMonth = YearMonth.from(today).minusMonths(1);
		LocalDate fromDate = lastMonth.atDay(1);
		LocalDate toDate = lastMonth.atEndOfMonth();
		
		
		for(UserDto user : getAllUserWithPreferencesEnabled()) {
			HttpHeaders headers = new HttpHeaders();
			headers.add("fromDate", fromDate.toString());
			headers.add("toDate", toDate.toString());
			headers.add("userId", user.getUserId().toString());
//			headers.add("Authorization", token);
			System.out.println(fromDate +" - "+toDate);
			HttpEntity<String> entity = new HttpEntity<>(headers);
			Resource generatedReport = generateExpenseReportInDateRangeOf(entity);
			createAMalingObject(user, fromDate.toString(), toDate.toString(), generatedReport);
		}
	}
	 

	private Resource generateExpenseReportInDateRangeOf(HttpEntity<String> entity) {
		// TODO Auto-generated method stub
		return restTemplate.exchange("lb://REPORT-GENERATION-SERVICE/report/generateReportInDateRange", HttpMethod.GET, entity,
				Resource.class).getBody();
	}

	private List<UserDto> getAllUserWithPreferencesEnabled() {
		return restTemplate.exchange("lb://AUTHENTICATION-SERVICE/auth/getAllUsers/true", HttpMethod.GET, null,
				new ParameterizedTypeReference<List<UserDto>>() {
				}).getBody();
	}

	private String createAMalingObject(UserDto user, String fromDate, String toDate, Resource generatedReport) throws MessagingException {
		
		String subject = "Expense Report ("+fromDate+" to "+toDate+")";
		String body = """
				Dear %s %s,

				As requested, please find your expense report in the attachment.
				
				Note: If there are no expenses found you may not find any attachments.
				
				Best regards,
				MyExpensePal
				""".formatted(user.getFirstName(), user.getLastName());

		MimeMessage message = javaMailSender.createMimeMessage();

		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		helper.setFrom(fromEmail);
		helper.setTo(user.getEmail());
		helper.setText(body);
		helper.setSubject(subject);
		if(generatedReport!=null)
			helper.addAttachment(generatedReport.getFilename(), generatedReport);

		javaMailSender.send(message);

		return "Sent Successfully";
	}

	private Resource generateExpenseReport(HttpEntity<String> entity) {
		return restTemplate.exchange("lb://REPORT-GENERATION-SERVICE/report/generateReport", HttpMethod.GET, entity,
				Resource.class).getBody();
	}

	private UserDto getUser(HttpEntity<String> entity) {
		return restTemplate.exchange("lb://AUTHENTICATION-SERVICE/auth/getUser", HttpMethod.GET, entity, UserDto.class)
				.getBody();
	}

}
