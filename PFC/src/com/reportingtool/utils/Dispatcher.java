package com.reportingtool.utils;

import java.io.IOException;
import com.reportingtool.entities.*;
import org.jdom2.Document;

public class Dispatcher {

	/**
	 * @param args
	 */
	public static void main(String[] args) throws IOException {
		Document d = Project.getProjectInformation("Test.xml");
		Commons.writeFile("Resultado.xml",d);
		

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
		
		String id;
		String title = "Test";
		String dateStart = "2012-09-01";
		String dateFinish = "2012-12-01";
		String dateStartRevised;
		String dateFinishRevised;
		String idPartner = "001";
		String partners="001,002";
		
		try {
			System.out.println(System.getProperty("user.dir"));
			Document doc = Project.createProject(title,dateStart,dateFinish,idPartner);
			doc=Project.addWP(doc,"WP1",partners);
			doc=Project.addTask(doc,"WP1", "Task1", "Long description", partners, dateStart, dateFinish);
			doc=Project.addTask(doc,"WP1", "Task2", "Longer description", partners, dateStart, dateFinish);
			doc=Project.addSchedule(doc,"2012-09-20,2012-10-20");
			Commons.writeFile(title,doc);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			System.out.println(e);
		}

		
	}
	
	
}
