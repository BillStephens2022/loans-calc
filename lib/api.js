// Custom functions for API calls

// set base URL set as an environment variable
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";

// create a new Loan Accounting Example in the mongodb database via form submission
// route: /api/accounting
export const createLoanAccountingExample = async (formData) => {
  
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
