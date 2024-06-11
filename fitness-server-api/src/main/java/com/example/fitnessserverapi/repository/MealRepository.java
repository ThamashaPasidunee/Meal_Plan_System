package com.example.fitnessserverapi.repository;


import com.example.fitnessserverapi.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MealRepository extends MongoRepository<Meal,String> {
}
