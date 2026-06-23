package com.Kalai.jobtracker.repository;
import com.Kalai.jobtracker.model.JobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

    public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {

        List<JobApplication> findByUserId(Long userId);

        List<JobApplication> findByUserIdAndStatus(
                Long userId, String status);

        long countByUserIdAndStatus(
                Long userId, String status);
    }
