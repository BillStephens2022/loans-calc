const quizData = {
  questions: [
    {
      question:
        "What type of loan facility provides borrowers with the flexibility to withdraw, repay, and redraw funds up to a specified credit limit over a predetermined period?",
      answers: {
        a: "Revolver",
        b: "Term Loan",
        c: "Letter of Credit",
        d: "Delayed Draw Term Loan",
      },
      correct_answer: "a",
      explanation:
        "A revolver, short for revolving credit facility, allows borrowers to access funds as needed, making it suitable for managing short-term working capital requirements or financing fluctuating expenses. It provides flexibility by allowing borrowers to withdraw, repay, and redraw funds up to a specified credit limit over a predetermined period.",
    },
    {
      question:
        "What type of financial instrument is issued by a bank on behalf of a buyer to guarantee payment to a seller for goods or services provided?",
      answers: {
        a: "Revolver",
        b: "Term Loan",
        c: "Letter of Credit",
        d: "Delayed Draw Term Loan",
      },
      correct_answer: "c",
      explanation:
        "A letter of credit (LC) is a financial instrument issued by a bank on behalf of a buyer (applicant) to guarantee payment to a seller (beneficiary) for goods or services provided. In a corporate context, letters of credit serve as a form of trade finance, facilitating international transactions by mitigating the risk of non-payment. By providing assurance of payment, letters of credit help build trust between parties involved in cross-border trade.",
    },
    {
      question:
        "How are loans classified under the accounting treatment known as 'Held For Investment' (HFI) recorded on the balance sheet?",
      answers: {
        a: "At fair value",
        b: "At lower of cost or fair value",
        c: "At amortized cost",
        d: "At original principal amount",
      },
      correct_answer: "c",
      explanation:
        "Loans classified as Held For Investment (HFI) are recorded on the balance sheet at amortized cost. This means they are initially recorded at their original principal amount and subsequently adjusted for any upfront fee/premium/discount amortization, as well as for any impairment losses recognized.",
    },
    {
      question:
        "Which accounting treatment reflects the intention to sell loans in the near term or foreseeable future and records them on the balance sheet at the lower of cost or fair value?",
      answers: {
        a: "Held For Investment (HFI)",
        b: "Held For Sale (HFS)",
        c: "Fair Value Option (FVO)",
        d: "Fair Value Through P&L (FVTPL)",
      },
      correct_answer: "b",
      explanation:
        "Loans classified as Held For Sale (HFS) are recorded on the balance sheet at the lower of cost or fair value. This accounting treatment reflects the intention to sell the loans in the near term or foreseeable future, with any changes in fair value recorded in earnings.",
    },
    {
      question:
        "What type of fee is imposed on the unused portion of a credit facility?",
      answers: {
        a: "Letter of Credit participation fees",
        b: "Admin / Agency Fees",
        c: "Upfront Fees",
        d: "Unutilized Fees",
      },
      correct_answer: "d",
      explanation:
        "Unutilized fees, sometimes referred to as undrawn fees, are charges imposed on the unused portion of a revolving credit facility. Lenders may assess these fees to encourage borrowers to utilize the entire credit line or to compensate for the availability of funds that could have been deployed elsewhere.",
    },
    {
      question:
        "What does the term 'All-in Rate' refer to with regards to the interest rate?",
      answers: {
        a: "The interest rate charged to the borrower plus all applicable fees on the facility (upfront fees, facility fees etc)",
        b: "The fed funds rate plus all applicable fees on the facility (upfront fees, facility fees etc)",
        c: "The base rate charged on the loan",
        d: "The final interest rate earned on a loan, including both the base rate and the spread",
      },
      correct_answer: "d",
      explanation:
        "The All-in Rate, also known as the final interest rate, is the sum of the 'Base Rate' and a 'Spread.' It represents the final interest rate earned on a loan and includes both the base rate and the spread. This rate is used to calculate the total cost of borrowing for the borrower.",
    },
    {
      question:
        "What is the primary purpose of a commitment letter in corporate lending?",
      answers: {
        a: "To formalize the terms and conditions of the lending facility and confirm the lender's commitment to provide financing",
        b: "A non-legally binding summary of the key terms and conditions of a proposed lending facility",
        c: "A legally binding document where the lender has committed the funds and the borrower can start drawing funds immediately",
        dc: "An insurance policy that ensures the repayment of funds",
      },
      correct_answer: "a",
      explanation:
        "The commitment letter is a formal document issued by the lender that confirms its commitment to provide financing to the borrower based on the terms outlined in the term sheet. Its primary purpose is to formalize the terms and conditions of the lending facility and confirm the lender's commitment to provide financing.",
    },
    {
      question:
        "What is swingline fronting risk in syndicated revolving credit facilities?",
      answers: {
        a: "The risk associated with providing immediate access to funds to cover urgent or unexpected expenses",
        b: "The risk assumed by a swingline lender when other syndicate banks fail to fund their pro-rata portions",
        c: "The risk of non-repayment assumed by the issuing bank when letters of credit sublimit is utilized",
        d: "The risk of operational challenges faced by banks acting as issuers of letters of credit",
      },
      correct_answer: "b",
      explanation:
        "Swingline fronting risk arises when a bank acts as a swingline lender in a syndicated revolving credit facility. It refers to the risk assumed by the swingline lender when other syndicate banks fail to fund their pro-rata portions, exposing the swingline lender to potential credit risk and liquidity strain.",
    },
    {
      question: "What is the primary difference between 'assignment' and 'participation' trades?",
      answers: {
        a: "In assignments, the assignee becomes the lender of record, while in participation trades, the original lender retains its status as the lender of record.",
        b: "Assignments transfer the rights and obligations under a credit agreement to the seller, while participation trades transfer the rights and obligations under a credit agreement to the buyer",
        c: "Assignments require borrower consent, while participation trades do not",
        d: "Participation trades involve transferring loan payments, while assignments do not.",
      },
      correct_answer: "a",
    },
    {
      question:
        "What is a key difference between a syndicated loan and a bilateral loan facility?",
      answers: {
        a: "Syndicated loans offer more flexible terms, while bilateral loans have fixed terms",
        b: "Syndicated loans are primarily sought by small businesses, while bilateral loans are preferred by large corporations",
        c: "Syndicated loans have higher interest rates, while bilateral loans have lower interest rates",
        d: "Syndicated loans involve multiple lenders, while bilateral loans involve a single lender",
      },
      correct_answer: "d",
      explanation: "The primary difference between syndicated loans and bilateral loans lies in the number of lenders involved in the financing arrangement. Syndicated loans involve a consortium of lenders pooling their resources to provide a single loan facility to a borrower, coordinated by one lead bank or financial institution. In contrast, bilateral loans involve a straightforward lending arrangement between a single lender and a borrower, without the involvement of multiple lenders. This distinction in the number of lenders impacts various aspects of the loan structure, including the level of complexity, flexibility in terms, and access to capital."
    },
  ],
};

export default quizData;
