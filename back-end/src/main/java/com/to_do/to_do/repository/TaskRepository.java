package com.to_do.to_do.repository;

import com.to_do.to_do.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE t.status = false ORDER BY t.createdAt DESC LIMIT 5")
    List<Task> findLatestFiveIncompleteTasks();
}
