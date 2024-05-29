import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/dbConnect';
import Report from '../../models/Report';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'GET') {
    const { facility } = req.query;

    try {
      const reports = await Report.find({ facility: Number(facility) });
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).send('Error fetching reports');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
