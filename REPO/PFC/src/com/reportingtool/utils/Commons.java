package com.reportingtool.utils;

import java.io.FileWriter;
import java.io.IOException;
import java.security.MessageDigest;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.StringTokenizer;
import java.util.TimeZone;
import java.util.Vector;

import org.jdom2.Document;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class Commons {
	public static void writeFile(String title,Document content){
		try {			
		if (!title.endsWith(".xml")	)		
		title=title+".xml";
		FileWriter fw = new FileWriter(title);
		XMLOutputter serializer = new XMLOutputter(Format.getPrettyFormat());
		serializer.output(content, fw);
		
		 }
		  catch (IOException e) {
		  System.out.println(e);
		  }
		
		
	}
	
	public static String docToString(Document content){
		try {			
		
		XMLOutputter serializer = new XMLOutputter(Format.getPrettyFormat());
		String s = serializer.outputString(content);
		return s;
		
		
	 }
		  catch (Exception e) {
		  System.out.println(e);
		  return "ERROR";
		  }
		
		
	}
	
	public static Vector getSchedule(String start,String months){
		Vector<String> result=new Vector<String>();
		int monthStart=Integer.parseInt(start.substring(0,start.indexOf('/')));
		int yearStart=Integer.parseInt(start.substring(start.indexOf('/')+1));
		
	    System.out.println("DATE: "+monthStart+" - "+yearStart);

		
		
		// Constructor allows to set year, month and date
	    Calendar cal1 = new GregorianCalendar();
	    // Constructor could also be empty
	    // Calendar cal2 = new GregorianCalendar();
	    // Change the month
	    cal1.set(Calendar.MONTH, monthStart-1);
	    cal1.set(Calendar.YEAR, yearStart);

	    System.out.println("Year: " + cal1.get(Calendar.YEAR));
	    System.out.println("Month: " + (cal1.get(Calendar.MONTH) + 1));

	    
	    
	    StringTokenizer st=new StringTokenizer(months,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Calendar cal2=new GregorianCalendar();
			   cal2.set(Calendar.MONTH, monthStart-1);
			   cal2.set(Calendar.YEAR, yearStart);
			   
			   int month=Integer.parseInt(s);
			   System.out.print("Report on month:"+month);
			   cal2.add(Calendar.MONTH, month-1);
			   SimpleDateFormat date_format = new SimpleDateFormat("MM/yyyy");
			   System.out.println(". Date Report: "+date_format.format(cal2.getTime()));
			   result.add(date_format.format(cal2.getTime()));
		   }
		   
		   return result;
		
	}
	public static String getDate(){
		Calendar now = Calendar.getInstance();
	    TimeZone timeZone = now.getTimeZone();
	    DateFormat dateFormat = new SimpleDateFormat("dd/MM/yy HH:mm");
	    //return dateFormat.format(now.getTime())+" "+timeZone.getDisplayName();
	    return dateFormat.format(now.getTime());
	}

	public static String createWelcomeMessage(String id, String password) {
		String text="<b><u>Welcome to Reporting Tool UC3M</u></b><br><br>";
		text=text+"Your login credentials are:<br><br><b>Username:</b>"+id+"<br><b>Password:</b>"+password;
		return text;
	}
	
	public static String md5(String clear) throws Exception {
		MessageDigest md = MessageDigest.getInstance("MD5");
		byte[] b = md.digest(clear.getBytes());

		int size = b.length;
		StringBuffer h = new StringBuffer(size);
		for (int i = 0; i < size; i++) {
		int u = b[i] & 255;
		if (u < 16) {
		h.append("0" + Integer.toHexString(u));
		} else {
		h.append(Integer.toHexString(u));
		}
		}
		return h.toString();
		}

	public static boolean checkTimestamp(String date) {
		long server = System.currentTimeMillis();
		long client = Long.valueOf(date);
		System.out.println(server-client);
		if((server-client)<5000){
			return true;	
		}else
			return false;
		
	}
	public static String formatText(String input) {
	    String original = "uηΛιθκνμξρςτ";
	    String ascii = "aaaeeeiiiooouuunAAAEEEIIIOOOUUUNcC";
	    String output = input;
	    for (int i=0; i<original.length(); i++) {
	        output = output.replace(original.charAt(i), ascii.charAt(i));
	    }//for i
	    return output;
	}//remove1
	
}
