 package com.selebrity.match;

 import javax.ws.rs.GET;
 import javax.ws.rs.Path;
 import javax.ws.rs.Produces;

 @Path("/api")
 public class Restselebrity {

   @GET
   @Produces("text/plain")
   @Path("/hello")
   public String info() {
     return "Hello Jersey on Google App Engine";
   }

 }
