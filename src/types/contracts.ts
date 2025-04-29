
export interface Contract {
    contractId: number;
    contractNumber: string;
    contractName: string;
    customerId: number;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    description?: string;
    createdAt: string;
    updatedAt: string;
    yukoFlag: 0 | 1;
    // yukoFlag: number;
    contractPaymentList: ContractPayment[];
}

export interface ContractPayment {
    paymentId?: number;
    amount?: number;
    paymentDate?: string;

}

export interface ContractFormData {
    contractPaymentList: never[];
    contractNumber: string;
    contractName: string;
    customerId: number;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    description?: string;
    yukoFlag: 0 | 1;
    // yukoFlag: number;
}

export interface ContractApiPayload {
    contractNumber: string;
    contractName: string;
    customerId: number;
    startDate: string;
    endDate: string;
    totalAmount: number;
    status: 'ACTIVE' | 'PENDING' | 'EXPIRED';
    description?: string;
    yukoFlag: 0 | 1;
    // yukoFlag: number;
    contractPaymentList: ContractPayment[];
}