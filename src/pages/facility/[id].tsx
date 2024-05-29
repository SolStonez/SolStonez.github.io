// pages/facility/[id].tsx
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReportForm from '../../components/ReportForm';
import Facility from '../../components/Facility';
import names from '../../models/FacilityNames';

const FacilityPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [reports, setReports] = useState<[]>([]);
  const [facilityName, setFacilityName] = useState<string>('');

  const facilityNames = names()

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
      <div style={{padding: '20px'}}>
      <h1 style={{textAlign: 'center'}}>{facilityName} Maintenance Log</h1>
      <p style={{textAlign: 'center'}}>You will need the facility PIN in order to submit work orders, please see Maintenance for the PIN. </p>
      <ReportForm facilityId={id} />
      <Facility reports={reports} />
      </div>
    </div>
  );
};

export default FacilityPage;
