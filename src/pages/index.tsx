import Link from 'next/link';
import { useState, useEffect } from 'react';
import names from '../models/FacilityNames';

const Home: React.FC = () => {
  
  const facilityNames = names()
  
  
  return (
    <div>
      <h1>Maintenance Reports</h1>
      <ul>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((facility) => (
          <li key={facility}>
            <Link href={`/facility/${facility}`}>{facilityNames[facility]}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
