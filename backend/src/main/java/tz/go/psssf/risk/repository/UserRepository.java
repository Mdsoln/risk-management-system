
package tz.go.psssf.risk.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import tz.go.psssf.risk.entity.User;


@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<User, String> {
	
	/**
     * Find a user by username.
     * 
     * @param username the username to search for
     * @return the User entity if found, or null if not found
     */
    public User findByUsername(String username) {
        return find("username", username).firstResult();
    }

    /**
     * Find a user by username and password.
     * 
     * This method is just an example and should not be used in production as it 
     * checks the password directly in plain text. In a real application, passwords
     * should be hashed and securely compared.
     * 
     * @param username the username to search for
     * @param password the password to match
     * @return the User entity if found and password matches, or null if not found or mismatched
     */
    public User findByUsernameAndPassword(String username, String password) {
        return find("username = ?1 and password = ?2", username, password).firstResult();
    }
}