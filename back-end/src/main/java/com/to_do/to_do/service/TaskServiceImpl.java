package com.to_do.to_do.service;

import com.to_do.to_do.entity.Task;
import com.to_do.to_do.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getLatestTasks() {
        return taskRepository.findLatestFiveIncompleteTasks();
    }

    @Override
    public Task markAsCompleted(Long id) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(true);
        return taskRepository.save(task);
    }
}
