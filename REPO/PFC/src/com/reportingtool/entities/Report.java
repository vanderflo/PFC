package com.reportingtool.entities;

import java.io.File;
import java.io.IOException;
import com.reportingtool.utils.*;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.JDOMException;
import org.jdom2.input.SAXBuilder;

public class Report {
	
	public static Document createReportFile(String projectID){
		//Si está vacío,crear raiz; si no, <partner>
		Element root = new Element("report");
		Document doc = new Document(root);
		Commons.writeFile(projectID,doc);
		return doc;		
	}
	
	public static  Document fillReportFile(Document doc){
		
		//Get init date y duration
		//Get reportSchedule y crea un array o vector de arrays
		//Para cada report, get partners, ve a cada WP, get tasks que estŽn en esa fecha y a–‡delo
			// for each report
				//getWP, for each WP
					//comprueba que est‡ en el rango de fechas
					//s’? getpartners
					 //get tasks, y para cada task, comprueba si ese partner est‡ incluido en esa tarea; a–‡delo si ves que tal
					
		
		
		
		
		return null;
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
	

	
	public static Document addSubReport(Document doc,String date, String WP,String partnerID){
		
		Element subreport = new Element("subreport");
		
		subreport.setAttribute("partner", partnerID);
		subreport.setAttribute("WP", WP);
		
		Element eDate= new Element("date");
		eDate.addContent(date);		
	
		Element eExpenses= new Element("expenses");
		Element eFeedback= new Element("feedback");
		
		Element eStatus= new Element("status");
		eStatus.addContent("empty");
		
		Element eFlag= new Element("flag");		
			Element eExplanation= new Element("explanation");
			eFlag.addContent(eExplanation);
		
		
		subreport.addContent(eDate);
		subreport.addContent(eExpenses);
		subreport.addContent(eStatus);
		subreport.addContent(eFlag);
		subreport.addContent(eFeedback);
		
		doc.getRootElement().addContent(subreport);	
		
		return doc;		
	}
	
	
	public static Document addTaskReport(Document doc, String date, String WP, String partnerID, String taskID, String result,String effort,String work){
		
		Element task = new Element("task");
		task.setAttribute("id",taskID);
		
		Element eWork= new Element("work");
		eWork.addContent(date);
		
		Element eResult= new Element("result");
		eResult.addContent(result);
		
		Element eEffort= new Element("effort");
		eEffort.addContent(effort);
		
		/** TBD Paso el Doc o lo recupero desde aquí???
		 * 
		 */
		
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
		}
		
		
		return doc;
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

}
