import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Report from '../../models/Report';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') { 
    const { id, initials } = req.body;
    const now = new Date();
    

    try {
      const report = await Report.findById(id);
      if (report) {
        report.complete = true;
        report.completedBy = initials
        report.completedDate = now.toISOString().split('T')[0]; // Get YYYY-MM-DD format
        await report.save();
        res.status(200).send('Report marked as complete');
      } else {
        res.status(404).send('Report not found');
      }
    } catch (error) {
      console.error('Error marking report as complete:', error);
      res.status(500).send('Error marking report as complete');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
