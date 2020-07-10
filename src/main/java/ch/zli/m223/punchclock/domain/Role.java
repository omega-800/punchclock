package ch.zli.m223.punchclock.domain;

import java.util.List;

public class Role {
    private long id;
    private List<User> users;

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addUser(User user){
        users.add(user);
    }

    public void removeUserById(Long id){
        users.remove(id);
    }

}
