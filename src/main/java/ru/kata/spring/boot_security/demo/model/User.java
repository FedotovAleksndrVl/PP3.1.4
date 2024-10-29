package ru.kata.spring.boot_security.demo.model;

import lombok.Data;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.Collection;
import java.util.Set;

@Data
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$", message = "Имя должно содержать только буквы.")
    @Size(min = 1, message = "Минимальная длина 1 символ")
    private String  firstName;

    //@Pattern(regexp = "^[A-Za-zА-Яа-яЁё]+$", message = "Имя должно содержать только буквы.")
    @Size(min = 1, message = "Минимальная длина 1 символ")
    private String  lastName;

    @Min(value=0, message = "Возраст не может быть менше 0")
    private Byte    age;

    @Column(unique=true, name="email")
    @Size(min = 1, message = "Минимальная длина 1 символ")
    private String  login;

    @Size(min = 1, message = "Минимальная длина 1 символ")
    private String  password;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @Fetch(FetchMode.JOIN)
    private Set<Role> roles;

    public User() {

    }

    public User(String login, String password, Set<Role> roles) {
        this.login = login;
        this.password = password;
        this.roles = roles;
    }

    public boolean ifRole(String role) {
        for (Role roles : roles) {
            if (roles.getRole().equals(role)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles;
    }

    @Override
    public String getUsername() {
        return this.login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
