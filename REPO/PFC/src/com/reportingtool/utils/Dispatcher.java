package com.reportingtool.utils;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.reportingtool.entities.*;
import org.jdom2.Document;
import org.jdom2.Element;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.StringTokenizer;
import java.util.Vector;

public class Dispatcher {

	private static final AtomicLong LAST_TIME_MS = new AtomicLong();

	
	public static long uniqueCurrentTimeMS() {
	    long now = System.currentTimeMillis();
	    while(true) {
	        long lastTime = LAST_TIME_MS.get();
	        if (lastTime >= now)
	            now = lastTime+1;
	        if (LAST_TIME_MS.compareAndSet(lastTime, now))
	            return now;
	    }
	}
	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		System.out.println(System.getProperty("user.dir"));
		//Document d = Project.getProjectInformation(System.getProperty("user.dir")+"/WebContent/files/Test2.xml","");
		//Commons.writeFile("Resultado5.xml",d);
		String start="12/2012";
		String months="1,2,3,4,5,6";
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
	    
	    
	    // Format the output with leading zeros for days and month
	    
		

	}
	
	public static void getPartnerParamsAndStart(){
		
		try {
			System.out.println(System.getProperty("user.dir"));
			Document doc = Partner.getCurrentPartnersFile(CST.PARTNERS_FILE);
			doc = Partner.addPartner(doc,"001","UPM","test@upm.es","Lolo P,Manu G");
			doc = Partner.addPartner(doc,"002","UC3M","test@uc3m.es","Paco P,Lisardo G");
			Partner.getPartnerInfo(doc,"001");
			Commons.writeFile(CST.PARTNERS_FILE,doc);	
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
		}

		
	}
	
	/**
	 * 
	 * 
	 */
	public static void getProjectParamsAndStart(){
		
		/*String id= "Test";
		String title = "Test";
		String dateStart = "2012-09-01";
		String dateFinish = "2012-12-01";
		String idPartner = "001";
		String partners="001,002";
		
		try {
			System.out.println(System.getProperty("user.dir"));
			Document doc = Project.createProject(id,title,dateStart,dateFinish,idPartner,"long desc","ongoing");
			doc=Project.addWP(doc,"WP1",partners);
			doc=Project.addTask(doc,"WP1", "Task1", "Long description", partners, dateStart, dateFinish);
			doc=Project.addTask(doc,"WP1", "Task2", "Longer description", partners, dateStart, dateFinish);
			doc=Project.addSchedule(doc,"2012-09-20,2012-10-20");
			Commons.writeFile(title,doc);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
		}*/

		
	}
	
	
}
