import axios from 'axios';

import { QLORDER_API, PAYMENT_ORDER_SUB } from '../../layout/constants';

export const paymentOrder = async (config, orderId, employeeId) => {
    try {
        const response = await axios.put(`${QLORDER_API}${PAYMENT_ORDER_SUB}/${orderId}`, null, config);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            // Nếu lỗi là 401, trả về lỗi để xử lý trong component
            return { error: 'Unauthorized' };
        }
        if (error.response && error.response.status === 401) {
            // Nếu lỗi là 401, trả về lỗi để xử lý trong component
            return { error: 'AccessDenied' };
        }
        // Nếu lỗi không phải là 401, trả về null
        return null;
    }
};