import { api } from './api'

export const loginPartner = (data) => api.post('/partner/login', data)
export const getPartnerDashboard = (partnerId) => api.get(`/partner/dashboard/${partnerId}`)
export const updateOrderStatus = (orderId, status) =>
  api.post(`/partner/update-status/${orderId}`, { status })
