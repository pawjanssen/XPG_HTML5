package net.atos.xpg.zuid.html5.rest;

import javax.ws.rs.*;
import java.util.*;

@Path("/dms")
@Consumes({ "application/json" })
@Produces({ "application/json" })
public class DMS {

    private Map<String, Document> documentStore = new HashMap<>();

    public DMS() {
        documentStore.put("document-1", new Document("document-1", "Documentnaam 1", "Dit is het eerste document"));
        documentStore.put("document-2", new Document("document-2", "Documentnaam 2", "Dit is het tweede document"));
        documentStore.put("document-3", new Document("document-3", "Documentnaam 3", "Dit is het derde document"));
    }

    @GET
    @Path("/documenten")
    public Collection<Document> getDocumenten() {
        return this.documentStore.values();
    }

    @GET
    @Path("/document/{id}")
    public Document getDocument(@PathParam("id") String id) {
        return this.documentStore.get(id);
    }

    @PUT
    @Path("/document/{id}")
    public Document voegDocumentToe(@PathParam("id") String id, @QueryParam("naam") String naam, @QueryParam("tekst") String tekst) {
        final Document document = new Document(id, naam, tekst);
        this.documentStore.put(id, document);
        return document;
    }
}
