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
	
	public static Document addSubReport(String projectID, String date, String WP, String partnerID, String expenses, String status, String flag){
		addSubReport(projectID,  date, WP,  partnerID,  expenses,  status,  flag, null);
		return null;
	}
	
	public static Document addSubReport(String projectID, String date, String WP, String partnerID, String expenses, String status, String flag, String explanation){
		
		Document doc = getCurrentReportFile(projectID);
		Element subreport = new Element("subreport");
		
		Element eDate= new Element("date");
		eDate.addContent(date);
		
		Element ePartnerID= new Element("partner");
		ePartnerID.addContent(partnerID);
		
		Element eWP= new Element("workpackage");
		eWP.addContent(WP);
		
		Element eExpenses= new Element("expenses");
		eExpenses.addContent(expenses);
		
		Element eStatus= new Element("status");
		eStatus.addContent(status);
		
		Element eFlag= new Element("flag");
		eFlag.addContent(flag);
		
		if (explanation != null){
		Element eExplanation= new Element("explanation");
		eExplanation.addContent(explanation);
		eFlag.addContent(eExplanation);
		}
		
		subreport.addContent(eDate);
		subreport.addContent(ePartnerID);
		subreport.addContent(eWP);
		subreport.addContent(eExpenses);
		subreport.addContent(eStatus);
		subreport.addContent(eFlag);
		
		doc.getRootElement().addContent(subreport);	
		
		return doc;		
	}
	
	
	public static Document addTaskReport(String projectID, String date, String WP, String partnerID, String taskID, String result,String effort,String work){
		
		Element task = new Element("task");
		task.setAttribute("id",taskID);
		
		Element eWork= new Element("work");
		eWork.addContent(date);
		
		Element eResult= new Element("result");
		eResult.addContent(result);
		
		Element eEffort= new Element("effort");
		eEffort.addContent(effort);
		
		
		
		//Get workpackage y añade info de este task. A ver cómo se mira si es sobreescritura...
		Document doc = getCurrentReportFile(projectID);
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("title").equals(WP)){
				eObject.addContent(task);
				break;
				
			}						
		}
		
		
		return doc;
	}
	
	/** TBD
	 *   - Modificar valores de un o en uno, como por ejemplo el status.
	 *   - Cómo relacionar el addsubreport con el addtask, cuándo y cómo se llaman entre sí
	 *   - Denegar/Confirmar report una vez que el partner lo ha rellenado
	 */
	

}
