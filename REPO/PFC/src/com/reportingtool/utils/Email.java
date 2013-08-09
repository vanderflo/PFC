package com.reportingtool.utils;


import java.io.UnsupportedEncodingException;
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
 
public class Email {
	static Properties mailServerProperties;
    static Session getMailSession;
    static MimeMessage generateMailMessage;
 
    public static void main(String args[]) throws AddressException, MessagingException, UnsupportedEncodingException {
        //generateAndSendEmail();
        System.out.println("\n\n ===> Your Java Program has just sent an Email successfully. Check your email..");
    }
 
    public static void generateAndSendEmail(String text,String dest) throws AddressException, MessagingException, UnsupportedEncodingException {
 
//Step1        
        System.out.println("\n 1st ===> setup Mail Server Properties..");
        mailServerProperties = System.getProperties();
        mailServerProperties.put("mail.smtp.port", "587");
        mailServerProperties.put("mail.smtp.auth", "true");
        mailServerProperties.put("mail.smtp.starttls.enable", "true");
        System.out.println("Mail Server Properties have been setup successfully..");
 
//Step2        
        System.out.println("\n\n 2nd ===> get Mail Session..");
        getMailSession = Session.getDefaultInstance(mailServerProperties, null);
        generateMailMessage = new MimeMessage(getMailSession);
        generateMailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(dest));
        generateMailMessage.addRecipient(Message.RecipientType.CC, new InternetAddress("fernando6682@gmail.com"));
        generateMailMessage.setSubject("Reporting Tool - Action Needed");
		String emailBody=text;
		generateMailMessage.setContent(emailBody, "text/html");
        generateMailMessage.setFrom(new InternetAddress("reportingtooluc3m@gmail.com", "Reporting Tool UC3M"));
        System.out.println("Mail Session has been created successfully..");
 
//Step3        
        System.out.println("\n\n 3rd ===> Get Session and Send mail");
        Transport transport = getMailSession.getTransport("smtp");
        // Enter your correct gmail UserID and Password
        transport.connect("smtp.gmail.com", "reportingtooluc3m@gmail.com", "Sabatiniuc3m");
        transport.sendMessage(generateMailMessage, generateMailMessage.getAllRecipients());
        transport.close();
    }
}