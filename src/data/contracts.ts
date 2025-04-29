// data/contracts.ts
import { ContractFormData } from '../types/contracts';

export const defaultContractFormData: ContractFormData = {
  contractNumber: '',
  contractName: '',
  customerId: 0,
  startDate: '',
  endDate: '',
  totalAmount: 0,
  status: 'ACTIVE',
  description: '',
  yukoFlag: 0,
  // yukoFlag: 0,
  contractPaymentList: []
};