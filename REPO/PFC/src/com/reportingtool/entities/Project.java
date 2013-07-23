package com.reportingtool.entities;

import org.jdom2.*;
import org.jdom2.input.SAXBuilder;

import com.reportingtool.utils.CST;
import com.reportingtool.utils.Commons;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringTokenizer;
import java.io.File;
import java.io.IOException;


public class Project {

	/**
	 * @param args
	 */
	
	
	public static Document getCurrentProjectDocument(String projectName){
		SAXBuilder builder = new SAXBuilder();
		if (!projectName.endsWith(".xml"))
			projectName=projectName+"xml";
		File xmlFile = new File(projectName);
		Document document=new Document();
		try {
			document = (Document) builder.build(xmlFile);
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("This project: "+projectName+" doesn't exist");
			
		}
		Element rootNode = document.getRootElement();
		System.out.println(rootNode.getName());
		return document;
	
	}
	
	
	/**
	 * Inicializa un nuevo proyecto con el título que recibe por parámetro. También añade fechas e ID del coordinador.
	 * @param title
	 * @param dateStart
	 * @param dateFinish
	 * @param idPartner
	 * @return	Documento del proyecto generado.
	 * @throws IOException
	 */
	public static String createProject(String path,String title, String dateStart, String dateFinish,String idPartner,String description,String status) throws IOException{
		
		//<project>
		Element root = new Element("project");
		Long l=System.currentTimeMillis();
		String id=Long.toString(l);
		root.setAttribute("id",id );
		
		
		Element metainfo = new Element("metainfo");
		Element projectBrief=root.clone();
			Element eTitle = new Element("title");
			Element eDateStart = new Element("dateStart");
			Element eDateFinish = new Element("dateFinish");
			Element eCoordinator = new Element("coordinator");
			Element eDesc = new Element("projectDescription");
			Element eSchedule = new Element("reportSchedule");

			

			
			Element eStatus = new Element("status");
				Element ePartner = new Element("partner");
				ePartner.setAttribute("id",idPartner );
				eCoordinator.addContent(ePartner);
				
			eTitle.addContent(title);
			eDateStart.addContent(dateStart);
			eDateFinish.addContent(dateFinish);
			eDesc.addContent(description);
			eStatus.addContent(status);
				
			metainfo.addContent(eTitle);
			projectBrief.addContent(eTitle.clone());
			metainfo.addContent(eDateStart);
			metainfo.addContent(eDateFinish);
			metainfo.addContent(eCoordinator);
			metainfo.addContent(eDesc);
			metainfo.addContent(eStatus);
			projectBrief.addContent(eStatus.clone());
		
		
		//Add project to projects file
		addProject(projectBrief,path+CST.PROJECTS_FILE);
		
		root.addContent(metainfo);
		root.addContent(eSchedule);
		Document doc = new Document(root);
		
		//Format result as String
		String result=Commons.docToString(doc);
		Commons.writeFile(path+id,doc);
		
		//Crear fichero de report
		Report.createReportFile(path+id);
		
		
		return id;	
		}
	
	public static void addProject(Element root,String path){
		
		Document doc=getProjects(path);
		doc.getRootElement().addContent(root);
		Commons.writeFile(path,doc);
		
		
	}
	
	public static Document addWP(Document doc, String title, String partners,String dateInit, String datefinish,String path){
		
		Element WP = new Element("workpackage");
		WP.setAttribute("title",title);
		Long l=System.currentTimeMillis();
		WP.setAttribute("id",Long.toString(l) );

		
		Element ePartners = new Element("coordinator");
		
		StringTokenizer st=new StringTokenizer(partners,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Element partner=new Element("leader");
			   partner.setAttribute("id",s);
			   ePartners.addContent(partner);
		   }		   
		Element eDateInit = new Element("dateInit");
		eDateInit.addContent(dateInit);
		
		Element eDateFinish = new Element("datefinish");
		eDateFinish.addContent(datefinish);
				
		WP.addContent(ePartners);
		WP.addContent(eDateInit);
		WP.addContent(eDateFinish);	
		doc.getRootElement().addContent(WP);
		System.out.println("***WP added: "+title);
		Commons.writeFile(path,doc);
		return doc;

	}
	
	public static Document addSchedule(Document doc, String date, String path){
		
		Element eDate = new Element("date");
		eDate.setText(date);
		doc.getRootElement().getChild("reportSchedule").addContent(eDate);
		Commons.writeFile(path,doc);
		
		return doc;
	}

	public static Document addTask(Document doc, String WP, String title, String description, String partners, String dateInit, String datefinish,String path){
		
		Element task = new Element("task");
		task.setAttribute("title",title);
		Long l=System.currentTimeMillis();
		task.setAttribute("id",Long.toString(l) );
		Element ePartners = new Element("partners");
		
		StringTokenizer st=new StringTokenizer(partners,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Element partner=new Element("partner");
			   partner.setAttribute("id",s);
			   ePartners.addContent(partner);
		   }
		   
		
		
		Element eDescription = new Element("description");
		eDescription.addContent(description);
		
		Element eDateInit = new Element("dateInit");
		eDateInit.addContent(dateInit);
		
		Element eDateFinish = new Element("datefinish");
		eDateFinish.addContent(datefinish);
		
		//Element eEffort = new Element("effort");
		//eEffort.addContent(effort);
		
		task.addContent(ePartners);
		task.addContent(eDescription);
		task.addContent(eDateInit);
		task.addContent(eDateFinish);
		//task.addContent(eEffort);
		
	
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("id").equals(WP)){
				eObject.addContent(task);
				break;
			}						
		}
		
		Commons.writeFile(path,doc);		
		return doc;

	}
	
	
public static Document addSchedule(Document doc, String dates){
		
		Element rSchedule = new Element("reportSchedule");
		Element reports = new Element("date");
		 
		StringTokenizer st=new StringTokenizer(dates,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Element date=new Element("date");
			   date.addContent(s);
			   reports.addContent(date);
		   }
		
		rSchedule.addContent(reports);
		doc.getRootElement().addContent(rSchedule);
		
		return doc;

	}
	
	
	/**
	 * Recupera la información del fichero correspondiente al proyecto cuyo título recibe por parámetro.
	 * A esa información, añade los detalles de cada partner en cada una de las apariciones
	 * @param name
	 * @return	Documento con toda la información del proyecto.
	 */
	
	public static Document getProjectInformation(String name,String partnersFile) {
	
	Document doc = getCurrentProjectDocument(name);
	
	Iterator<Content> iterator  =
		      (Iterator<Content>)doc.getRootElement().getDescendants();
	while(iterator.hasNext()){
		try{
		Element eObject=(Element) iterator.next();
		if(eObject.getName().equals("partner")){
		String id =eObject.getAttribute("id").getValue();
		System.out.println("[PROJECT] Partner identified: "+id);
		List<Element> lPartner = Partner.getPartnerInfo(Partner.getCurrentPartnersFile(partnersFile),id);
		Iterator<Element> iter = lPartner.iterator();
			while (iter.hasNext()){
			Element e=iter.next();
			System.out.println("[PROJECT] Adding: "+e.getName());
			eObject.addContent(e.detach());
			
			}
		}
		}
		catch (ClassCastException ce) {
			  }
		catch (Exception e) {
			e.printStackTrace();
			  }
		
	}
	
	
	return doc;
	
	
}

	public static Document getProjects(String path) {
		
		SAXBuilder builder = new SAXBuilder();
		File xmlFile = new File(path);
		Document document=new Document();
		try {
			document = (Document) builder.build(xmlFile);
		} catch (JDOMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
			System.out.println("Projects file doesn't exist");
			
		}

	
		return document;
	
	
}

	
	public static Document createReportStructure(Document doc){

		List<Element> oList=new ArrayList<Element>();
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			//Get dates
			//Get partners
			//Compare with reportDates; if true, generate a new node for each partner			
			if (eObject.getAttributeValue("id").equals("")){
					for(Object o : eObject.getChildren()) {
					Element eTmp=(Element)o;
					System.out.println("Adding "+eTmp.getName());
					oList.add(eTmp);
				}
			}						
		}
		return null;
	}
	
	
	
	public static Document assignPartnersToTask(Document doc,String wpID,String partners,String taskId,String path){
		System.out.println("assignPartnerToWP: wpId"+wpID+" partners:"+partners+" taskid:"+taskId);
		StringTokenizer st=new StringTokenizer(partners,",");
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			if (eObject.getAttributeValue("id").equals(wpID)){				
				for(Object o : eObject.getChildren("task")) {
					Element eObject2=(Element)o;
					if (eObject2.getAttributeValue("id").equals(taskId)){
						eObject2.removeChildren("partnerTask");
						while (st.hasMoreTokens()){
						String s=st.nextToken();
						Element ePartner=new Element("partnerTask");
						ePartner.setAttribute("id", s);						
						eObject2.addContent(ePartner);
						}
						break;
					}				
				}
			break;
		   }
		}
		Commons.writeFile(path,doc);
		return doc;		
	}
	
	
	public static Document assignPartnerToWP(Document doc,String wpID,String partnerID,String effort,String path){
		System.out.println("assignPartnerToWP: wpId"+wpID+" partnerID:"+partnerID+" effort:"+effort);
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			if (eObject.getAttributeValue("id").equals(wpID)){				
				Element ePartner=new Element("partnerWP");
				ePartner.setAttribute("id", partnerID);
				ePartner.setAttribute("effort", effort);
				eObject.addContent(ePartner);
			break;
		   }
		}
		Commons.writeFile(path,doc);
		return doc;		
	}
	
	
}
