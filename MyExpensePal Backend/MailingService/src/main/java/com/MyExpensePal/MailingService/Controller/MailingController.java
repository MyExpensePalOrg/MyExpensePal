package com.MyExpensePal.MailingService.Controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.MyExpensePal.MailingService.Service.MailingService;

import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/mail/")
public class MailingController {

	@Autowired
	private MailingService mailingService;

	@GetMapping("/sendAllExpensesReport")
	public String sendMail(@RequestHeader("userId") String userId, @RequestHeader("Authorization") String token)
			throws MessagingException {
		return mailingService.generateAndSendFullReport(UUID.fromString(userId), token);
	}

}
