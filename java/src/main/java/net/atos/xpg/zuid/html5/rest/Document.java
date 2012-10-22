package net.atos.xpg.zuid.html5.rest;

public class Document {

    private String id;
    private String naam;
    private String tekst;

    public Document(final String id, final String naam, final String tekst) {
        this.id = id;
        this.naam = naam;
        this.tekst = tekst;
    }

    public String getId() {
        return id;
    }

    public String getNaam() {
        return naam;
    }

    public void setNaam(final String naam) {
        this.naam = naam;
    }

    public String getTekst() {
        return tekst;
    }

    public void setTekst(final String tekst) {
        this.tekst = tekst;
    }
}
