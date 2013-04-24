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


import com.reportingtool.entities.Project;
import com.reportingtool.entities.Report;
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
public String createProject(@FormParam("title") String title,@FormParam("dateStart") String dateStart,@FormParam("duration") String duration,@FormParam("desc") String desc,@FormParam("reportSchedule") String reportSchedule) {
	System.out.println("Creating Project. Title:"+title);	
	String result=null;
	try {
		result = Project.createProject(getPath(),title, dateStart, duration, "001", reportSchedule, desc, "active");
	} catch (IOException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	
	return result;
}

@Path ("/add/WP/{projectId}")
@POST
@Produces ("text/xml")
public String createWP(@PathParam("projectId") String projectId,@FormParam("title") String title,@FormParam("wpDateStart") String dateStart,@FormParam("wpDateFinish") String dateFinish,@FormParam("coordinator") String partners,@FormParam("effort") String effort) {
	System.out.println("Creating WP for project "+projectId+". Title:"+title);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addWP(d,title, partners,effort,dateStart, dateFinish,path);
	String result=Commons.docToString(d);
	return result;
}

@Path ("/add/task/{projectId}/{wpId}")
@POST
@Produces ("text/xml")
public String createTask(@PathParam("projectId") String projectId,@PathParam("wpId") String wpId,@FormParam("taskTitle") String title,@FormParam("taskDateStart") String dateStart,@FormParam("taskDateFinish") String dateFinish,@FormParam("taskPartners") String partners,@FormParam("taskDescription") String description,@FormParam("taskEffort") String effort) {
	System.out.println("Creating Task for project "+projectId+". Title:"+title);	
	Document d = Project.getCurrentProjectDocument(formatFile(projectId));
	String path=getPath()+projectId;
	d = Project.addTask(d,wpId,title,description,partners,dateStart,dateFinish,effort,path);
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

@Path ("/testlm")
@GET
@Produces ("application/x-www-form-urlencoded")
public MultivaluedMap<String, String> testLastmile(@QueryParam("serviceId") String serviceId,@QueryParam("userId.msisdn") String msisdn,@QueryParam("userId.alias") String alias) {
	MultivaluedMap<String, String> result=new MultivaluedMapImpl();
	System.out.println("Service ID:"+serviceId+". MDN:"+msisdn+".Alias:"+alias);
	result.putSingle("subscription_data", "abc#1231231312321;subscriptionType1;billed;2012-06-19 12:01:00 0200;;2012-06-26 12:01:00 0200");
	return result;
}

@Path ("/subscriptions")
@POST
@Consumes("application/x-www-form-urlencoded")
public void post(MultivaluedMap<String, String> formParams,@Context UriInfo uriInfo) {
	
		HashMap<String,String> hmOptions=new HashMap<String,String>();
		for(String k : formParams.keySet()){       
        System.out.println("Key "+k);  
        System.out.println("Value "+formParams.getFirst(k));
        hmOptions.put(k, formParams.getFirst(k));
      }
		
		MultivaluedMap<String, String> queryParams = uriInfo.getQueryParameters();		
		for(String k : queryParams.keySet()){       
	        System.out.println("Key Query "+k);  
	        System.out.println("Value Query"+queryParams.getFirst(k));
	        hmOptions.put(k, queryParams.getFirst(k));
	      }
		System.out.println(hmOptions.size());
   }

@Path ("/report/edit/{projectId}/{wpId}/{reportDate}/{partnerId}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String editReport(@FormParam("id") String field,@FormParam("value") String value) {
	System.out.println("Field:"+field+" - Value:"+value);
	return value;
}	

@Path ("/report/edit/{projectId}/{wpId}/{reportDate}/{partnerId}/{taskId}")
@POST
@Consumes("application/x-www-form-urlencoded")
public String editTask(@FormParam("id") String field,@FormParam("value") String value) {
	System.out.println("Field:"+field+" - Value:"+value);
	return value;
}

}

