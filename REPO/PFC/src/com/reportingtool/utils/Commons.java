package com.reportingtool.utils;

import java.io.FileWriter;
import java.io.IOException;

import org.jdom2.Document;
import org.jdom2.output.Format;
import org.jdom2.output.XMLOutputter;

public class Commons {
	public static void writeFile(String title,Document content){
		try {			
		if (!title.endsWith(".xml")	)		
		title=title+".xml";
		FileWriter fw = new FileWriter(title);
		XMLOutputter serializer = new XMLOutputter(Format.getPrettyFormat());
		serializer.output(content, fw);
		
		 }
		  catch (IOException e) {
		  System.out.println(e);
		  }
		
		
	}
	
	public static String docToString(Document content){
		try {			
		
		XMLOutputter serializer = new XMLOutputter(Format.getPrettyFormat());
		String s = serializer.outputString(content);
		return s;
		
		
	 }
		  catch (Exception e) {
		  System.out.println(e);
		  return "ERROR";
		  }
		
		
	}
	
	
	
}
