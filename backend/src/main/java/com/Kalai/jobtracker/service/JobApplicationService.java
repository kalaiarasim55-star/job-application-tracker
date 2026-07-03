package com.Kalai.jobtracker.service;
import com.Kalai.jobtracker.dto.DashboardStats;
import com.Kalai.jobtracker.dto.JobApplicationRequest;
import com.Kalai.jobtracker.model.JobApplication;
import com.Kalai.jobtracker.model.User;
import com.Kalai.jobtracker.repository.JobApplicationRepository;
import com.Kalai.jobtracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

    @Service
    public class JobApplicationService {

        @Autowired
        private JobApplicationRepository jobRepository;

        @Autowired
        private UserRepository userRepository;

        // Add new job application
        public JobApplication addApplication(
                JobApplicationRequest request,
                String email) {

            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow();

            JobApplication job = new JobApplication();
            job.setUser(user);
            job.setCompanyName(request.getCompanyName());
            job.setRole(request.getRole());
            job.setDateApplied(request.getDateApplied());
            job.setStatus(request.getStatus());
            job.setJobDescription(
                    request.getJobDescription());
            job.setNotes(request.getNotes());

            return jobRepository.save(job);
        }

        // Get all applications for user
        public List<JobApplication> getAllApplications(String email) {

            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow();

            return jobRepository
                    .findByUserId(user.getId());
        }

        // Update application status
        public JobApplication updateStatus(
                Long id, String status) {

            JobApplication job = jobRepository
                    .findById(id)
                    .orElseThrow();

            job.setStatus(status);
            return jobRepository.save(job);
        }

        // Delete application
        public String deleteApplication(Long id) {
            jobRepository.deleteById(id);
            return "Application deleted successfully!";
        }

        // Get dashboard statistics
        public DashboardStats getDashboardStats(
                String email) {

            User user = userRepository
                    .findByEmail(email)
                    .orElseThrow();

            Long userId = user.getId();

            DashboardStats stats = new DashboardStats();

            stats.setTotalApplications(
                    jobRepository
                            .findByUserId(userId).size());

            stats.setApplied(jobRepository
                    .countByUserIdAndStatus(
                            userId, "Applied"));

            stats.setShortlisted(jobRepository
                    .countByUserIdAndStatus(
                            userId, "Shortlisted"));

            stats.setInterview(jobRepository
                    .countByUserIdAndStatus(
                            userId, "Interview"));

            stats.setOffered(jobRepository
                    .countByUserIdAndStatus(
                            userId, "Offered"));

            stats.setRejected(jobRepository
                    .countByUserIdAndStatus(
                            userId, "Rejected"));

            return stats;
        }
    }

