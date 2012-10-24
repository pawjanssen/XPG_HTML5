package net.atos.xpg.zuid.html5.rest;

import java.util.Collection;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

@Path("/dms")
@Consumes({ "application/json" })
@Produces({ "application/json" })
public class DMS {

    @Inject
    private Session userSession;

    @GET
    @Path("/documenten")
    public Collection<Document> getDocumenten() {
        return this.userSession.getDocuments();
    }

    @GET
    @Path("/document/{id}")
    public Document getDocument(@PathParam("id") String id) {
        return this.userSession.getDocument(id);
    }

    @PUT
    @Path("/document/{id}")
    public Document voegDocumentToe(@PathParam("id") String id, final Document submittedDocument) {
        final Document document = new Document(id, submittedDocument.getNaam(), submittedDocument.getTekst());
        this.userSession.addDocument(document);
        return document;
    }
}
