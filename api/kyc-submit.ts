import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const scriptUrl = process.env.KYC_GOOGLE_SCRIPT_URL;

  if (!scriptUrl) {
    console.error("KYC_GOOGLE_SCRIPT_URL is not defined in environment variables.");
    return res.status(500).json({ success: false, message: 'Server configuration error.' });
  }

  try {
    const payload = req.body;

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Google Apps Script returned status: ${response.status}`);
    }

    const data = await response.json().catch(() => ({}));

    // Pass the response from Google Apps Script back to the client
    return res.status(200).json({ 
      success: true, 
      submission_id: data.submission_id || payload.submission_id,
      row_number: data.row_number,
      message: data.message || 'Submission successful'
    });

  } catch (error: any) {
    console.error("API Error in /api/kyc-submit:", error);
    return res.status(500).json({ success: false, message: error.message || 'Failed to submit form to Google Apps Script.' });
  }
}
