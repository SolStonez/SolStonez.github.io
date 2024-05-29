import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Facility.module.css';

interface ReportFormProps {
  facilityId: string | string[];
}

interface FormData {
  name: string;
  date: string;
  time: string;
  location: string;
  text: string;
  category: string;
}

const ReportForm: React.FC<ReportFormProps> = ({ facilityId }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    date: '',
    time: '',
    location: '',
    text: '',
    category: '', // Default category
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPinPopup, setShowPinPopup] = useState(false);
  const [pin, setPin] = useState('');
  const router = useRouter();

  const [categories, setCategories] = useState([
    'Call light',
    'TV',
    'Bed',
    'Plumbing',
    'Lights',
    'Miscellaneous'
  ]);

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format
    const time = now.toTimeString().split(' ')[0].substring(0, 5); // Get HH:MM format
    setFormData((prevData) => ({
      ...prevData,
      date,
      time,
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const verifyPin = async () => {
    
    
     
    if (pin === process.env.NEXT_PUBLIC_REPORT_PIN_1) {
      setShowPinPopup(false);
      handleSubmit();
    } else {
      setError('Incorrect PIN. Please try again.');
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post('/api/submit-report', { ...formData, facility: facilityId });
      setFormData({
        name: '',
        date: '',
        time: '',
        location: '',
        text: '',
        category: '',
      });
      router.reload();
    } catch (err) {
      setError('An error occurred while submitting the report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const openPinPopup = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPinPopup(true);
  };

  return (
    <>
      <form onSubmit={openPinPopup} >
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <div className={styles.formRow}>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          <input type="time" name="time" value={formData.time} onChange={handleChange} required />
        </div>
        <input type="text" name="location" placeholder="Location of concern" value={formData.location} onChange={handleChange} required />
        <textarea name="text" placeholder="Please give as much detail about your report as needed." value={formData.text} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange} required className={styles.select}>
          <option value="" disabled>Please choose Category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>Submit Report</button>
        {loading && <p>Submitting...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {showPinPopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Enter PIN</h2>
            <input
              type="password"
              value={pin}
              onChange={handlePinChange}
              className={styles.popupInput}
            />
            <button onClick={verifyPin} className={styles.popupButton}>Verify</button>
            <button onClick={() => setShowPinPopup(false)} className={styles.popupButton}>Cancel</button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
      )}
    </>
  );
};

export default ReportForm;
