import axios from 'axios';

import { TABLE_API } from '../../layout/constants';

export const editTable = async (config, id, data) => {
    try {
        const response = await axios.put(`${TABLE_API}${id}`, data, config);
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
        return null;
    }
};