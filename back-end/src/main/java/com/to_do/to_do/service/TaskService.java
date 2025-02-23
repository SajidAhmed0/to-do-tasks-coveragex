package com.to_do.to_do.service;

import com.to_do.to_do.entity.Task;

import java.util.List;

public interface TaskService {
    public Task createTask(Task task);
    public List<Task> getLatestTasks();
    public Task markAsCompleted(Long id);
}
