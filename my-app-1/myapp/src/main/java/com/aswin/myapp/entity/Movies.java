package com.aswin.myapp.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;

@Table(name = "Letterboard2")
@Entity
public class Movies {

    @Id
    @GeneratedValue
    @Column(name = "Id")
    private long id;

    @Column(name = "movie_name")
    private String movieName;

    @Column(name = "rating")
    private String rating;

    @Column(name = "review")
    private String review;

    @Column(name = "month")
    private String month;

    @Column(name = "image_url")
    private String imageUrl;

    // Constructors
    public Movies() {}

    public Movies(long id, String movieName, String rating, String review, String month, String imageUrl) {
        this.id = id;
        this.movieName = movieName;
        this.rating = rating;
        this.review = review;
        this.month = month;
        this.imageUrl = imageUrl;
    }

    // Getters and Setters
    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getMovieName() {
        return movieName;
    }

    public void setMovieName(String movieName) {
        this.movieName = movieName;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
