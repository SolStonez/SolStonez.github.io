import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportForm from '../../components/ReportForm';
import Facility from '../../components/Facility';

const FacilityPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reports, setReports] = useState<[]>([]);
  const [facilityName, setFacilityName] = useState<string>('');

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

  useEffect(() => {
    if (id) {
      const facilityId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10);

      if (facilityId && facilityNames[facilityId]) {
        setFacilityName(facilityNames[facilityId]);

        axios.get(`/api/get-reports?facility=${facilityId}`)
          .then((response) => {
            setReports(response.data);
          })
          .catch((error) => {
            console.error('Error fetching reports:', error);
          });
      }
    }
  }, [id]);

  return (
    <div>
      <h1>{facilityName} Maintenance Log</h1>
      <p>You will need the facility PIN in order to submit work orders, please see Maintenance for the PIN. </p>
      <ReportForm facilityId={id} />
      <Facility reports={reports} />
    </div>
  );
};

export default FacilityPage;
