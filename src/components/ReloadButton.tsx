// components/ReloadButton.tsx
import React from 'react';
import styles from '../styles/Facility.module.css';

const ReloadButton: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <button onClick={handleReload} className={styles.toggleButton}>
      Reload
    </button>
  );
};

export default ReloadButton;
