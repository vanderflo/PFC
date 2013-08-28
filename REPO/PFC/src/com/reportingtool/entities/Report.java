package com.reportingtool.entities;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Vector;

import java.util.Iterator;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;

import com.reportingtool.utils.*;

import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.Namespace;
import org.jdom2.filter.ElementFilter;
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
		String dateStart = eMetainfo.getChildText("dateStart");
		String dateFinish = eMetainfo.getChildText("dteFinish");

		System.out.println("[MAIN] | Project start: "+dateStart +" Project Finish: "+dateFinish);
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
				Element eCoord=eO.getChild("coordinator");
				String leader=eCoord.getChild("leader").getAttributeValue("id");
				//if report date falls into WP execution
				if(checkReportDate(reportDate,wpInit,wpFinish)){
					System.out.println("[MAIN] "+wpTitle + " applies to report " + reportDate );
					Iterator<Element> iPartners=eO.getDescendants(Filters.element("partnerWP"));
					Vector<String> partners = new Vector<String>();
					while (iPartners.hasNext()){
						Element ePartner=iPartners.next();
						if (!partners.contains(ePartner.getAttributeValue("id"))){
						partners.add(ePartner.getAttributeValue("id"));
						String partnerEffortWP=ePartner.getAttributeValue("effort");
						//System.out.println(reportDate+" Partner found:"+ ePartner.getAttributeValue("id")+ "for WP: "+wpTitle);
						System.out.println("<report WP="+wpTitle+" partner="+ePartner.getAttributeValue("id")+" reportDate="+reportDate);
						addSubReport(doc,reportDate, wpTitle,wpID,ePartner.getAttributeValue("id"),partnersMap.get(ePartner.getAttributeValue("id")),eO.getDescendants(Filters.element("task")),partnerEffortWP,leader);
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
	

	

	public static Document addSubReport(Document doc,String date, String WP,String wpID,String partnerID,String partnerName,Iterator<Element> tasks,String wpEffort,String leader){
		

		Element subreport = new Element("subreport");
		
		subreport.setAttribute("partner", partnerID);
		subreport.setAttribute("WP", WP);
		subreport.setAttribute("WPID", wpID);
		subreport.setAttribute("date", date);
		subreport.setAttribute("leader", leader);
		subreport.setAttribute("partnerName", partnerName);

		Element eLastUpdate= new Element("lastupdate");
		Element eWpEffort= new Element("wpEffort");
		eWpEffort.addContent(wpEffort);
		
		Element eCurrentEffort= new Element("currentEffort");
		eCurrentEffort.addContent("0");
		Element eExpenses= new Element("expenses");
		Element concept = new Element("concept");
		Element description = new Element("description");
		Element amount = new Element("amount");
		eExpenses.setAttribute("id","0");
		eExpenses.addContent(concept);
		eExpenses.addContent(description);
		eExpenses.addContent(amount);
		eLastUpdate.setText("NEVER UPDATED");
		

		Element eFeedback= new Element("feedback");
		
		Element eStatus= new Element("status");
		eStatus.addContent("empty");
		
		Element eFlag= new Element("flag");		
		Element eExplanation= new Element("explanation");
		

		subreport.addContent(eExpenses);
		subreport.addContent(eWpEffort);
		subreport.addContent(eCurrentEffort);
		subreport.addContent(eStatus);
		subreport.addContent(eFlag);
		subreport.addContent(eExplanation);
		subreport.addContent(eFeedback);
		subreport.addContent(eLastUpdate);

		
		while (tasks.hasNext()){
		Element task=tasks.next();
		System.out.println("Tasks!");
		Iterator<Element> partnersForThisTask=task.getDescendants(Filters.element("partnerTask"));
		while(partnersForThisTask.hasNext()){
			System.out.println("Tasks-partner");
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
		Element personalEffort= new Element("personalEffort");
		Element person= new Element("person");
		Element effortPerson= new Element("effortPerson");


		personalEffort.setAttribute("id","0");
		personalEffort.addContent(person);
		personalEffort.addContent(effortPerson);
		eEffort.addContent(personalEffort);

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
				if (field.equals("comment")){
					Element eNewComment=new Element("comment");
					eNewComment.setAttribute("type", "COMMENT");
					eNewComment.setAttribute("time", Commons.getDate());
					eNewComment.setText(value);
					eObject.addContent(eNewComment);
				}else if(field.equals("explanation")){
					Element eNewComment=new Element("comment");
					eNewComment.setAttribute("type", "RED FLAG");
					eNewComment.setAttribute("time", Commons.getDate());
					eNewComment.setText(value);
					eObject.addContent(eNewComment);
					eObject.getChild(field).setText(value);
				}else if(field.equals("feedback")){
					Element eNewComment=new Element("comment");
					eNewComment.setAttribute("type", "FEEDBACK");
					eNewComment.setAttribute("time", Commons.getDate());
					eNewComment.setText(value);
					eObject.addContent(eNewComment);
				}else if(field.equals("status")){
					Element eNewComment=new Element("comment");
					eNewComment.setAttribute("type", value.toUpperCase());
					eNewComment.setAttribute("time", Commons.getDate());
					eNewComment.setText("Project Status changed to "+value);
					eObject.addContent(eNewComment);
					eObject.getChild(field).setText(value);
				}else if(field.equals("flag")&&value.equals("green")){
					Element eNewComment=new Element("comment");
					eNewComment.setAttribute("type", "GREEN FLAG");
					eNewComment.setAttribute("time", Commons.getDate());
					eNewComment.setText("Red Flag has been cleared");
					eObject.addContent(eNewComment);
					eObject.getChild(field).setText(value);
				}
				
				else{
				eObject.getChild(field).setText(value);
				}
				System.out.println("Report - Subreport modified, field "+field+" value "+value);
				eObject.getChild("lastupdate").setText(Commons.getDate());
				break;
			}						
		}
		System.out.println("about to write "+path);
		Commons.writeFile(path,doc);
		return doc;
	}
	
	public static Document addExpenses(Document doc,String WP, String partnerID,String date,String concept,String description,String amount,String path){
		System.out.println("Modifying subreport for WP:"+WP+"|partnerID:"+partnerID+"|date:"+date);
		for(Object object : doc.getRootElement().getChildren("subreport")) {
			Element eObject=(Element)object;
			if (eObject.getAttributeValue("WPID").equals(WP) && eObject.getAttributeValue("partner").equals(partnerID)&&eObject.getAttributeValue("date").equals(date)){
				System.out.println("Found subreport for WP:"+WP+"|partnerID:"+partnerID+"|date:"+date);
				Element expense = new Element("expenses");
				Long l=System.currentTimeMillis();
				String id=Long.toString(l);
				expense.setAttribute("id", id);
				Element eConcept=new Element("concept");
				eConcept.setText(concept);
				Element eDecsription=new Element("description");
				eDecsription.setText(description);
				Element eAmount=new Element("amount");
				eAmount.setText(amount);
				expense.addContent(eConcept);
				expense.addContent(eDecsription);
				expense.addContent(eAmount);
				
				eObject.addContent(expense);
				System.out.println("Added "+concept+" "+description+" "+amount);
				eObject.getChild("lastupdate").setText(Commons.getDate());
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
						if (field.equals("work")||field.equals("result")){
						taskObject.getChild(field).setText(value);
						System.out.println("Report - Task modified, field "+field+" value "+value);
						break;
						}else{
							//New effort
							Element effort = new Element("effort");
							Long l=System.currentTimeMillis();
							String id=Long.toString(l);
							effort.setAttribute("id", id);
							Element eEffort=new Element("person");
							eEffort.setText(field);
							Element ePerson=new Element("effortperperson");
							ePerson.setText(value);
							
							effort.addContent(ePerson);
							effort.addContent(eEffort);
							taskObject.addContent(effort);
							System.out.println("Report - Task modified, field "+field+" value "+value);
							//Get all effortperperson and sum them 
						}
						break;
					}
				}
				Namespace ns = doc.getRootElement().getNamespace();
			    ElementFilter ef = new ElementFilter("effortperperson", ns);
				int effortcount=0;
				Iterator<Element> items = eObject.getDescendants(ef);					
					while(items.hasNext()){
						Element el = (Element) items.next ();
						int i=Integer.parseInt(el.getText());
					    effortcount=effortcount+i;
					    System.out.println("Effort: "+effortcount);
					}				
				eObject.getChild("currentEffort").setText(String.valueOf(effortcount));
				eObject.getChild("lastupdate").setText(Commons.getDate());
				//update currenteffort
				break;
			}						
		}
		System.out.println("about to write tsk on "+path);
		Commons.writeFile(path,doc);
		return doc;
	}

	

	
	
	public static Document getSubReportForPartner(Document doc,String WP,String partnerID,String date){
		Document d = new Document();		
		for(Object object : doc.getRootElement().getChildren("subreport")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("partner").equals(partnerID) && eObject.getAttributeValue("WPID").equals(WP) && eObject.getAttributeValue("date").equals(date)){
				eObject.detach();
				d.setRootElement(eObject);
				//d.addContent(eObject);
			}	
			break;
		}
		
		return d;
	}
	
	public static String parseSubreport(Document d){
		Element eRootObject=d.getRootElement();
		//Get basics: partner, date, WP, status
		String result="<b><u>REPORT</u></b>";
		result=result+"<br><p><b>BASIC INFO</b><br><u>Partner:</u> "+eRootObject.getAttribute("partner").getValue();
		result=result+"<br><u>WP:</u> "+eRootObject.getAttribute("WP").getValue();
		result=result+"<br><u>Date:</u> "+eRootObject.getAttribute("date").getValue();
		
		result=result+"</p><br><br><p><u>Last Update:</u> "+eRootObject.getChild("lastupdate").getText();
		result=result+"<br><u>Status:</u> "+eRootObject.getChild("status").getText();
		result=result+"<br><u>Flag:</u> "+eRootObject.getChild("flag").getText();
		result=result+"<br><u>Explanation</u> "+eRootObject.getChild("explanation").getText();

		result=result+"</p><br><b>EFFORT</b><br>Wp Effort: "+eRootObject.getChild("wpEffort").getText();
		result=result+"<br>Current Effort: "+eRootObject.getChild("currentEffort").getText();
		
		for(Object object : eRootObject.getChildren("expenses")) {
			Element eObject=(Element)object;
			result=result+"<br>Expenses: "+eObject.getChild("concept").getText();
			result=result+" "+eObject.getChild("description").getText();
			result=result+" "+eObject.getChild("amount").getText();
		}
		
		for(Object object : eRootObject.getChildren("task")) {
			Element eObject=(Element)object;
			result=result+"<br>Task: "+eObject.getAttribute("title").getValue();
			result=result+"<br><u>Work:</u>"+eObject.getChild("work").getText();
			result=result+"<br><u>Result:</u>"+eObject.getChild("result").getText();
			for(Object objectAux : eObject.getChildren("effort")) {
				Element eObjectAux=(Element)objectAux;
				result=result+"<br><u>Team Member:</u>"+eObjectAux.getChild("person").getText();
				result=result+"<br><u>Effort:</u>"+eObjectAux.getChild("effortperperson").getText();
				
			}
		}
		
		for(Object object : eRootObject.getChildren("comment")) {
			Element eObject=(Element)object;
			result=result+"<br>Comment: "+eObject.getAttribute("type").getValue();
			result=result+" "+eObject.getAttribute("time").getValue();
			result=result+" "+eObject.getText();
			
		}
		
		System.out.println(result);
		return result;
	}
	
	
	
	public static boolean checkReportDate(String date, String init, String finish){
		try{
		System.out.println("Date: "+date+". Date Init: "+init+". Date Finish:"+finish);
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy");
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
	

	public static String sendReportByEmail(String text,String address){
		String result="KO";
		try {
			Email.generateAndSendEmail(text,address);
		} catch (AddressException e) {
			e.printStackTrace();
			return "KO";
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
			return "KO";
		} catch (MessagingException e) {
			e.printStackTrace();
			return "KO";
		}
		return "OK";
	}
	

}
