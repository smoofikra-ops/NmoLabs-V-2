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
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch('/api/kyc-submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error("KYC Submission error:", error);
    if (error.name === 'AbortError') {
      return { success: false, message: 'Request timed out. Please try again.' };
    }
    return { success: false, message: error.message || 'Failed to submit form.' };
  }
};
