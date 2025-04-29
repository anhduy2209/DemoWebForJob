import { ContractApiPayload } from '../types/contracts';
import axios from '../utils/axiosInstance';

export const createContractApi = async (contractData: ContractApiPayload) => {
    // Chuyển đổi startDate và endDate sang định dạng ISO 8601
    const formattedData = {
        ...contractData,
        startDate: new Date(contractData.startDate).toISOString(),
        endDate: new Date(contractData.endDate).toISOString(),
    };

    const response = await axios.post('/Contract', formattedData);
    return response.data;
};
