import Link from 'next/link';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  
  const facilityNames: { [key: number]: string } = {
    1: 'Gridley Post Acute',
    2: 'Example Facility 2',
    3: 'Example Facility 3',
    4: 'Example Facility 4',
    5: 'Example Facility 5',
    6: 'Example Facility 6',
    7: 'Example Facility 7',
    8: 'Example Facility 8',
  };
  
  
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
      <Footer />
    </div>
  );
};

export default Home;
