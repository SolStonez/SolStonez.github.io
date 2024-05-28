import { NextApiRequest, NextApiResponse } from 'next';
import { transporter, mailOptions } from '../../../nodemailerConfig';
import dbConnect from '../../lib/dbConnect';
import Report from '../../models/Report';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  
  
  if (req.method === 'POST') {
    const { facility, name, date, time, location, text, category } = req.body;

    try {
      const newReport = new Report({ facility, name, date, time, location, text, category });
      const newReportAdded = await newReport.save();
      
      console.log(newReportAdded)

     // Send email
      await transporter.sendMail(mailOptions(newReport));
       res.status(200).send('Report submitted successfully');
      
    } catch (error) {
      console.error('Error submitting report:', error);
      res.status(500).send('Error submitting report');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
}
