import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'zoho',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const mailOptions = (report: any) => {
  const facilityEmail = process.env[`FACILITY${report.facility}_EMAIL`];
  return {
    from: process.env.EMAIL_USER,
    to: facilityEmail,
    subject: `New Maintenance Report for Facility ${report.facility}`,
    text: `
      A new maintenance report has been submitted.

      Name: ${report.name}
      Date: ${report.date}
      Time: ${report.time}
      Location: ${report.location}
      Category: ${report.category}
      Report: ${report.text}
    `,
  };
};
