import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";
import CollectiviteModel from "models/CollectiviteModel";

class CollectiviteService {
  async getCurrentCollectivite() {
    const response = await ApiMiddleware.getData(ANCHOR.COLLECTIVITE);
    if (response) {
      const data = response.body;
      return new CollectiviteModel(
        data.id,
        data.code,
        data.libelle,
        data.rootFolderId,
        data.contratsRootFolderId,
        data.dureeContrat,
        data.logo,
        data.dateModification
      );
    }
    return null;
  }

  async getStatsPaprec() {
    const response = await ApiMiddleware.getData(ANCHOR.COLLECTIVITE_STATS);
    if (response && response.body) {
      return response.body.tonnage;
    }
    return null;
  }

  async updateCurrentCollectivite(infoCollectivite) {
    const {
      id,
      ecoOrganismeCode: code,
      collectivityName: libelle,
      dateModification
    } = infoCollectivite;
    const updatedCollectivite = {
      id: id,
      code: code,
      libelle: libelle,
      dateModification: dateModification
    };
    return await ApiMiddleware.put(ANCHOR.COLLECTIVITE, updatedCollectivite);
  }
}

export default new CollectiviteService();
