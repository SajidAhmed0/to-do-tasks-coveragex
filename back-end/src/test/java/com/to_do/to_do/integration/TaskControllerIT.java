package com.to_do.to_do.integration;

import com.to_do.to_do.ToDoApplication;
import com.to_do.to_do.entity.Task;
import com.to_do.to_do.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = ToDoApplication.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TaskControllerIT {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @BeforeEach
    void setUp() {
        taskRepository.deleteAll();
    }


    @Test
    void testCreateTask() throws Exception {
        String taskJson = "{\"title\":\"Integration Task\", \"description\":\"Test Integration\"}";

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson))
                .andExpect(status().isCreated());
    }

    @Test
    void testCreateTaskWithoutTitle() throws Exception {
        String taskJson = "{\"title\":\"\", \"description\":\"Test Integration\"}";

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateTaskWithoutDescription() throws Exception {
        String taskJson = "{\"title\":\"Integration Task\", \"description\":\"\"}";

        mockMvc.perform(post("/api/tasks")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(taskJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testGetTasks() throws Exception {
        taskRepository.save(new Task(null, "Task", "Description", false, null));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testGetTasksWithStatusTrue() throws Exception {
        taskRepository.save(new Task(null, "Task", "Description", true, null));

        mockMvc.perform(get("/api/tasks"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testMarkAsCompleted() throws Exception {
        Task task = taskRepository.save(new Task(null, "Task", "Description", false, null));

        mockMvc.perform(put("/api/tasks/" + task.getId() + "/complete"))
                .andExpect(status().isOk());
    }
}
