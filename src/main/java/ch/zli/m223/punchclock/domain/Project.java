package ch.zli.m223.punchclock.domain;

import java.util.List;

public class Project {
    private long id;
    private String name;
    private List<Entry> entries;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public List<Entry> getEntries() {
        return entries;
    }

    public void setEntries(List<Entry> entries) {
        this.entries = entries;
    }

    public void addEntry(Entry entry){
        entries.add(entry);
    }
}
