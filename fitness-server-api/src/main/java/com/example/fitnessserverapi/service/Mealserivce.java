package com.example.fitnessserverapi.service;


import com.example.fitnessserverapi.model.Meal;
import com.example.fitnessserverapi.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Mealserivce {

    @Autowired
    private MealRepository mealRepository;


    public void saveorMeal(Meal meal) {

        mealRepository.save(meal);

    }

    public Iterable<Meal> listAlll() {

        return this.mealRepository.findAll();
    }


    public void deletemeal(String id) {
        mealRepository.deleteById(id);
    }


}
