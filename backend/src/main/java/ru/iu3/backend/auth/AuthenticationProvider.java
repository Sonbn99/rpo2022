package ru.iu3.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.www.NonceExpiredException;
import org.springframework.stereotype.Component;
import ru.iu3.backend.models.User;
import ru.iu3.backend.repositories.UserRepository;

import java.time.LocalDateTime;
import java.util.Optional;
@Component
public class AuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {


    @Value("${private.session-timeout}")
    private int sessionTimeout;

    @Autowired
    UserRepository userRepository;

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails,
                                                  UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws AuthenticationException {

    }
    @Override
    protected UserDetails retrieveUser(String userName, UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken) throws  AuthenticationException{
        Object token = usernamePasswordAuthenticationToken.getCredentials();
        Optional<User> currentUser = userRepository.findByToken(String.valueOf(token));
        if(!currentUser.isPresent())
            throw new UsernameNotFoundException("user is not found");
        User user = currentUser.get();

        boolean timeout = true;
        LocalDateTime dt = LocalDateTime.now();
        if(user.activity!=null){
            LocalDateTime nt = user.activity.plusMinutes(sessionTimeout);
            if(dt.isBefore(nt))
                timeout = false;
        }
        if(timeout){
            user.token = null;
            userRepository.save(user);
            throw new NonceExpiredException("session is expired");
        }
        else {
            user.activity = dt;
            userRepository.save(user);
        }

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(user.login, user.password, true, true, true, true, AuthorityUtils.createAuthorityList("USER"));
        return userDetails;
    }
}