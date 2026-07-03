package com.Kalai.jobtracker.controller;
import com.Kalai.jobtracker.dto.DashboardStats;
import com.Kalai.jobtracker.dto.JobApplicationRequest;
import com.Kalai.jobtracker.model.JobApplication;
import com.Kalai.jobtracker.service.JobApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

    @RestController
    @RequestMapping("/api/jobs")
    public class JobApplicationController {

        @Autowired
        private JobApplicationService jobService;

        // Add job application
        @PostMapping("/add")
        public JobApplication addApplication(
                @RequestBody JobApplicationRequest request,
                Principal principal) {
            return jobService.addApplication(
                    request,
                    principal.getName());
        }

        // Get all applications
        @GetMapping("/all")
        public List<JobApplication> getAllApplications(
                Principal principal) {
            return jobService.getAllApplications(
                    principal.getName());
        }

        // Update status
        @PutMapping("/update/{id}")
        public JobApplication updateStatus(
                @PathVariable Long id,
                @RequestParam String status) {
            return jobService.updateStatus(id, status);
        }

        // Delete application
        @DeleteMapping("/delete/{id}")
        public String deleteApplication(
                @PathVariable Long id) {
            return jobService.deleteApplication(id);
        }

        // Get dashboard statistics
        @GetMapping("/dashboard")
        public DashboardStats getDashboardStats(
                Principal principal) {
            return jobService.getDashboardStats(
                    principal.getName());
        }
    }


