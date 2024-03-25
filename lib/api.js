// Custom functions for API calls

// set base URL set as an environment variable
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// create a new Loan Accounting Example in the mongodb database via form submission
// route: /api/accounting
export const createLoanAccountingExample = async (formData) => {
  console.log("form data being submitted to the API: ", formData);
  const response = await fetch(`${BASE_URL}/api/accounting`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
  return data;
};

// get all loan accounting examples from the database
// route:  /api/accounting
export const getLoanAccountingExamples = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/accounting/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Error fetching loan accounting examples: " + response.statusText);
    }
  } catch (error) {
    throw new Error("Error fetching loan accounting examples: " + error.message);
  }
};

// fetch a specific loan accounting example from /api/accounting/[accountingExampleId]
export const getLoanAccountingExampleById = async (accountingExampleId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/accounting/${accountingExampleId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const example = await response.json();
      return example;
    } else {
      throw new Error("Error fetching loan accounting example: " + response.statusText);
    }
  } catch (error) {
    throw new Error("Error fetching loan accounting example: " + error.message);
  }
}

// delete a specific loan accounting example from /api/accounting/[accountingExampleId]
export const deleteLoanAccountingExampleById = async (accountingExampleId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/accounting/${accountingExampleId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error("Error deleting example: " + response.statusText);
    }
  } catch (error) {
    throw new Error("Error deleting example: " + error.message);
  }
}
