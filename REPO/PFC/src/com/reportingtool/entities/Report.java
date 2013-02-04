package com.reportingtool.entities;

import java.io.File;
import java.io.IOException;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;

import com.reportingtool.utils.*;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.filter.Filters;
import org.jdom2.input.SAXBuilder;

public class Report {
	
	public static Document createReportFile(String projectID){
		
		Document d = Project.getCurrentProjectDocument(projectID);		

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
		
		
		Commons.writeFile(projectID+"_report",docFinal);
		return docFinal;		
	}
	
	public static Element createSubreport(String partnerId,Element wp,Iterator<Element> tasks,String reportDate, Document doc){
		
		Element e = Report.addSubReport( doc,reportDate,wp.getAttributeValue("id"),partnerId,tasks);
		
		return e;
		
	}
	
	public static Document getCurrentReportFile(String projectID){
		
		SAXBuilder builder = new SAXBuilder();
		File xmlFile = new File(projectID);
		Document document=new Document();
		try {
			document = (Document) builder.build(xmlFile);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("There's no file with this name. Lo creamos y punto.");
			document=createReportFile(projectID);
		}
		
		Element rootNode = document.getRootElement();
		System.out.println(rootNode.getName());
		return document;
		
	}
	

	
	public static Element addSubReport(Document doc,String date, String WP,String partnerID,Iterator<Element> tasks){
		System.out.println("[addSubReport START]");
		Element subreport = new Element("subreport");
		
		subreport.setAttribute("partner", partnerID);
		subreport.setAttribute("WP", WP);
		subreport.setAttribute("date", date);
		
	
	
		Element eExpenses= new Element("expenses");
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
			Element t=tasks.next();
			System.out.println("[addSubReport] Task:"+t.getAttributeValue("title"));
			for(Object oPartner : t.getDescendants(Filters.element("partner"))) {
			Element ePartner=(Element)oPartner;
			System.out.println("[addSubReport] Partner:"+ePartner.getAttributeValue("id"));
				if (ePartner.getAttributeValue("id").equals(partnerID) && checkReportDate(date,t.getChildText("dateInit"),t.getChildText("dateFinish"))){
					subreport.addContent(addTaskReport(WP,partnerID,t.getAttributeValue("id"),"","",""));
				}
			}
			
			
		}
		
		doc.getRootElement().addContent(subreport);	
		System.out.println("[addSubReport END]");
		return subreport;		
	}
	
	
	public static Element addTaskReport(String WP, String partnerID, String taskID, String result,String effort,String work){
		
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
		
		return task;
	}
	

	public static Document updateSubReport(Document doc,String WP, String partnerID,String tag,String value){
		
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("id").equals(WP) && eObject.getAttributeValue("partner").equals(partnerID)){
				//borrar este nodo y reemplazarlo por este nuevo				
				Element eElm=(Element)eObject.getChildren(tag);
				eElm.setText(value);	
				break;
			}						
		}
		
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
