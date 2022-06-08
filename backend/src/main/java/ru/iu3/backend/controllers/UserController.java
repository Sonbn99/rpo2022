package ru.iu3.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.iu3.backend.models.Museum;
import ru.iu3.backend.models.User;
import ru.iu3.backend.repositories.MuseumRepository;
import ru.iu3.backend.repositories.UserRepository;
import ru.iu3.backend.tools.DataValidationException;
import ru.iu3.backend.tools.Utils;

import java.util.*;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/v1")

public class UserController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    MuseumRepository museumRepository;

    @GetMapping("/users")
    public Page<User> getAllUsers(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        return userRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "login")));
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getArtist(@PathVariable(value = "id") Long userId) throws DataValidationException {
        User user = userRepository.findById(userId).orElseThrow(()->new DataValidationException("User with this index can't be found"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/users")
    public ResponseEntity<Object> createUser(@Validated @RequestBody User user) {
        try {
            User newUser = userRepository.save(user);
            return new ResponseEntity<Object>(newUser, HttpStatus.OK);
        } catch (Exception ex) {
            String error;
            if (ex.getMessage().contains("null")) {
                error = "name_of_the_user_is_required";
            }
            else
                error = "undefined_error";
            Map<String, String> map = new HashMap<>();
            map.put("error", error);
            return new ResponseEntity<Object>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/users/{id}/addmuseums")
    public ResponseEntity<Object> addMuseums(@PathVariable(value = "id") Long userId, @Validated @RequestBody Set<Museum> museums) {
        Optional<User> currentUser = userRepository.findById(userId);
        int count = 0;
        if(currentUser.isPresent()){
            User user = currentUser.get();
            for(Museum museum: museums){
                Optional<Museum> currentMuseum = museumRepository.findById(museum.id);
                if(currentMuseum.isPresent()){
                    user.addMuseum(currentMuseum.get());
                    count++;
                }
            }
            userRepository.save(user);
        }
        Map<String, String> response = new HashMap<>();
        response.put("count", String.valueOf(count));
        return ResponseEntity.ok(response);
    }
    @PostMapping("/users/{id}/removemuseums")
    public ResponseEntity<Object> removeMuseums(@PathVariable(value = "id") Long userId, @Validated @RequestBody Set<Museum> museums) {
        Optional<User> currentUser = userRepository.findById(userId);
        int count = 0;
        if(currentUser.isPresent()){
            User user = currentUser.get();
            for(Museum museum: museums){
                user.removeMuseum(museum);
                count++;
            }
            userRepository.save(user);
        }
        Map<String, String> response = new HashMap<>();
        response.put("count", String.valueOf(count));
        return ResponseEntity.ok(response);
    }

//    @PutMapping("/users/{id}")
//    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Validated @RequestBody User userDetails) {
//        User user = null;
//        Optional<User> cc = userRepository.findById(userId);
//        if (cc.isPresent()) {
//            user = cc.get();
//            user.login = userDetails.login;
//            user.email = userDetails.email;
//            userRepository.save(user);
//        } else {
//            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user_not_found");
//        }
//        return ResponseEntity.ok(user);
//    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "id") Long userId, @Validated @RequestBody User userDetails) throws DataValidationException {
        try {
            User user = userRepository.findById(userId).orElseThrow(()->new DataValidationException("User with this email does not exist"));
            user.email = userDetails.email;
            String np = userDetails.np;
            if(np!=null && !np.isEmpty()){
                byte[] b = new byte[32];
                new Random().nextBytes(b);
                String salt = new String(Hex.encode(b));
                user.password = Utils.ComputeHash(np, salt);
                user.salt = salt;
            }
            userRepository.save(user);
            return ResponseEntity.ok(user);
        } catch (Exception ex) {
            String error;
            if(ex.getMessage().contains("users.email_UNIQUE"))
                throw new DataValidationException("User with this email does not exist");
            else
                throw new DataValidationException("Undefined error");
        }
    }

    @PostMapping("/deleteusers")
    public ResponseEntity deleteUsers(@Validated @RequestBody List<User> users) {
        userRepository.deleteAll(users);
        return new ResponseEntity(HttpStatus.OK);
    }
}