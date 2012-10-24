package net.atos.xpg.zuid.html5.rest;

import java.io.Serializable;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.enterprise.context.SessionScoped;

/** @author "Pascal Janssen (a166128)" */
@SessionScoped
public class Session implements Serializable {

    private static final long serialVersionUID = 5289318412223089159L;

    private Map<String, Document> documentStore = new HashMap<>();

    public Session() {
        documentStore.put("document-1", new Document("document-1", "Documentnaam 1", "Dit is het eerste document"));
        documentStore.put("document-2", new Document("document-2", "Documentnaam 2", "Dit is het tweede document"));
        documentStore.put("document-3", new Document("document-3", "Documentnaam 3", "Dit is het derde document"));
    }

    public Collection<Document> getDocuments() {
        return documentStore.values();
    }

    public Document getDocument(final String id) {
        return this.documentStore.get(id);
    }

    public void addDocument(final Document document) {
        this.documentStore.put(document.getId(), document);
    }
}
