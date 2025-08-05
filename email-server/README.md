# iScore Automatic Email Server Setup

This email server enables automatic sending of credit reports from `focusritual1@gmail.com` to `mahmouddattiaa7@gmail.com`.

## Setup Instructions

### 1. Install Dependencies

Navigate to the email server directory and install the required packages:

```bash
cd email-server
npm install
```

### 2. Gmail Configuration

To use Gmail for sending emails, you need to:

1. **Enable 2-Factor Authentication** on your Google account (`focusritual1@gmail.com`)
2. **Generate an App Password**:
   - Go to Google Account settings
   - Select "Security" → "2-Step Verification" → "App passwords"
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update the server configuration**:
   - Open `server.js`
   - Replace `'your-app-password'` with the actual app password you generated

### 3. Start the Email Server

```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The server will start on `http://localhost:3000`

### 4. Test the Server

You can test if the server is running by visiting:
- Health check: `http://localhost:3000/health`

### 5. Copy Report Files

Make sure your PDF report files are in the correct location:
- Copy `report in english.pdf` to `assets/report/`
- Copy `report in arabic.pdf` to `assets/report/`

The server expects these files to be in the parent directory's assets folder.

## API Endpoints

### POST `/api/send-report-local`

Sends an email with the appropriate PDF report based on language selection.

**Request Body:**
```json
{
  "language": "english" | "arabic",
  "paymentAccount": {
    "name": "Account Name",
    "type": "Credit Card" | "Checking Account" | etc.
  }
}
```

**Response:**
```json
{
  "success": true,
  "messageId": "email-message-id",
  "message": "Report sent successfully to mahmouddattiaa7@gmail.com"
}
```

## Security Notes

- Keep your email app password secure
- Never commit passwords to version control
- Consider using environment variables for production
- The server should be hosted securely in production

## Troubleshooting

1. **"Invalid login" error**: Make sure you're using an app password, not your regular Gmail password
2. **File not found**: Check that PDF files are in the correct `assets/report/` directory
3. **Connection refused**: Make sure the server is running on port 3000

## Production Deployment

For production use:
1. Use environment variables for email credentials
2. Add proper error handling and logging
3. Use HTTPS
4. Add rate limiting
5. Consider using a dedicated email service like SendGrid or AWS SES

## Current Configuration

- **From Email**: focusritual1@gmail.com
- **To Email**: mahmouddattiaa7@gmail.com
- **Server Port**: 3000
- **PDF Location**: ../assets/report/
