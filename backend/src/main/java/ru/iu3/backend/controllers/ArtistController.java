package ru.iu3.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.iu3.backend.models.Artist;
import ru.iu3.backend.models.Country;
import ru.iu3.backend.repositories.ArtistRepository;
import ru.iu3.backend.repositories.CountryRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class ArtistController {
    @Autowired
    ArtistRepository artistRepository;
    @Autowired
    CountryRepository countryRepository;

    @PostMapping("/artists")
    public ResponseEntity<Object> createCountry(@Validated @RequestBody Artist artist){
        Optional<Country> currentCountry = countryRepository.findById(artist.country.id);
        if(currentCountry.isPresent()){
            artist.country = currentCountry.get();
        }
        Artist newArtist = artistRepository.save(artist);
        return new ResponseEntity<Object>(newArtist, HttpStatus.OK);
    }
    @GetMapping("artists")
    public ResponseEntity<List<Artist>> getArtistsCountry(@PathVariable(value="id") Long countryId){
        Optional<Country> currentCountry = countryRepository.findById(countryId);
        if(currentCountry.isPresent()){
            return ResponseEntity.ok(currentCountry.get().artists);
        }
        return ResponseEntity.ok(new ArrayList<Artist>());
    }


}


