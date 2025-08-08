const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Email configuration
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'focusritual1@gmail.com',
    pass: process.env.EMAIL_PASS // Use App Password for Gmail
  }
});

// Route to send email with PDF report
app.post('/api/send-report', upload.single('report'), async (req, res) => {
  try {
    const { language, paymentAccount, recipientEmail } = req.body;
    const reportFile = req.file;

    if (!reportFile) {
      return res.status(400).json({ error: 'No report file provided' });
    }

    // Prepare email content
    const accountType = paymentAccount.type.includes('Credit') ? 'credit card' : 'bank account';
    const reportFileName = language === 'english' ? 'Credit_Report_English.pdf' : 'Credit_Report_Arabic.pdf';

    const mailOptions = {
      from: process.env.EMAIL_USER || 'focusritual1@gmail.com',
      to: recipientEmail || process.env.EMAIL_RECIPIENT || 'mahmouddattiaa7@gmail.com',
      subject: `Credit Report Request - ${language === 'english' ? 'English' : 'Arabic'} - Kepler`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">Kepler Credit Report</h2>
          
          <p>Dear Customer,</p>
          
          <p>Your comprehensive credit report in <strong>${language === 'english' ? 'English' : 'Arabic'}</strong> has been generated and is attached to this email.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Report Includes:</h3>
            <ul>
              <li>Complete credit history analysis</li>
              <li>Account details and transaction history</li>
              <li>Credit score breakdown and factors</li>
              <li>Personalized recommendations</li>
              <li>Secure PDF format with encryption</li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <strong>⚠️ CONFIDENTIAL:</strong> This report contains sensitive financial information. Please keep it secure and confidential.
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Billing Information:</h4>
            <p><strong>Service Fee:</strong> £25.00</p>
            <p><strong>Payment Method:</strong> ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} - ${paymentAccount.name}</p>
            <p><strong>Processing Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
          </div>
          
          <p>If you have any questions about your report, please contact our support team.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              Best regards,<br>
              Kepler Credit Services Team<br><br>
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: reportFileName,
          path: reportFile.path,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    // Clean up uploaded file
    fs.unlinkSync(reportFile.path);

    console.log('Email sent:', info.messageId);
    
    res.json({
      success: true,
      messageId: info.messageId,
      message: `Report sent successfully to ${recipientEmail || 'mahmouddattiaa7@gmail.com'}`
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Route to send email with local PDF files
app.post('/api/send-report-local', async (req, res) => {
  try {
    const { language, paymentAccount } = req.body;

    // Use local PDF files
    const reportFileName = language === 'english' ? 'report in english.pdf' : 'report in arabic.pdf';
    const reportPath = path.join(__dirname, '..', 'assets', 'report', reportFileName);

    // Check if file exists
    if (!fs.existsSync(reportPath)) {
      return res.status(404).json({ error: `Report file not found: ${reportFileName}` });
    }

    console.log(`Using report file: ${reportPath}`);

    const accountType = paymentAccount.type.includes('Credit') ? 'credit card' : 'bank account';

    const mailOptions = {
      from: process.env.EMAIL_USER || 'focusritual1@gmail.com',
      to: process.env.EMAIL_RECIPIENT || 'mahmouddattiaa7@gmail.com',
      subject: `Credit Report Request - ${language === 'english' ? 'English' : 'Arabic'} - Kepler`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8B5CF6;">Kepler Credit Report</h2>
          
          <p>Dear Customer,</p>
          
          <p>Your comprehensive credit report in <strong>${language === 'english' ? 'English' : 'Arabic'}</strong> has been generated and is attached to this email.</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Report Includes:</h3>
            <ul>
              <li>Complete credit history analysis</li>
              <li>Account details and transaction history</li>
              <li>Credit score breakdown and factors</li>
              <li>Personalized recommendations</li>
              <li>Secure PDF format with encryption</li>
            </ul>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
            <strong>⚠️ CONFIDENTIAL:</strong> This report contains sensitive financial information. Please keep it secure and confidential.
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="margin-top: 0;">Billing Information:</h4>
            <p><strong>Service Fee:</strong> £25.00</p>
            <p><strong>Payment Method:</strong> ${accountType.charAt(0).toUpperCase() + accountType.slice(1)} - ${paymentAccount.name}</p>
            <p><strong>Processing Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
          </div>
          
          <p>If you have any questions about your report, please contact our support team.</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              Best regards,<br>
              Kepler Credit Services Team<br><br>
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: reportFileName,
          path: reportPath,
          contentType: 'application/pdf'
        }
      ]
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.messageId);
    
    res.json({
      success: true,
      messageId: info.messageId,
      message: `${language === 'english' ? 'English' : 'Arabic'} report sent successfully to mahmouddattiaa7@gmail.com`
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      error: 'Failed to send email',
      details: error.message
    });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Email server is running' });
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
