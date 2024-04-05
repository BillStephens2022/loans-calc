// Custom functions for API calls
import { LoanAccountingExampleDocument } from "../models/loanAccountingExample";
import { JournalEntryDocument } from "../models/journalEntry";
import { LoanAccountingExampleFormData, FrontingExampleFormData } from "../types/types";
import { FrontingExampleDocument } from "../models/frontingExample";

// set base URL set as an environment variable
const BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL || "";

// create a new Loan Accounting Example in the mongodb database via form submission
// route: /api/accounting
export const createLoanAccountingExample = async (
  formData: LoanAccountingExampleFormData
): Promise<LoanAccountingExampleDocument> => {
  const response = await fetch(`${BASE_URL}/api/accounting`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData: { message?: string } = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  const data: LoanAccountingExampleDocument = await response.json();
  return data;
};

// get all loan accounting examples from the database
// route:  /api/accounting
export const getLoanAccountingExamples = async (): Promise<
  LoanAccountingExampleDocument[]
> => {
  const response = await fetch(`${BASE_URL}/api/accounting/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData: { message?: string } = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  const data: LoanAccountingExampleDocument[] = await response.json();
  return data;
};

// fetch a specific loan accounting example from /api/accounting/[accountingExampleId]
export const getLoanAccountingExampleById = async (
  accountingExampleId: string
): Promise<LoanAccountingExampleDocument> => {
  const response = await fetch(
    `${BASE_URL}/api/accounting/${accountingExampleId}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData: { message?: string } = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  const data: LoanAccountingExampleDocument = await response.json();
  return data;
};

// delete a specific loan accounting example from /api/accounting/[accountingExampleId]
export const deleteLoanAccountingExampleById = async (
  accountingExampleId: string
): Promise<boolean> => {
  const response = await fetch(
    `${BASE_URL}/api/accounting/${accountingExampleId}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorData: { message?: string } = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  return true;
};

// get all journal entries from the database
// route:  /api/entries
export const getJournalEntries = async (): Promise<JournalEntryDocument[]> => {
    const response = await fetch(`${BASE_URL}/api/entries/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
    const data: JournalEntryDocument[] = await response.json();
    return data;
};

// Get journal entries by LoanAccountingExample id
// route: /api/entries/:accountId
export const getJournalEntriesByExampleId = async (exampleId: string): Promise<JournalEntryDocument[]> => {
    const response = await fetch(`${BASE_URL}/api/entries/${exampleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
  
    const data: JournalEntryDocument[] = await response.json();
    return data;
};

// create a new Fronting Example in the mongodb database via form submission
// route: /api/fronting
export const createFrontingExample = async (formData: FrontingExampleFormData): Promise<FrontingExampleDocument> => {
  const response = await fetch(`${BASE_URL}/api/fronting`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    const errorData: { message?: string } = await response.json();
    throw new Error(errorData.message || "Something went wrong!");
  }

  const data: FrontingExampleDocument = await response.json();
  return data;
};

// get all fronting examples from the database
// route:  /api/fronting
export const getFrontingExamples = async (): Promise<FrontingExampleDocument[]> => {
    const response = await fetch(`${BASE_URL}/api/fronting/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
    const data: FrontingExampleDocument[] = await response.json();
    return data;
};

// fetch a specific fronting example from /api/fronting/[frontingExampleId]
export const getFrontingExampleById = async (frontingExampleId: string): Promise<FrontingExampleDocument> => {
    const response = await fetch(
      `${BASE_URL}/api/fronting/${frontingExampleId}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
    const data: FrontingExampleDocument = await response.json();
    return data;
};

// delete a specific fronting example from /api/fronting/[frontingExampleId]
export const deleteFrontingExampleById = async (frontingExampleId: string): Promise<boolean> => {
    const response = await fetch(
      `${BASE_URL}/api/fronting/${frontingExampleId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const errorData: { message?: string } = await response.json();
      throw new Error(errorData.message || "Something went wrong!");
    }
    return true;
};
