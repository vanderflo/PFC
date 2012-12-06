package com.reportingtool.utils;

import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import com.reportingtool.entities.*;
import org.jdom2.Document;

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
		System.out.println(System.currentTimeMillis());
		System.out.println(System.currentTimeMillis());
		System.out.println(System.currentTimeMillis());

		
		for (int i=0;i<1000000;i++){
			i=i*10;
			i=i/10;
			
		}
		
		System.out.println(System.currentTimeMillis());
		System.out.println(System.currentTimeMillis());
		System.out.println(System.currentTimeMillis());
		

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
