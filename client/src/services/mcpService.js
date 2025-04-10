import { api } from './api';

export const registerMCP = (data) => api.post('/mcp/register', data);
export const loginMCP = (data) => api.post('/mcp/login', data);
export const getDashboard = (mcpId) => api.get(`/mcp/dashboard/${mcpId}`);
export const addPartner = (mcpId, data) => api.post(`/mcp/add-partner/${mcpId}`, data);
export const transferFunds = (mcpId, data) => api.post(`/mcp/transfer-funds/${mcpId}`, data);

//NEW ORDER FUNCTIONS:
export const createOrder = (mcpId, data) => api.post(`/orders/create/${mcpId}`, data)
export const assignOrder = (orderId, data) => api.post(`/orders/assign/${orderId}`, data)
export const getAllOrders = (mcpId) => api.get(`/orders/mcp/${mcpId}`)