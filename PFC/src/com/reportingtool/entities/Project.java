package com.reportingtool.entities;

import org.jdom2.*;
import org.jdom2.input.SAXBuilder;

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
	public static Document createProject(String title, String dateStart, String dateFinish,String idPartner) throws IOException{
		
		//<project>
		Element root = new Element("project");
		root.setAttribute("title",title );
		root.setAttribute("dateStart",dateStart);
		root.setAttribute("dateFinish",dateFinish);
		root.setAttribute("dateStartRevised",dateStart);
		root.setAttribute("dateFinishRevised",dateFinish);
		
			Element coordinator = new Element("coordinator");
			Element idPartnerCoordinator = new Element("partner");
			idPartnerCoordinator.setAttribute("id", idPartner);
			coordinator.addContent(idPartnerCoordinator);
		
		root.addContent(coordinator);
		
		Document doc = new Document(root);
		
		
		
		return doc;	
			
		
		
		}
	
	
	public static Document addWP(Document doc, String title, String partners){
		
		Element WP = new Element("workpackage");
		WP.setAttribute("title",title);
		
		Element ePartners = new Element("partners");
		
		StringTokenizer st=new StringTokenizer(partners,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Element partner=new Element("partner");
			   partner.setAttribute("id",s);
			   ePartners.addContent(partner);
		   }
			   
		WP.addContent(ePartners);
		doc.getRootElement().addContent(WP);
		
		return doc;

	}
	
	
	public static Document addTask(Document doc, String WP, String title, String description, String partners, String dateInit, String datefinish){
		
		Element task = new Element("task");
		task.setAttribute("title",title);
		
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
		
		task.addContent(ePartners);
		task.addContent(eDescription);
		task.addContent(eDateInit);
		task.addContent(eDateFinish);
		
	
		for(Object object : doc.getRootElement().getChildren("workpackage")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("title").equals(WP)){
				eObject.addContent(task);
				break;
			}						
		}
		
				
		return doc;

	}
	
	
public static Document addSchedule(Document doc, String dates){
		
		Element rSchedule = new Element("reportSchedule");
		Element reports = new Element("reports");
		 
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
	
	public static Document getProjectInformation(String name) {
	
	Document doc = getCurrentProjectDocument(name);
	
	Iterator<Content> iterator  =
		      (Iterator<Content>)doc.getRootElement().getDescendants();
	while(iterator.hasNext()){
		try{
		Element eObject=(Element) iterator.next();
		if(eObject.getName().equals("partner")){
		String id =eObject.getAttribute("id").getValue();
		System.out.println("[PROJECT] Partner identified: "+id);
		List<Element> lPartner = Partner.getPartnerInfo(Partner.getCurrentPartnersFile(),id);
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


}
