# NomoLabs KYC Google Sheets Integration

This document outlines the setup and integration details for connecting the NomoLabs Discovery Portal (KYC form) with Google Apps Script to save submission data in Google Sheets.

## Architecture

1. The frontend (React/Vite) collects the data and sends a standard `POST` request to `/api/kyc-submit`.
2. The Vercel Serverless API function (`api/kyc-submit.ts`) receives the request.
3. The API function securely communicates with the Google Apps Script Web App.
4. The Apps Script writes the data to the Google Sheet and returns the result back to the API.

## Environment Configuration

You must set the following environment variable in your server deployment environment (e.g., Vercel, `.env` for local testing):

- `KYC_GOOGLE_SCRIPT_URL`: The URL of the published Google Apps Script web app.

Example:
\`\`\`env
KYC_GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/AKfycby.../exec"
\`\`\`
**Important:** Do not prefix this variable with `VITE_`. This ensures the script URL remains a server-side secret and is not exposed to the browser.

## Google Apps Script Setup

1. Create a new Google Sheet.
2. Go to **Extensions > Apps Script**.
3. Copy the code from `docs/google-apps-script/Code.gs` and paste it into the editor.
4. In the Apps Script editor, go to **Project Settings** (gear icon) > **Script Properties**.
5. Add the following properties:
   - `SPREADSHEET_ID`: The ID of your Google Sheet (found in the URL).
   - `SHEET_NAME`: The name of the specific sheet tab (e.g., "Sheet1").
6. Click **Deploy > New deployment**.
7. Select **Web app** as the type.
8. Set **Execute as** to "Me".
9. Set **Who has access** to "Anyone".
10. Click **Deploy** and authorize the script.
11. Copy the **Web app URL**.
12. Add the URL as `KYC_GOOGLE_SCRIPT_URL` in your Vercel project settings (or `.env`).
13. Redeploy your Vercel project.

## Payload Structure

When a user submits the form, a JSON payload is sent via a `POST` request. Below is the exact structure of the payload:

\`\`\`json
{
  "submission_id": "NML-XYZ1234",
  "submitted_at": "2023-10-27T10:00:00.000Z",
  "language": "ar",
  "completion_percentage": 100,
  "primary_service": "Website Development",
  "selected_subservices": "Pages, Content, Languages",
  "client_information": {
    "name": "John Doe",
    "phone": "+966500000000",
    "email": "john@example.com"
  },
  "business_information": {
    "company": "Tech Corp"
  },
  "project_information": {
    "description": "General details about the project...",
    "budget": "15,000 - 30,000 SAR",
    "timeline": "1-3 months"
  },
  "platform_information": "",
  "content_information": "",
  "attachments_information": "",
  "approval_response_time": "Within hours",
  "answers": {
    "pages": "Home, About, Contact",
    "content": "We have the logo and some text",
    "languages": "Arabic, English"
  }
}
\`\`\`

## Expected Response from Google Apps Script

The Google Apps Script web app should respond with a JSON object.

Success response:
\`\`\`json
{
  "success": true,
  "message": "Submission saved successfully",
  "submission_id": "NML-XYZ1234",
  "row_number": 12
}
\`\`\`

Error response:
\`\`\`json
{
  "success": false,
  "message": "Missing required fields"
}
\`\`\`

## Local Testing

To test the submission locally:
1. Set `KYC_GOOGLE_SCRIPT_URL` to a valid Apps Script URL in `.env`.
2. Fill out the KYC form entirely.
3. Check the "I confirm..." terms checkbox.
4. Click "Submit Request".
5. If successful, you will see a success screen with the order number and an option to download a JSON copy of your answers. If there's an error (e.g. network failure), it will display an error message and you can retry without losing your data.
