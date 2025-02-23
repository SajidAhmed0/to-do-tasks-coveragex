package com.to_do.to_do.controller;

import com.to_do.to_do.entity.Task;
import com.to_do.to_do.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:4200")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @GetMapping
    public List<Task> getLatestTasks() {
        return taskService.getLatestTasks();
    }

    @PutMapping("/{id}/complete")
    public Task markAsCompleted(@PathVariable Long id) {
        return taskService.markAsCompleted(id);
    }
}
