//package com.aswin.myapp.controller;
//
//import java.util.List;
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import org.springframework.web.bind.annotation.RestController;
//
//
//import com.aswin.myapp.entity.Movies;
//import com.aswin.myapp.service.Movieservice;
//
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/Movies")
//public class Moviecontroller {
//@Autowired
//private Movieservice movser;
//@GetMapping("/getmov")
//public List <Movies> getDetails(){
//	return movser.getAllDetails();
//}
//@GetMapping("/getmov/{Movie_id}")
//public Optional<Movies> getById(@PathVariable long Movie_id){
//	return movser.getById(Movie_id);
//}
//@PostMapping("/addmov")
//	public Movies PostDetails(@RequestBody Movies M) {
//		return movser.SaveDetails(M);
//	}
//
//
//@DeleteMapping("/delete/{Movie_id}")
//public void delete(@PathVariable long  Movie_id) {
//	movser.deleteById(Movie_id);
//}
//@PutMapping("/update/{Movie_id}")
//public Movies update(@PathVariable long Movie_id, @RequestBody Movies M) {
//	return movser.update(Movie_id, M);
//}
//
//}
package com.aswin.myapp.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.aswin.myapp.entity.Movies;
import com.aswin.myapp.service.Movieservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin("*")
@RestController
@RequestMapping("/Movies")
public class Moviecontroller {

    private static final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @Autowired
    private Movieservice movser;

    @GetMapping("/getmov")
    public List<Movies> getDetails() {
        return movser.getAllDetails();
    }

    @PostMapping("/addmov")
    public Movies postDetails(@RequestBody Movies m) {
        return movser.SaveDetails(m);
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("image") MultipartFile file) {
        try {
            Files.createDirectories(Paths.get(UPLOAD_DIR));
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(UPLOAD_DIR, filename);
            Files.write(filePath, file.getBytes());

            // Notice this URL matches the new method below
            String imageUrl = "http://localhost:8080/Movies/uploads/" + filename;
            return ResponseEntity.ok(imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    // ✅ Serve uploaded image files manually
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<byte[]> serveImage(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(UPLOAD_DIR + filename);
            byte[] imageBytes = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .header("Content-Type", Files.probeContentType(filePath))
                    .body(imageBytes);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        movser.deleteById(id);
    }

    @PutMapping("/update/{id}")
    public Movies update(@PathVariable long id, @RequestBody Movies m) {
        return movser.update(id, m);
    }

    @GetMapping("/getmov/{id}")
    public Optional<Movies> getById(@PathVariable long id) {
        return movser.getById(id);
    }
}
