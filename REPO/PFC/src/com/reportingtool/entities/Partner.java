package com.reportingtool.entities;

import org.jdom2.*;
import org.jdom2.input.SAXBuilder;

import com.reportingtool.utils.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;


public class Partner {

	/**
	 * @param args
	 */
	

	
	public static Document getCurrentPartnersFile() {
		try{
		return getCurrentPartnersFile(CST.PARTNERS_FILE);
		}catch(Exception e){
			  System.out.println(e);
			  return null;

		}
		
	}
	
	
	
	public static Document getCurrentPartnersFile(String name) throws IOException{
		SAXBuilder builder = new SAXBuilder();
		File xmlFile = new File(name);
		Document document=new Document();
		try {
			document = (Document) builder.build(xmlFile);
		} catch (JDOMException e) {
			e.printStackTrace();
		} catch (IOException e) {
			System.out.println("There's no file with this name. Lo creamos y punto.");
			document=createPartnerFile(name);
		}
		
		Element rootNode = document.getRootElement();
		System.out.println(rootNode.getName());
		return document;
	}
	
	public static Document getBasicPartnersInfo(Document doc) {
		Document document=new Document();
		Element root = new Element("partners");
		document.setRootElement(root);
		for(Object object : doc.getRootElement().getChildren("partner")) {
			Element eObject=(Element)object;
			Element partner=new Element("partner");
			partner.setAttribute("id",eObject.getAttributeValue("id"));
			partner.setAttribute("name",eObject.getAttributeValue("name"));
			root.addContent(partner);			
		}
		return document;
		
		
	}
	
	public static List<Element> getPartnerInfo(Document doc,String partnerID){
		
		List<Element> oList=new ArrayList<Element>();
		for(Object object : doc.getRootElement().getChildren("partner")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("id").equals(partnerID)){
					for(Object o : eObject.getChildren()) {
					Element eTmp=(Element)o;
					System.out.println("Adding "+eTmp.getName());
					oList.add(eTmp);
				}
								
			}						
		}
		return oList;
	}
	
	public static HashMap<String,String> getPartnersName(Document doc){
		HashMap<String,String> result=new HashMap<String,String>();
		for(Object object : doc.getRootElement().getChildren("partner")) {
			Element eObject=(Element)object;
			String id=eObject.getAttributeValue("id");
			Element eName=(Element)eObject.getChild("name");
			String name=eName.getValue();
			result.put(id, name);
		}
		return result;
		
	}
	
	
	public static Document createPartnerFile(String name) throws IOException{
		
		//Si está vacío,crear raiz; si no, <partner>
		Element root = new Element("partners");			
		Document doc = new Document(root);
		Commons.writeFile(name,doc);
		return doc;			
		
		}
	
	public static Document removePartner(Document doc,String id, String name, String email,String members) throws IOException{
		
		for(Object object : doc.getRootElement().getChildren("partner")) {
			Element eObject=(Element)object;
			
			if (eObject.getAttributeValue("id").equals(id)){
					for(Object o : eObject.getChildren()) {
					Element eTmp=(Element)o;
					System.out.println("Deleting "+eTmp.getName());
				}
								
			}						
		}
		return doc;
	}

	public static Document addPartner(Document doc,String id, String name, String email,String members,String password,String action,String path) throws IOException, AddressException, MessagingException{
		//si existe, modificarlo
		
		if (action.equals("edit"))
		doc=removePartner( doc, id,  name,  email, members);
		
		System.out.println("Adding partner: "+id+" "+name);
		
		Element partner = new Element("partner");
		partner.setAttribute("id", id);
		partner.setAttribute("name", name);
		Element namePartner= new Element("name");
		namePartner.addContent(name);
		Element passwordPartner= new Element("password");
		passwordPartner.addContent(password);
		Element emailPartner= new Element("email");
		emailPartner.addContent(email);
		
		StringTokenizer st=new StringTokenizer(members,",");
		   while (st.hasMoreTokens()){
			   String s=st.nextToken();
			   Element member=new Element("member");
			   member.addContent(s);
			   partner.addContent(member);
		   }
		
		
		partner.addContent(namePartner);
		partner.addContent(emailPartner);
		partner.addContent(passwordPartner);
		
		doc.getRootElement().addContent(partner);
		Commons.writeFile(path,doc);
		String emailText=Commons.createWelcomeMessage(id,password);
		Email.generateAndSendEmail(emailText, email);
		return doc;			
		
		}
	
		public static boolean login(Document doc,String user,String password){
			for(Object object : doc.getRootElement().getChildren("partner")) {
				Element eObject=(Element)object;
				
				if (eObject.getAttributeValue("id").equals(user)){
					Element ePwd=(Element)eObject.getChild("password");
					String pwd=ePwd.getValue();	
					try {
						pwd=Commons.md5(pwd);
					} catch (Exception e) {
						e.printStackTrace();
						return false;
					}
					if(pwd.equals(password))
						return true;
					else
						return false;
				}						
			}
			return false;
		}



		public static boolean forgot(Document doc, String username, String email) throws AddressException, UnsupportedEncodingException, MessagingException {
				for(Object object : doc.getRootElement().getChildren("partner")) {
					Element eObject=(Element)object;
					
					if (eObject.getAttributeValue("id").equals(username)){
						Element ePwd=(Element)eObject.getChild("password");
						Element eEmail=(Element)eObject.getChild("email");
						String sEmail=eEmail.getValue();	
						if(sEmail.equals(email)){
							String pwd=ePwd.getValue();
							String emailText=Commons.createWelcomeMessage(username,pwd);
							Email.generateAndSendEmail(emailText, email);
							return true;	
						}
							
						else
							return false;
					}						
				}
				return false;
			}
		


}
