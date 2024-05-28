import React, { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import styles from '../styles/Facility.module.css';

interface FacilityProps {
  reports: any[];
}

const Facility: React.FC<FacilityProps> = ({ reports }) => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [initials, setInitials] = useState('');
  const [pin, setPin] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [currentReportId, setCurrentReportId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const refresh = Router;

  const categories = ['All', 'Call light', 'TV', 'Bed', 'Plumbing', 'Lights', 'Miscellaneous'];

  const markComplete = async (id: string, initials: string) => {
    await axios.post('/api/mark-complete', { id, initials });
    refresh.reload();
  };

  const handleMarkComplete = (id: string) => {
    setCurrentReportId(id);
    setShowPopup(true);
  };

  const verifyPin = async () => {
    if (pin === process.env.NEXT_PUBLIC_COMPLETE_PIN) {
      if (initials && currentReportId) {
        markComplete(currentReportId, initials);
        setShowPopup(false);
        setInitials('');
        setPin('');
      }
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const toggleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  const filteredReports = reports
    .filter((report) => report.complete === showCompleted)
    .filter((report) => selectedCategory === 'All' || report.category === selectedCategory)
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateB.getTime() - dateA.getTime();
    });

  return (
    <div className={styles.container}>
      <div>
        {showCompleted ? <h2>Completed Reports</h2> : <h2>Incomplete Reports</h2>}
        <button onClick={toggleShowCompleted} className={styles.toggleButton}>
          {showCompleted ? 'Show Incomplete Reports' : 'Show Completed Reports'}
        </button>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={styles.dropdown}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Report</th>
              <th>Category</th>
              <th>Status</th>
              {showCompleted ? null : <th>Action</th>}
              {showCompleted && <th>Date Completed</th>}
              {showCompleted && <th>Completed By</th>}
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={report._id} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td>{report.name}</td>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>{report.location}</td>
                <td>{report.text}</td>
                <td>{report.category}</td>
                <td>{report.complete ? 'Complete' : 'Incomplete'}</td>
                {showCompleted && <td>{report.completedDate}</td>}
                {showCompleted && <td>{report.completedBy}</td>}
                {!showCompleted && (
                  <td>
                    <button onClick={() => handleMarkComplete(report._id)} className={styles.completeButton}>
                      Mark as Complete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Enter Initials and PIN</h2>
            <input
              type="text"
              placeholder="Initials"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
            />
            <input
              type="password"
              placeholder="PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
            <button onClick={verifyPin}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Facility;
