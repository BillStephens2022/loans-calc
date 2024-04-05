export interface UpdatedFrontingExample {
    borrower: string;
    yourBankName: string;
    facility: string;
    globalCommitment: number;
    globalFundedLoans: number;
    globalLettersOfCredit: number;
    yourBankCommitment: number;
    isLCIssuer: boolean;
    isSwinglineLender: boolean;
    isNonAccrual: boolean;
    swinglineSublimit: number;
    swinglinesFundedByYourBank: number;
    lcSublimit: number;
    lcsIssuedByYourBank: number;
    globalAvailability: number;
    yourBankPercentShare: number;
    unfundedSwinglineFrontingExposure: number;
    fundedSwinglineFrontingExposure: number;
    unissuedLCFrontingExposure: number;
    issuedLCFrontingExposure: number;
  }