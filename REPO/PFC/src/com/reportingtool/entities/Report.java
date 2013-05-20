package com.reportingtool.entities;

import java.io.File;
import java.io.IOException;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Vector;

import java.util.Iterator;

import com.reportingtool.utils.*;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.filter.Filters;
import org.jdom2.input.SAXBuilder;

public class Report {
	
	public static Document createReportFile(String projectID){		

		Element root = new Element("report");
		Document doc = new Document(root);
		Commons.writeFile(projectID+"_report",doc);
		return doc;		
	}
	
	public static  Document fillReportFile(Document d){
		Element root = new Element("report");
		Document doc = new Document(root);			
		Document partner=Partner.getCurrentPartnersFile();
		HashMap<String, String> partnersMap=Partner.getPartnersName(partner);
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
				String wpID=eO.getAttributeValue("id");
				String wpInit=eO.getChildText("dateInit");
				String wpFinish=eO.getChildText("dateFinish");
				//if report date falls into WP execution
				if(checkReportDate(reportDate,wpInit,wpFinish)){
					System.out.println("[MAIN] "+wpTitle + " applies to report " + reportDate );
					Iterator<Element> iPartners=eO.getDescendants(Filters.element("partner"));
					Vector<String> partners = new Vector<String>();
					while (iPartners.hasNext()){
						Element ePartner=iPartners.next();
						if (!partners.contains(ePartner.getAttributeValue("id"))){
						partners.add(ePartner.getAttributeValue("id"));
						//System.out.println(reportDate+" Partner found:"+ ePartner.getAttributeValue("id")+ "for WP: "+wpTitle);
						System.out.println("<report WP="+wpTitle+" partner="+ePartner.getAttributeValue("id")+" reportDate="+reportDate);
						addSubReport(doc,reportDate, wpTitle,wpID,ePartner.getAttributeValue("id"),partnersMap.get(ePartner.getAttributeValue("id")),eO.getDescendants(Filters.element("task")));
						}else
							System.out.println("[REPORT] Partner="+ePartner.getAttributeValue("id")+" was already processed for WP "+wpTitle );
					}
				}

			}
		}
		System.out.println(Commons.docToString(doc));
		
		
		Commons.writeFile(d.getRootElement().getAttributeValue("id")+"_report",doc);
		return doc;	
	}
	
	
	public static Document getCurrentReportFile(String projectID){
		
		System.out.println("getCurrentReportFile "+projectID);
		SAXBuilder builder = new SAXBuilder();
		File xmlFile = new File(projectID);
		Document document=new Document();
		try {
			document = (Document) builder.build(xmlFile);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("There's no file with this name. Lo creamos y punto.");
			document=createReportFile(projectID);
		}
		
		Element rootNode = document.getRootElement();
		System.out.println(rootNode.getName());
		return document;
		
	}
	

	

	public static Document addSubReport(Document doc,String date, String WP,String wpID,String partnerID,String partnerName,Iterator<Element> tasks){
		

		Element subreport = new Element("subreport");
		
		subreport.setAttribute("partner", partnerID);
		subreport.setAttribute("WP", WP);
		subreport.setAttribute("WPID", wpID);
		subreport.setAttribute("date", date);
		subreport.setAttribute("partnerName", partnerName);

	
		Element eExpenses= new Element("expenses");
		Element concept = new Element("concept");
		Element description = new Element("description");
		Element amount = new Element("amount");
		eExpenses.setAttribute("id","0");
		eExpenses.addContent(concept);
		eExpenses.addContent(description);
		eExpenses.addContent(amount);


		Element eFeedback= new Element("feedback");
		
		Element eStatus= new Element("status");
		eStatus.addContent("empty");
		
		Element eFlag= new Element("flag");		
			Element eExplanation= new Element("explanation");
			eFlag.addContent(eExplanation);
		

		subreport.addContent(eExpenses);
		subreport.addContent(eStatus);
		subreport.addContent(eFlag);
		subreport.addContent(eFeedback);
		
		while (tasks.hasNext()){
		Element task=tasks.next();
		Iterator<Element> partnersForThisTask=task.getDescendants(Filters.element("partner"));
		while(partnersForThisTask.hasNext()){
			Element p = partnersForThisTask.next();
			if(p.getAttributeValue("id").equals(partnerID)){
				Element tReport=addTaskReport(task.getAttributeValue("id"),task.getAttributeValue("title"));
				subreport.addContent(tReport);
				System.out.println("Task "+task.getAttributeValue("id")+" added to report "+partnerID+"|"+WP+"|"+date);
				break;
			}
			
		}
		

		}
		
		System.out.println("[REPORT] Adding subreport");
		doc.getRootElement().addContent(subreport);	
		

		return doc;		
	}
	
	public static Element addTaskReport(String taskID,String taskTitle){
		
		Element task = new Element("task");
		task.setAttribute("id",taskID);
		task.setAttribute("title",taskTitle);

		
		Element eWork= new Element("work");
		
		Element eResult= new Element("result");
		
		Element eEffort= new Element("effort");
		
		task.addContent(eWork);
		task.addContent(eResult);
		task.addContent(eEffort);

		
		return task;
	}
	

	public static Element addTaskReport(Document doc, String date, String WP, String partnerID, String taskID, String result,String effort,String work){

		
		Element task = new Element("task");
		task.setAttribute("id",taskID);
		
		Element eWork= new Element("work");
		eWork.addContent(work);
		
		Element eResult= new Element("result");
		eResult.addContent(result);
		
		Element eEffort= new Element("effort");
		eEffort.addContent(effort);
		

		
		task.addContent(eWork);
		task.addContent(eResult);
		task.addContent(eEffort);		
		

		task.addContent(eWork);
		task.addContent(eResult);
		task.addContent(eEffort);
		
		/** TBD Paso el Doc o lo recupero desde aquí???
		
		//Get workpackage y añade info de este task. Hay que incluir info de partner.
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("id").equals(WP) && eObject.getAttributeValue("partner").equals(partnerID)){
				//borrar este nodo y reemplazarlo por este nuevo
				for(Object o : eObject.getChildren("task")) {
					Element eTask=(Element)o;
					if (eTask.getAttribute("id").equals(taskID))
						eObject.removeContent(eTask);						
				}

				eObject.addContent(task);
				break;
				
			}						
		}*/
		
		

		return task;
	}
	

	public static Document updateSubReport(Document doc,String WP, String partnerID,String date,String field,String value,String path){
System.out.println("Modifying subreport for WP:"+WP+"|partnerID:"+partnerID+"|date:"+date);
		for(Object object : doc.getRootElement().getChildren("subreport")) {
			Element eObject=(Element)object;
			if (eObject.getAttributeValue("WPID").equals(WP) && eObject.getAttributeValue("partner").equals(partnerID)&&eObject.getAttributeValue("date").equals(date)){
				eObject.getChild(field).setText(value);
				System.out.println("Report - Subreport modified, field "+field+" value "+value);
				break;
			}						
		}
		System.out.println("about to write "+path);
		Commons.writeFile(path,doc);
		return doc;
	}
	
	public static Document updateTaskReport(Document doc,String WP, String partnerID,String date,String task,String field,String value,String path){
		
		System.out.println("Modifying task for WP:"+WP+"|partnerID:"+partnerID+"|date:"+date+"|task:"+task);
		
		for(Object object : doc.getRootElement().getChildren("subreport")) {
			Element eObject=(Element)object;			
			if (eObject.getAttributeValue("WPID").equals(WP) && eObject.getAttributeValue("partner").equals(partnerID)&&eObject.getAttributeValue("date").equals(date)){
				for(Object tObject : eObject.getChildren("task")) {
					Element taskObject=(Element)tObject;
					if(taskObject.getAttributeValue("id").equals(task)){
						taskObject.getChild(field).setText(value);
						System.out.println("Report - Task modified, field "+field+" value "+value);
						break;
					}
				}
				
				break;
			}						
		}
		System.out.println("about to write tsk on "+path);
		Commons.writeFile(path,doc);
		return doc;
	}
	
	
	public static Document getSubReportForPartner(Document doc,String WP,String partnerID){
		Document d = new Document(doc.getRootElement());		
		for(Object object : doc.getRootElement().getChildren("subreport")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("partnerID").equals(partnerID) && eObject.getAttributeValue("wpID").equals(WP)){
				d.addContent(eObject);
			}						
		}
		
		return d;
		
		
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
	

	
	

}
