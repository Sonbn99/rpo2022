package ru.iu3.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import ru.iu3.backend.models.Artist;
import ru.iu3.backend.models.Country;
import ru.iu3.backend.repositories.CountryRepository;
import ru.iu3.backend.tools.DataValidationException;

import java.util.*;
@CrossOrigin(origins="http://localhost:3000")

@RestController
@RequestMapping("/api/v1")
public class CountryController {
    @Autowired
    CountryRepository countryRepository;

    @GetMapping("/countries")
    public Page<Country> getAllCountries(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        if(limit==0){
            limit=Integer.MAX_VALUE;
        }
        return countryRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "name")));
    }

    @PostMapping("/countries")
    public ResponseEntity<Object> createCountry(@Validated @RequestBody Country country) throws DataValidationException{
        try {
            Country nc = countryRepository.save(country);
            return new ResponseEntity<Object>(nc, HttpStatus.OK);
        }catch(Exception ex){
            String error;
            if(ex.getMessage().contains("countries.name_UNIQUE"))
                throw new DataValidationException("country_already_exist");
            else if(ex.getMessage().contains("null"))
                throw new DataValidationException("country_is_required");
            else
                throw new DataValidationException("undefined_error");
        }
    }
    @GetMapping("/countries/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable(value = "id") Long countryId) throws DataValidationException{
        try{
            Country country = countryRepository.findById(countryId).get();
            return ResponseEntity.ok(country);
        } catch (Exception ex){
            throw new DataValidationException("Counntry with this index can't be found");
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

    @PostMapping("/deletecountries")
    public ResponseEntity deleteCountries(@Validated @RequestBody List<Country> countries) {
        countryRepository.deleteAll(countries);
        return new ResponseEntity(HttpStatus.OK);
    }
}