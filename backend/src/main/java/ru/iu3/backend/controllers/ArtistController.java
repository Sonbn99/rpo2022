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
import ru.iu3.backend.repositories.ArtistRepository;
import ru.iu3.backend.repositories.CountryRepository;
import ru.iu3.backend.tools.DataValidationException;

import java.util.*;
@CrossOrigin(origins="http://localhost:3000")

@RestController
@RequestMapping("/api/v1")
public class ArtistController {
    @Autowired
    ArtistRepository artistRepository;
    @Autowired
    CountryRepository countryRepository;


    @GetMapping("/artists")
    public Page<Artist> getAllArtists(@RequestParam("page") int page, @RequestParam("limit") int limit) {
        if(limit==0){
            limit=Integer.MAX_VALUE;
        }
        return artistRepository.findAll(PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "name")));
    }

    @GetMapping("/artists/{id}")
    public ResponseEntity<Artist> getArtist(@PathVariable(value = "id") Long artistId) throws DataValidationException {
        Artist artist = artistRepository.findById(artistId).orElseThrow(()->new DataValidationException("Artist with this index can't be found"));
        return ResponseEntity.ok(artist);
    }

    @PostMapping("/artists")
    public ResponseEntity<Object> createCountry(@Validated @RequestBody Artist artist){
        Optional<Country> currentCountry = countryRepository.findById(artist.country.id);
        if(currentCountry.isPresent()){
            artist.country = currentCountry.get();
        }
        Artist newArtist = artistRepository.save(artist);
        return new ResponseEntity<Object>(newArtist, HttpStatus.OK);
    }
    @PutMapping("/artists/{id}")
    public ResponseEntity<Artist> updateArtist(@PathVariable(value = "id") Long artistId, @Validated @RequestBody Artist artistDetails) {
        Artist artist = null;
        Optional<Artist> cc = artistRepository.findById(artistId);
        if (cc.isPresent()) {
            artist = cc.get();
            artist.name = artistDetails.name;
            artist.country = artistDetails.country;
            artist.century = artistDetails.century;
            artistRepository.save(artist);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "artist_not_found");
        }
        return ResponseEntity.ok(artist);
    }

    @PostMapping("/deleteartists")
    public ResponseEntity deleteArtists(@Validated @RequestBody List<Artist> artists) {
        artistRepository.deleteAll(artists);
        return new ResponseEntity(HttpStatus.OK);
    }
}

