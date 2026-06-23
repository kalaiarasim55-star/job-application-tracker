package com.Kalai.jobtracker.dto;
import lombok.Data;

@Data
public class DashboardStats {

    private long totalApplications;
    private long applied;
    private long shortlisted;
    private long interview;
    private long offered;
    private long rejected;
}

