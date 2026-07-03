import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllJobs, updateJobStatus, 
         deleteJob, getDashboard } from '../services/api';

function Dashboard() {

  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  // Load jobs and stats when page opens
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // If no token → go to login
      if (!token) {
        navigate('/login');
        return;
      }

      const jobsResponse = await getAllJobs();
      const statsResponse = await getDashboard();
      setJobs(jobsResponse.data);
      setStats(statsResponse.data);
      setLoading(false);
    } catch (err) {
      console.log('Error:', err);
      setLoading(false);
    }
};
  

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateJobStatus(id, status);
      fetchData();
    } catch (err) {
      alert('Failed to update status!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading...
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>
          👋 Welcome, {name}!
        </h2>
        <div style={styles.headerButtons}>
          <button
            style={styles.addButton}
            onClick={() => navigate('/addjob')}>
            + Add Job
          </button>
          <button
            style={styles.logoutButton}
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={{...styles.statCard, 
                     backgroundColor: '#2196F3'}}>
          <h3>{stats.totalApplications}</h3>
          <p>Total</p>
        </div>
        <div style={{...styles.statCard,
                     backgroundColor: '#FF9800'}}>
          <h3>{stats.applied}</h3>
          <p>Applied</p>
        </div>
        <div style={{...styles.statCard,
                     backgroundColor: '#9C27B0'}}>
          <h3>{stats.shortlisted}</h3>
          <p>Shortlisted</p>
        </div>
        <div style={{...styles.statCard,
                     backgroundColor: '#00BCD4'}}>
          <h3>{stats.interview}</h3>
          <p>Interview</p>
        </div>
        <div style={{...styles.statCard,
                     backgroundColor: '#4CAF50'}}>
          <h3>{stats.offered}</h3>
          <p>Offered</p>
        </div>
        <div style={{...styles.statCard,
                     backgroundColor: '#F44336'}}>
          <h3>{stats.rejected}</h3>
          <p>Rejected</p>
        </div>
      </div>

      {/* Jobs List */}
      <h3 style={styles.jobsTitle}>
        My Applications
      </h3>

      {jobs.length === 0 ? (
        <div style={styles.noJobs}>
          <p>No applications yet!</p>
          <button
            style={styles.addButton}
            onClick={() => navigate('/addjob')}>
            Add Your First Job
          </button>
        </div>
      ) : (
        jobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>

            <div style={styles.jobInfo}>
              <h3 style={styles.company}>
                {job.companyName}
              </h3>
              <p style={styles.role}>{job.role}</p>
              <p style={styles.date}>
                Applied: {job.dateApplied}
              </p>
              {job.notes && (
                <p style={styles.notes}>
                  📝 {job.notes}
                </p>
              )}
            </div>

            <div style={styles.jobActions}>
              <span style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(
                                  job.status)
              }}>
                {job.status}
              </span>

              <select
                style={styles.select}
                onChange={(e) => handleStatusUpdate(
                           job.id, e.target.value)}
                defaultValue="">
                <option value="" disabled>
                  Update Status
                </option>
                <option value="Applied">Applied</option>
                <option value="Shortlisted">
                  Shortlisted</option>
                <option value="Interview">
                  Interview</option>
                <option value="Offered">Offered</option>
                <option value="Rejected">
                  Rejected</option>
              </select>

              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(job.id)}>
                Delete
              </button>
            </div>

          </div>
        ))
      )}
    </div>
  );
}

// Status color function
const getStatusColor = (status) => {
  switch(status) {
    case 'Applied':     return '#FF9800';
    case 'Shortlisted': return '#9C27B0';
    case 'Interview':   return '#00BCD4';
    case 'Offered':     return '#4CAF50';
    case 'Rejected':    return '#F44336';
    default:            return '#999';
  }
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    backgroundColor: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  headerTitle: {
    margin: 0,
    color: '#333'
  },
  headerButtons: {
    display: 'flex',
    gap: '12px'
  },
  statsContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '24px',
    flexWrap: 'wrap'
  },
  statCard: {
    color: 'white',
    padding: '16px 24px',
    borderRadius: '12px',
    textAlign: 'center',
    minWidth: '100px',
    flex: 1
  },
  jobsTitle: {
    color: '#333',
    marginBottom: '16px'
  },
  jobCard: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    marginBottom: '16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  jobInfo: {
    flex: 1
  },
  company: {
    margin: '0 0 4px 0',
    color: '#333',
    fontSize: '18px'
  },
  role: {
    margin: '0 0 4px 0',
    color: '#666',
    fontSize: '14px'
  },
  date: {
    margin: '0 0 4px 0',
    color: '#999',
    fontSize: '12px'
  },
  notes: {
    margin: '4px 0 0 0',
    color: '#666',
    fontSize: '13px'
  },
  jobActions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px'
  },
  statusBadge: {
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  select: {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '13px',
    cursor: 'pointer'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  deleteButton: {
    padding: '6px 14px',
    backgroundColor: '#F44336',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  },
  noJobs: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '12px',
    color: '#666'
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }
};

export default Dashboard;