package com.reportingtool.rest;


import java.io.File;
import java.io.IOException;


import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.xml.bind.annotation.XmlRootElement;
import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Response;


import org.jdom2.Document;


import com.reportingtool.entities.*;
import com.reportingtool.utils.CST;
import com.reportingtool.utils.Commons;

@Path ("/API")
@XmlRootElement
public class Dispatcher {
	@javax.ws.rs.core.Context 
	ServletContext context;	
	
public  String formatFile(String file){
	
	String path= context.getRealPath(File.separator)+"files"+File.separator+file;
	
	
	if (!path.endsWith(".xml")){
	path=path+".xml";		
	}
	System.out.println("Formatted PATH:"+path);
	return path;
}


public  String getPath(){
	
	String path= context.getRealPath(File.separator)+"files"+File.separator;
	System.out.println("Get PATH:"+path);
	return path;
}


@Path ("/project/{projectId}")
@GET
@Produces ("text/xml")
public String getProjectInfo(@PathParam("projectId") String projectId) {
	System.out.println("Getting Project info");	
	Document d = Project.getProjectInformation(formatFile(projectId),formatFile(CST.PARTNERS_FILE));	
	String result=Commons.docToString(d);
	

	return result;
}

/**
@GET
@Produces ("text/xml")
public String sayHello() {
return "<projects><project><projectId>001</projectId><titleTest1</title><status>ongoing</status></project></projects>";
}
*/

@Path ("/projects/")
@GET
@Produces ("text/xml")
public String getProjects() {
	System.out.println("Getting Projects info");	
	Document d = Project.getProjects(formatFile(CST.PROJECTS_FILE));		
	String result=Commons.docToString(d);
	

	return result;
}



@Path ("/partners/")
@GET
@Produces ("text/xml")
public String getPartners() {
	System.out.println("Getting Partners info");	
	Document d = null;
	try {
		d = Partner.getCurrentPartnersFile(formatFile(CST.PARTNERS_FILE));
		d=	Partner.getBasicPartnersInfo(d);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}		
	String result=Commons.docToString(d);
	

	return result;
}


/**
@GET
@Produces ("text/xml")
public String sayHello() {
return "<projects><project><projectId>001</projectId><titleTest1</title><status>ongoing</status></project></projects>";
}
*/

@Path ("/project/create")
@POST
@Produces ("text/xml")
public String createProject(@FormParam("title") String title,@FormParam("dateStart") String dateStart,@FormParam("dateFinish") String dateFinish,@FormParam("description") String desc,@FormParam("coordinator") String coordinatorID) {
	System.out.println("Creating Project. Title:"+title);	
	String result=null;
	try {
		result = Project.createProject(getPath(),Commons.formatText(title), dateStart, dateFinish, coordinatorID, Commons.formatText(desc), "pending");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return result;
}

@Path ("/project/add/WP/{projectId}")
@POST
@Produces ("text/xml")
public String createWP(@PathParam("projectId") String projectId,@FormParam("titleWP") String title,@FormParam("descriptionWP") String description,@FormParam("dateInitWP") String dateStart,@FormParam("dateFinishWP") String dateFinish,@FormParam("coordinatorWP") String coordinator) {
	System.out.println("Creating WP for project "+projectId+". Title:"+title+". Coord:"+coordinator);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addWP(d,Commons.formatText(title), coordinator,dateStart, dateFinish,Commons.formatText(description),path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/project/add/schedule/{projectId}")
@POST
@Produces ("text/xml")
public String addReportSchedule(@PathParam("projectId") String projectId,@FormParam("dateSchedule") String dateReportWP ){
	System.out.println("Adding Report Schedule "+projectId+".  Date:"+dateReportWP);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addSchedule(d,dateReportWP,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/project/add/task/{projectId}/{wpId}")
@POST
@Produces ("text/xml")
public String createTask(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@FormParam("titleTask") String title,@FormParam("dateInitTask") String dateStart,@FormParam("dateFinishTask") String dateFinish,@FormParam("partnersTask") String partners,@FormParam("descriptionTask") String description) {
	System.out.println("Creating Task for project "+projectId+". Title:"+title);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addTask(d,wpId,Commons.formatText(title),Commons.formatText(description),partners,dateStart,dateFinish,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/project/add/partner/task/{projectId}/{wpId}/{taskId}")
@POST
@Produces ("text/xml")
public String addPartnersToTask(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("taskId") String taskId,@FormParam("partnersTask") String partners) {
	System.out.println("Creating Task for project "+projectId+". TaskId:"+taskId);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.assignPartnersToTask(d,wpId,partners,taskId,path);
	String result=Commons.docToString(d);
	return result;
}


@Path ("/project/add/partner/wp/{projectId}/{wpId}")
@POST
@Produces ("text/xml")
public String addPartnerToWp(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@FormParam("partnerWP") String partnerId,@FormParam("effortWP") String effort) {
	System.out.println("Creating Task for project "+projectId);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.assignPartnerToWP(d,wpId,partnerId,effort,path);
	String result=Commons.docToString(d);
	return result;
}



@Path ("/report/get/{projectId}/{wpId}/{partnerId}")
@POST
@Produces ("text/xml")
public String getReport(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("date") String date) {
	String rep_projectId=projectId+"_report";
	System.out.println("Getting report for project "+projectId+". WpId:"+wpId+". PartnerId:"+partnerId);	
	Document d = Report.getCurrentReportFile(formatFile(rep_projectId));
	d = Report.getSubReportForPartner(d,wpId,partnerId,"");
	String result=Commons.docToString(d);
	return result;
}

//Get ProjectReport File

@Path ("/report/get/{projectId}")
@GET
@Produces ("text/xml")
public String getReportFile(@PathParam("projectId") String projectId) {
	String rep_projectId=projectId+"_report";
	System.out.println("Getting report for project "+projectId);	
	Document d = Report.getCurrentReportFile(formatFile(rep_projectId));
	String result=Commons.docToString(d);
	return result;
}


@Path ("/report/edit/{projectId}/{wpId}/{partnerId}/{reportDate}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String editReport(@FormParam("id") String field,@FormParam("value") String value, @PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date) {
	String rep_projectId=projectId+"_report";
	Document doc = Report.getCurrentReportFile(formatFile(rep_projectId));
	String path=getPath()+rep_projectId;
	Report.updateSubReport(doc, wpId, partnerId, date, Commons.formatText(field), Commons.formatText(value),path);
	System.out.println("Field:"+field+" - Value:"+value);
	
	return value;
}	

@Path ("/report/task/edit/{projectId}/{wpId}/{partnerId}/{reportDate}/{taskId}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String editTask(@FormParam("id") String field,@FormParam("value") String value, @PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date,@PathParam("taskId") String taskId ) {
	String rep_projectId=projectId+"_report";
	Document doc = Report.getCurrentReportFile(formatFile(rep_projectId));
	String path=getPath()+rep_projectId;
	Report.updateTaskReport(doc, wpId, partnerId, date, taskId,Commons.formatText(field), Commons.formatText(value),path);
	System.out.println("Field:"+field+" - Value:"+value);	
	return value;
}



@Path ("/report/addexpenses/{projectId}/{wpId}/{partnerId}/{reportDate}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String addExpenses(@FormParam("concept") String concept,@FormParam("description") String description, @FormParam("amount") String amount,@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date) {
	String rep_projectId=projectId+"_report";
	Document doc = Report.getCurrentReportFile(formatFile(rep_projectId));
	String path=getPath()+rep_projectId;
	Report.addExpenses(doc, wpId, partnerId, date, concept,Commons.formatText(description), amount,path);
	System.out.println("Field:"+concept+" "+description+"- Amount:"+amount);
	
	return "ok";
}

@Path ("/partners/add")
@POST
@Consumes("application/x-www-form-urlencoded")
public String addPartner(@FormParam("id") String id,@FormParam("name") String name, @FormParam("email") String email,@FormParam("members") String members,@FormParam("action") String action,@FormParam("password") String password) {
	Document doc;
	try {
		doc = Partner.getCurrentPartnersFile(formatFile(CST.PARTNERS_FILE));
		String path=getPath()+CST.PARTNERS_FILE;
		Partner.addPartner(doc, Commons.formatText(id), Commons.formatText(name), email, Commons.formatText(members),password, action,path);
	} catch (IOException e) {
		e.printStackTrace();
		return "ko";
	} catch (AddressException e) {
		e.printStackTrace();
		return "ko";		
	} catch (MessagingException e) {
		e.printStackTrace();
		return "ko";		
	}
	
	String result=Commons.docToString(doc);
	return result;
}

@Path ("/partners/getall")
@GET
@Produces ("text/xml")
public String getPartner() {
	Document doc;
	try {
		doc = Partner.getCurrentPartnersFile(formatFile(CST.PARTNERS_FILE));
	} catch (IOException e) {
		e.printStackTrace();
		return "ko";
	}
	String result=Commons.docToString(doc);
	return result;
}

@Path ("/report/sendemail/{projectId}/{wpId}/{partnerId}/{reportDate}")
@POST
@Produces ("text/xml")
public String sendReportByEmail(@FormParam("email") String emailAddress,@FormParam("emailcomment") String comment,@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date) {
	String rep_projectId=projectId+"_report";
	Document d = Report.getCurrentReportFile(formatFile(rep_projectId));
	d=Report.getSubReportForPartner(d, wpId, partnerId,date);
	String emailText=Report.parseSubreport(d);
	if(!comment.equals(null) && comment!="")
		emailText="<i>"+comment+"</i><br><br><br>"+emailText;
	Report.sendReportByEmail(emailText, emailAddress);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/report/sendbyemail/{projectId}/{wpId}/{partnerId}/{reportDate}/{email}")
@GET
@Produces ("text/xml")
public String sendReportByEmailGet(@PathParam("email") String emailAddress,@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date) {
	String rep_projectId=projectId+"_report";
	Document d = Report.getCurrentReportFile(formatFile(rep_projectId));
	d=Report.getSubReportForPartner(d, wpId, partnerId,date);
	String emailText=Report.parseSubreport(d);
	String result = Report.sendReportByEmail(emailText, emailAddress);
	return result;
}

@Path ("/partners/login")
@POST
@Produces ("text/xml")
public String login(@FormParam("loginid") String username,@FormParam("token") String password,@FormParam("n") String date) {
	if (!Commons.checkTimestamp(date))
		throw new WebApplicationException(Response.Status.UNAUTHORIZED);

	
	Document doc;
	try {
		doc = Partner.getCurrentPartnersFile(formatFile(CST.PARTNERS_FILE));
	} catch (IOException e) {
		e.printStackTrace();
		return "ko";
	}
	if(Partner.login(doc,username,password)){
		return "ok";
	}else
	throw new WebApplicationException(Response.Status.UNAUTHORIZED);
}

@Path ("/partners/forgot")
@POST
@Produces ("text/xml")
public String forgot(@FormParam("loginforgot") String username,@FormParam("emailforgot") String email) {
	Document doc;
	try {
		doc = Partner.getCurrentPartnersFile(formatFile(CST.PARTNERS_FILE));
		if(Partner.forgot(doc,username,email)){
			return "ok";
		}else
		throw new WebApplicationException(Response.Status.UNAUTHORIZED);
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
		throw new WebApplicationException(Response.Status.UNAUTHORIZED);
	} catch (AddressException e) {
		e.printStackTrace();
		throw new WebApplicationException(Response.Status.UNAUTHORIZED);
	} catch (MessagingException e) {
		e.printStackTrace();
		throw new WebApplicationException(Response.Status.UNAUTHORIZED);
	}
	
}

@Path ("/project/delete/wp/{projectId}/{id}")
@POST
@Produces ("text/xml")
public String removeElement(@PathParam("projectId") String projectId,@PathParam("id") String id) {
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.removeWp(d,id,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/project/delete/task/{projectId}/{wpid}/{id}")
@POST
@Produces ("text/xml")
public String removeTask(@PathParam("wpid") String wpId,@PathParam("projectId") String projectId,@PathParam("id") String id) {
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.removeTask(d,wpId,id,path);
	String result=Commons.docToString(d);
	return result;
}


}

