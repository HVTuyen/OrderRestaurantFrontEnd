import axios from 'axios';

import { CATEGORY_API } from '../../layout/constants';

export const deleteCategory = async (config, id) => {
    try {
        const response = await axios.delete(`${CATEGORY_API}${id}`, config);
        return response;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Nếu lỗi là 401, trả về lỗi để xử lý trong component
            return { error: 'Unauthorized' };
        }
        if (error.response && error.response.status === 403) {
            // Nếu lỗi là 401, trả về lỗi để xử lý trong component
            return { error: 'AccessDenied' };
        }
        // Nếu lỗi không phải là 401, trả về null
        return null;
    }
};