package com.reportingtool.rest;


import java.io.File;
import java.io.IOException;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.xml.bind.annotation.XmlRootElement;
import javax.servlet.ServletContext;

import org.jdom2.Document;


import com.reportingtool.entities.Project;
import com.reportingtool.entities.Report;
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




}

