package com.to_do.to_do.service;

import com.to_do.to_do.entity.Task;
import com.to_do.to_do.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testCreateTask() {
        Task task = new Task(null, "Test Task", "Test Description", false, null);
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Task createdTask = taskService.createTask(task);
        assertNotNull(createdTask);
        assertEquals("Test Task", createdTask.getTitle());
    }

    @Test
    void testGetLatestTasks() {
        when(taskRepository.findLatestFiveIncompleteTasks()).thenReturn(List.of(new Task()));
        List<Task> tasks = taskService.getLatestTasks();
        assertFalse(tasks.isEmpty());
    }

    @Test
    void testMarkAsCompleted() {
        Task task = new Task(1L, "Task", "Description", false, null);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        Optional<Task> completedTask = taskService.markAsCompleted(1L);
        assertTrue(completedTask.isPresent());
        assertTrue(completedTask.get().getStatus());
    }
}