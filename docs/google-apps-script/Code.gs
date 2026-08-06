function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, message: "No data provided" }, 400);
    }

    var payload = JSON.parse(e.postData.contents);
    
    // Verify required fields
    if (!payload.submission_id) {
      return createJsonResponse({ success: false, message: "Missing submission_id" }, 400);
    }

    var scriptProperties = PropertiesService.getScriptProperties();
    var spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
    var sheetName = scriptProperties.getProperty('SHEET_NAME');

    if (!spreadsheetId || !sheetName) {
      return createJsonResponse({ success: false, message: "Server configuration error: Missing SPREADSHEET_ID or SHEET_NAME" }, 500);
    }

    var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
    
    if (!sheet) {
      return createJsonResponse({ success: false, message: "Sheet not found" }, 500);
    }

    // Check for duplicates
    var data = sheet.getDataRange().getValues();
    if (data.length > 0) {
      var headers = data[0];
      var idIndex = headers.indexOf('submission_id');
      
      if (idIndex > -1) {
        for (var i = 1; i < data.length; i++) {
          if (data[i][idIndex] === payload.submission_id) {
             return createJsonResponse({ 
               success: false, 
               message: "Submission ID already exists",
               submission_id: payload.submission_id
             }, 409);
          }
        }
      }
    }

    // Prepare row data
    var headers = [
      "submission_id", "submitted_at", "language", "completion_percentage",
      "primary_service", "selected_subservices", "client_name", "client_phone",
      "client_email", "company_name", "project_description", "project_budget",
      "project_timeline", "approval_response_time", "dynamic_answers"
    ];

    // Write headers if sheet is empty
    if (data.length === 0) {
      sheet.appendRow(headers);
    } else {
      headers = data[0]; // Use existing headers
    }

    var rowData = headers.map(function(header) {
      switch (header) {
        case 'submission_id': return payload.submission_id;
        case 'submitted_at': return payload.submitted_at;
        case 'language': return payload.language;
        case 'completion_percentage': return payload.completion_percentage;
        case 'primary_service': return payload.primary_service;
        case 'selected_subservices': return payload.selected_subservices;
        case 'client_name': return payload.client_information ? payload.client_information.name : '';
        case 'client_phone': return payload.client_information ? payload.client_information.phone : '';
        case 'client_email': return payload.client_information ? payload.client_information.email : '';
        case 'company_name': return payload.business_information ? payload.business_information.company : '';
        case 'project_description': return payload.project_information ? payload.project_information.description : '';
        case 'project_budget': return payload.project_information ? payload.project_information.budget : '';
        case 'project_timeline': return payload.project_information ? payload.project_information.timeline : '';
        case 'approval_response_time': return payload.approval_response_time || '';
        case 'dynamic_answers': return payload.answers ? JSON.stringify(payload.answers) : '';
        default: return '';
      }
    });

    sheet.appendRow(rowData);
    var rowNumber = sheet.getLastRow();

    return createJsonResponse({
      success: true,
      message: "Submission saved successfully",
      submission_id: payload.submission_id,
      row_number: rowNumber
    }, 200);

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "Server error: " + error.toString()
    }, 500);
  }
}

function createJsonResponse(responseObject, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(responseObject));
  output.setMimeType(ContentService.MimeType.JSON);
  // ContentService doesn't allow setting HTTP status codes directly other than 200 usually, 
  // but returning JSON is standard practice.
  return output;
}
