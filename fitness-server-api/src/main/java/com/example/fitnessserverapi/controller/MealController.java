package com.example.fitnessserverapi.controller;

import com.example.fitnessserverapi.model.Meal;
import com.example.fitnessserverapi.service.Mealserivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}, allowedHeaders = "*")
@RequestMapping("/api/v1/Meal")
public class MealController {

    @Autowired
    private Mealserivce mealservice;

    @PostMapping(value ="/CrateMeal")
    public ResponseEntity<?> saveMeal(@RequestBody Meal meal) {
        try {
            // Ensure that the dietary preference field is not empty before saving
            if (meal.getDietaryPreference() == null || meal.getDietaryPreference().isEmpty()) {
                return ResponseEntity.badRequest().body("Dietary preference cannot be empty");
            }
            mealservice.saveorMeal(meal);
            return ResponseEntity.status(HttpStatus.CREATED).body(meal);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create meal: " + e.getMessage());
        }
    }

    @GetMapping(value = "/getAll")
    public Iterable<Meal> getMeal() {
        return mealservice.listAlll();
    }

    @PutMapping(value = "/editMeal/{id}")
    private Meal update(@RequestBody Meal meal, @PathVariable(name="id")String _id) {
        meal.set_id(_id);
        mealservice.saveorMeal(meal);
        return meal;
    }

    @DeleteMapping("/deleteM/{id}")
    public ResponseEntity<?> deleteMeal(@PathVariable("id") String _id) {
        try {
            mealservice.deletemeal(_id);
            return ResponseEntity.ok("Delete successful for ID: " + _id);  // Properly return a response indicating success without a body
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to delete post with ID: " + _id + " due to: " + e.getMessage());
        }
    }
}
