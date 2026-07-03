import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../services/api';

function AddJob() {

  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');
  const [dateApplied, setDateApplied] = useState('');
  const [status, setStatus] = useState('Applied');
  const [jobDescription, setJobDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

  const handleAddJob = async () => {

    if (!companyName || !role || !dateApplied) {
      setMessage('Please fill company, role and date!');
      return;
    }

    try {
      await addJob({
        companyName,
        role,
        dateApplied,
        status,
        jobDescription,
        notes
      });

      setMessage('Job added successfully!');

      // Go to dashboard after 1.5 seconds
      setTimeout(() => navigate('/dashboard'), 1500);

    } catch (err) {
      setMessage('Failed to add job!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <div style={styles.header}>
          <h2 style={styles.title}>
            Add Job Application
          </h2>
          <button
            style={styles.backButton}
            onClick={() => navigate('/dashboard')}>
            ← Back
          </button>
        </div>

        {message && (
          <p style={styles.message}>{message}</p>
        )}

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Company Name *
          </label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex: TCS, Infosys, Wipro"
            value={companyName}
            onChange={(e) =>
              setCompanyName(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Role Applied For *
          </label>
          <input
            style={styles.input}
            type="text"
            placeholder="Ex: Java Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Date Applied *
          </label>
          <input
            style={styles.input}
            type="date"
            value={dateApplied}
            onChange={(e) =>
              setDateApplied(e.target.value)}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Current Status
          </label>
          <select
            style={styles.input}
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)}>
            <option value="Applied">Applied</option>
            <option value="Shortlisted">
              Shortlisted</option>
            <option value="Interview">Interview</option>
            <option value="Offered">Offered</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Job Description
          </label>
          <textarea
            style={styles.textarea}
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>
            Notes
          </label>
          <textarea
            style={styles.textarea}
            placeholder="Your notes about this job..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <button
          style={styles.submitButton}
          onClick={handleAddJob}>
          Add Job Application
        </button>

      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    padding: '40px 20px',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
    height: 'fit-content'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px'
  },
  title: {
    margin: 0,
    color: '#333'
  },
  backButton: {
    padding: '8px 16px',
    backgroundColor: '#666',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#555',
    marginBottom: '6px'
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none'
  },
  textarea: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical'
  },
  submitButton: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '8px'
  },
  message: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    marginBottom: '16px'
  }
};

export default AddJob;