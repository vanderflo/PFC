package com.reportingtool.rest;


import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.xml.bind.annotation.XmlRootElement;
import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.UriInfo;


import org.jdom2.Document;


import com.reportingtool.entities.*;
import com.reportingtool.utils.CST;
import com.reportingtool.utils.Commons;
import com.sun.jersey.core.util.MultivaluedMapImpl;

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


/**
@GET
@Produces ("text/xml")
public String sayHello() {
return "<partners><partner><member>Lolo P</member><member>Manu G</member><id>001</id><email>test@upm.es</email></partner></partners>";
}
*/

@Path ("/project/{projectId}")
@GET
@Produces ("text/xml")
public String getProjectInfo(@PathParam("projectId") String projectId) {
	System.out.println("Getting Project info");	
	Document d = Project.getProjectInformation(formatFile(projectId),formatFile(CST.PARTNERS_FILE));	
	//Commons.writeFile(formatFile("Resultado6"),d);
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

@Path ("/create/project/")
@POST
@Produces ("text/xml")
public String createProject(@FormParam("title") String title,@FormParam("dateStart") String dateStart,@FormParam("duration") String duration,@FormParam("description") String desc,@FormParam("coordinator") String coordinatorID) {
	System.out.println("Creating Project. Title:"+title);	
	String result=null;
	try {
		result = Project.createProject(getPath(),title, dateStart, duration, coordinatorID, desc, "active");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return result;
}

@Path ("/add/WP/{projectId}")
@POST
@Produces ("text/xml")
public String createWP(@PathParam("projectId") String projectId,@FormParam("titleWP") String title,@FormParam("dateInitWP") String dateStart,@FormParam("dateFinishWP") String dateFinish,@FormParam("coordinatorWP") String coordinator) {
	System.out.println("Creating WP for project "+projectId+". Title:"+title+". Coord:"+coordinator);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addWP(d,title, coordinator,dateStart, dateFinish,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/add/schedule/{projectId}")
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

@Path ("/add/task/{projectId}/{wpId}")
@POST
@Produces ("text/xml")
public String createTask(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@FormParam("titleTask") String title,@FormParam("dateInitTask") String dateStart,@FormParam("dateFinishTask") String dateFinish,@FormParam("partnersTask") String partners,@FormParam("descriptionTask") String description) {
	System.out.println("Creating Task for project "+projectId+". Title:"+title);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addTask(d,wpId,title,description,partners,dateStart,dateFinish,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/project/add/partner/task/{projectId}/{wpId}/{taskid}")
@POST
@Produces ("text/xml")
public String addPartnersToTask(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("taskId") String taskId,@FormParam("partnersTask") String partners) {
	System.out.println("Creating Task for project "+projectId+". TaskId:"+taskId);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.assignPartnersToTask(d,taskId,partners,path);
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
	d = Report.getSubReportForPartner(d,wpId,partnerId);
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
	Report.updateSubReport(doc, wpId, partnerId, date, field, value,path);
	System.out.println("Field:"+field+" - Value:"+value);
	
	return value;
}	

@Path ("/task/edit/{projectId}/{wpId}/{partnerId}/{reportDate}/{taskId}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String editTask(@FormParam("id") String field,@FormParam("value") String value, @PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@PathParam("partnerId") String partnerId,@PathParam("reportDate") String date,@PathParam("taskId") String taskId ) {
	String rep_projectId=projectId+"_report";
	Document doc = Report.getCurrentReportFile(formatFile(rep_projectId));
	String path=getPath()+rep_projectId;
	Report.updateTaskReport(doc, wpId, partnerId, date, taskId,field, value,path);
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
	Report.addExpenses(doc, wpId, partnerId, date, concept,description, amount,path);
	System.out.println("Field:"+concept+" "+description+"- Amount:"+amount);
	
	return "ok";
}


}

