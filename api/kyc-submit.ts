import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  console.log("=== [API /api/kyc-submit] Request received ===");
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const scriptUrl = process.env.KYC_GOOGLE_SCRIPT_URL;
  if (!scriptUrl) {
    console.error("KYC_GOOGLE_SCRIPT_URL is not configured.");
    return res.status(500).json({ success: false, message: 'Google Apps Script URL is not configured. (إعدادات الخادم غير مكتملة)' });
  }

  if (!scriptUrl.startsWith('https://script.google.com/') || !scriptUrl.endsWith('/exec')) {
    console.error("KYC_GOOGLE_SCRIPT_URL is invalid:", scriptUrl);
    return res.status(500).json({ success: false, message: 'Google Apps Script URL is invalid. It must start with https://script.google.com/ and end with /exec.' });
  }

  try {
    const payload = req.body;
    console.log("Payload:", JSON.stringify(payload, null, 2));

    console.log("Sending request to Google Apps Script...");
    
    // We can use AbortController for fetch if we want to enforce timeout on the backend as well
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
    
    let response;
    try {
      response = await fetch(scriptUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });
    } catch (e: any) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        throw new Error('انتهت مهلة الاتصال.');
      }
      throw new Error('تعذر الاتصال بالخادم.');
    }
    clearTimeout(timeoutId);

    console.log("Google Apps Script HTTP Status:", response.status);

    const text = await response.text();
    console.log("Google Apps Script Response Body:", text.substring(0, 500)); // Log first 500 chars

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
         throw new Error(`لم يتم الوصول إلى Google Sheets. يرجى التأكد من نشر السكربت بصلاحية "Anyone" (أي شخص).`);
      }
      if (response.status === 404) {
         throw new Error(`لم يتم الوصول إلى Google Sheets. رابط السكربت غير صحيح أو غير موجود.`);
      }
      throw new Error(`خطأ من Google Apps Script: HTTP ${response.status}.`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse Google Apps Script response as JSON:", e);
      throw new Error(`استجابة غير صالحة من Google Sheets.`);
    }

    if (data.success !== true) {
      throw new Error(data.message || `حدث خطأ أثناء حفظ البيانات في Google Sheets.`);
    }

    console.log("Google Apps Script success! Returning to client.");
    // Pass the response from Google Apps Script back to the client
    return res.status(200).json({ 
      success: true, 
      submission_id: data.submission_id || payload.submission_id,
      row_number: data.row_number,
      message: data.message || 'Submission successful'
    });

  } catch (error: any) {
    console.error("=== API Error in /api/kyc-submit ===");
    console.error(error.stack);
    return res.status(500).json({ success: false, message: error.message || 'تعذر الاتصال بالخادم.' });
  }
}
