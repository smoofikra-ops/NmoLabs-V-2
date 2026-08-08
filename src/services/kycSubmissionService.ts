export interface KYCSubmissionPayload {
  submission_id: string;
  submitted_at: string;
  language: string;
  completion_percentage: number;
  primary_service: string;
  selected_subservices: string;
  client_information: {
    name: string;
    phone: string;
    email: string;
  };
  business_information: {
    company: string;
  };
  project_information: {
    description: string;
    budget: string;
    timeline: string;
  };
  platform_information: string;
  content_information: string;
  attachments_information: string;
  approval_response_time: string;
  answers: Record<string, string>;
}

export interface KYCSubmissionResponse {
  success: boolean;
  message?: string;
  submission_id?: string;
  row_number?: number;
}

export const submitKYCForm = async (payload: KYCSubmissionPayload): Promise<KYCSubmissionResponse> => {
  console.log("=== [Frontend] submitKYCForm called ===");
  console.log("Payload:", payload);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds timeout

    console.log("Sending request to /api/kyc-submit...");
    const response = await fetch('/api/kyc-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log("HTTP Status from /api/kyc-submit:", response.status);

    const data = await response.json();
    console.log("Response body from /api/kyc-submit:", data);

    if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error: any) {
    console.error("=== [Frontend] KYC Submission error ===");
    console.error(error);
    if (error.name === 'AbortError') {
      return { success: false, message: 'انتهت مهلة الاتصال بالخادم. يرجى المحاولة مرة أخرى.' }; // Connection timeout
    }
    return { success: false, message: error.message || 'تعذر الاتصال بالخادم.' };
  }
};
