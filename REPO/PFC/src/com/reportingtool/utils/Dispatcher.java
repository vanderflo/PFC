package com.reportingtool.utils;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.reportingtool.entities.*;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.filter.Filters;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;
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
	
	
	public static boolean checkReportDate(String date, String init, String finish){
		try{
		System.out.println("Date: "+date+". Date Init: "+init+". Date Finish:"+finish);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dDate = sdf.parse(date , new ParsePosition(0));
		Date dInit = sdf.parse(init , new ParsePosition(0));
		Date dFinish = sdf.parse(finish , new ParsePosition(0));
		System.out.println("Comparing:"+dDate.compareTo(dInit));
		System.out.println("Comparing:"+dDate.compareTo(dFinish));
		
		if ((dDate.compareTo(dInit) >= 0) && (dDate.compareTo(dFinish) <= 0))
			return true;
		else
			return false;
		}catch (Exception e){
			e.printStackTrace();
			return false;
		}
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		System.out.println(System.getProperty("user.dir"));
		Document d = Project.getCurrentProjectDocument(System.getProperty("user.dir")+"/WebContent/files/Test1.xml");
		

		Element root = new Element("report");
		Document docFinal = new Document(root);
		
		//Get init date y duration
		Object metainfo= d.getRootElement().getChild("metainfo");	
		Element eMetainfo=(Element)metainfo;
		String duration = eMetainfo.getChildText("duration");
		String dateStart = eMetainfo.getChildText("dateStart");
		System.out.println("[MAIN] Project duration: "+duration+" | Project start: "+dateStart);
		//Get reportSchedule y crea un array o vector de arrays
		Object reportSchedule = d.getRootElement().getChild("reportSchedule");
		Element eReportSchedule=(Element)reportSchedule;
		for(Object object : eReportSchedule.getChildren("date")) {
			Element eObject=(Element)object;
			String reportDate=eObject.getTextTrim();
			System.out.println("[MAIN]  Processing report date: "+reportDate);
			for(Object o : d.getRootElement().getChildren("workpackage")) {
				Element eO=(Element)o;
				String wpTitle=eO.getAttributeValue("title");
				String wpInit=eO.getChildText("dateInit");
				String wpFinish=eO.getChildText("dateFinish");
				//if report date falls into WP execution
				if(checkReportDate(reportDate,wpInit,wpFinish)){
					System.out.println("[MAIN] "+wpTitle + " applies to report " + reportDate );
					Iterator<Element> iPartners=eO.getDescendants(Filters.element("partner"));
					while (iPartners.hasNext()){
						Element ePartner=iPartners.next();
						System.out.println("[MAIN] ["+reportDate+"] Partner found: "+ ePartner.getAttributeValue("id")+ " for WP: "+wpTitle);
						
						Element e = createSubreport( ePartner.getAttributeValue("id"),eO,eO.getDescendants(Filters.element("task")),reportDate,docFinal);
						e.detach();
						docFinal.getRootElement().addContent(e);
					}
					
				}
				
				
			}
		}
		
		
		Commons.writeFile("testReport",docFinal);
			
	}
		
		
		
		//Commons.writeFile("Resultado5.xml",d);
		/*String start="12/2012";
		String months="1,2,3,4,5,6";
		Vector<String> result=new Vector<String>();
		int monthStart=Integer.parseInt(start.substring(0,start.indexOf('/')));
		int yearStart=Integer.parseInt(start.substring(start.indexOf('/')+1));
		
	    System.out.println("DATE: "+monthStart+" - "+yearStart);

		
		
	    Calendar cal1 = new GregorianCalendar();

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
		   }	*/
	   
	    
	    // Format the output with leading zeros for days and month
	    
		
		
	public static Element createSubreport(String partnerId,Element wp,Iterator<Element> tasks,String reportDate, Document doc){
		
		Element e = Report.addSubReport( doc,reportDate,wp.getAttributeValue("id"),partnerId,tasks);
		
		return e;
		
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
