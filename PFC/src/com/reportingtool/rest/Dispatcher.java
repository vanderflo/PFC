package com.reportingtool.rest;


import java.io.File;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.xml.bind.annotation.XmlRootElement;
import javax.servlet.ServletContext;

import org.jdom2.Document;


import com.reportingtool.entities.Project;
import com.reportingtool.utils.CST;
import com.reportingtool.utils.Commons;

@Path ("/API")
@XmlRootElement
public class Dispatcher {
	@javax.ws.rs.core.Context 
	ServletContext context;
	
public String formatFile(String file){
	
	String path= context.getRealPath(File.separator)+"files"+File.separator+file;
	
	if (!path.endsWith(".xml")){
	path=path+".xml";		
	}
	System.out.println("Formatted PATH:"+path);
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
	Document d = Project.getProjectInformation(formatFile(projectId));	
	Commons.writeFile(formatFile("Resultado4"),d);
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




}

