package ru.iu3.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.iu3.backend.models.Artist;
import ru.iu3.backend.models.Country;
import ru.iu3.backend.repositories.CountryRepository;

import java.util.*;

@RestController
@RequestMapping("/api/v1")
public class CountryController {
    @Autowired
    CountryRepository countryRepository;

    @GetMapping("/countries")
    public List<Country> getAllCountries(){
        return countryRepository.findAll();
    }

    @PostMapping("/countries")
    public ResponseEntity<Object> createCountry(@Validated @RequestBody Country country){
        try {
            Country nc = countryRepository.save(country);
            return new ResponseEntity<Object>(nc, HttpStatus.OK);
        }catch(Exception ex){
            String error;
            if(ex.getMessage().contains("countries.name_UNIQUE"))
                error="country_already_exists";
            else
                error="undefined_error";
            Map<String,String>map =new HashMap<>();
            map.put("error",error);
            return new ResponseEntity<Object>(map,HttpStatus.OK);
        }
    }

    @PutMapping("/countries/{id}")
    public ResponseEntity<Country> updateCountry(@PathVariable(value="id") Long countryId,@Validated @RequestBody Country countryDetails){
        Country country=null;
        Optional<Country> cc =countryRepository.findById(countryId);
        if(cc.isPresent()){
            country=cc.get();
            country.name=countryDetails.name;
            countryRepository.save(country);
        }
        else{
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,"country not found"
            );
        }
        return ResponseEntity.ok(country);
    }

    @DeleteMapping("/countries/{id}")
    public  Map<String,Boolean> deleteCountry(@PathVariable(value="id") Long countryId){
        Optional<Country> country =countryRepository.findById(countryId);
        Map<String,Boolean> response=new HashMap<>();
        if (country.isPresent()){
            countryRepository.delete(country.get());
            response.put("delete",Boolean.TRUE);
        }
        else{
            response.put("delete",Boolean.FALSE);
        }
        return response;
    }

    @GetMapping("/countries/{id}/artists")
    public ResponseEntity<List<Artist>> getArtistsCountry(@PathVariable(value="id") Long countryId){
        Optional<Country> currentCountry = countryRepository.findById(countryId);
        if(currentCountry.isPresent()){
            return ResponseEntity.ok(currentCountry.get().artists);
        }
        return ResponseEntity.ok(new ArrayList<Artist>());
    }
}
