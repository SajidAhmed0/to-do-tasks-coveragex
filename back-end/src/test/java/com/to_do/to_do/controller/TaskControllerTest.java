package com.to_do.to_do.controller;

import com.to_do.to_do.entity.Task;
import com.to_do.to_do.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTask() {
        Task task = new Task(null, "New Task", "Task Description", false, null);
        when(taskService.createTask(any(Task.class))).thenReturn(task);

        ResponseEntity<Task> response = taskController.createTask(task);
        assertEquals(201, response.getStatusCodeValue());
        assertEquals("New Task", response.getBody().getTitle());
    }

    @Test
    void testGetLatestTasks() {
        when(taskService.getLatestTasks()).thenReturn(List.of(new Task()));
        ResponseEntity<List<Task>> response = taskController.getLatestTasks();
        assertEquals(200, response.getStatusCodeValue());
        assertFalse(response.getBody().isEmpty());
    }

    @Test
    void testMarkAsCompleted() {
        Task task = new Task(1L, "Task", "Description", true, null);
        when(taskService.markAsCompleted(1L)).thenReturn(Optional.of(task));

        ResponseEntity<Task> response = taskController.markAsCompleted(1L);
        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().getStatus());
    }
}