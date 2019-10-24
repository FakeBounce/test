import ApiMiddleware from 'services/ApiMiddleware';
import { ANCHOR } from '../common/consts/api';

class UserProfileService {
  async getProfiles() {
    const response = await ApiMiddleware.getData(ANCHOR.ALL_PROFILES);
    const filteredResponses = response.body.filter(x => x.estWebAdminProfil === false);
    const profiles = [];
    // response.body.forEach(item => {
    //   const profile = {};
    //   profile.value = item.profilId;
    //   profile.name = item.libelle;
    //   profiles.push(profile);
    // });
    filteredResponses.forEach(item => {
      const profile = {};
      profile.value = item.profilId;
      profile.name = item.libelle;
      profiles.push(profile);
    });
    return profiles;
  }
}

export default new UserProfileService();
