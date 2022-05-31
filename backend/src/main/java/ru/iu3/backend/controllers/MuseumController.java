package ru.iu3.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.iu3.backend.models.Museum;
import ru.iu3.backend.repositories.MuseumRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class MuseumController {
    @Autowired
    MuseumRepository museumRepository;

    @PostMapping("/museums")
    public ResponseEntity<Object> createMuseum(@Validated @RequestBody Museum museum) {
        try {
            Museum newMuseum = museumRepository.save(museum);
            return new ResponseEntity<Object>(newMuseum, HttpStatus.OK);
        } catch (Exception ex) {
            String error;
            if (ex.getMessage().contains("null"))
                error = "name_of_the_museum_is_required";
            else
                error = "undefined_error";
            Map<String, String> map = new HashMap<>();
            map.put("error", error);
            return new ResponseEntity<Object>(map, HttpStatus.OK);
        }
    }

}
