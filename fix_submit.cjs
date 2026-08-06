const fs = require('fs');
let code = fs.readFileSync('src/components/DiscoveryPortal.tsx', 'utf8');

const oldSubmit = `    if (result.success) {
      setSubmissionId(result.submission_id || sub_id);
      setSubmitSuccess(true);
      localStorage.removeItem('nomoDiscoveryProgress');
      localStorage.removeItem('nomoDiscoveryStep');
    } else {
      setSubmitError(isEn ? (result.message || 'Failed to submit. Please try again.') : 'فشل الإرسال. يرجى المحاولة مرة أخرى.');
    }`;

const newSubmit = `    if (result.success === true && result.submission_id && result.row_number) {
      setSubmissionId(result.submission_id);
      setSubmitSuccess(true);
      localStorage.removeItem('nomoDiscoveryProgress');
      localStorage.removeItem('nomoDiscoveryStep');
    } else {
      setSubmitError(isEn ? (result.message || 'Failed to submit. Please try again.') : 'فشل الإرسال. يرجى المحاولة مرة أخرى.');
    }`;

code = code.replace(oldSubmit, newSubmit);

fs.writeFileSync('src/components/DiscoveryPortal.tsx', code);
