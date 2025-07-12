package com.aswin.myapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aswin.myapp.entity.Movies;

public interface Movierepo extends JpaRepository <Movies, Long> {

}
