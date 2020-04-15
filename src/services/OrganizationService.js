import { apiCall } from './api.helper';

export default class OrganizationService {
  static getOrganizationInfo(organizationId) {
    return apiCall('get', 'organization', { organizationId });
  }

  static createOrUpdateOrganization(organizationData) {
    return apiCall('post', 'organization', organizationData);
  }

  static getBeneficiaries(organizationId) {
    return apiCall('get', 'organization/beneficiary', { organizationId });
  }

  static createOrUpdateBeneficiary(beneficiaryData) {
    return apiCall('post', 'organization/beneficiary', beneficiaryData);
  }

  static getSellers(organizationId, raffleId) {
    return apiCall('get', 'organization/sellers', { organizationId, raffleId });
  }

  static createOrUpdateSeller(sellerData) {
    return apiCall('post', 'organization/sellers', sellerData);
  }

  static getAdmins(organizationId) {
    return apiCall('get', 'organization/admins', { organizationId });
  }

  static createOrUpdateAdmin(adminData) {
    return apiCall('post', 'organization/admins', adminData);
  }

  static deleteAdmin(userId) {
    return apiCall('delete', 'organizations/admins', { userId });
  }
}
