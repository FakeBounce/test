import ApiMiddleware from "services/ApiMiddleware";
import { ANCHOR } from "../common/consts/api";

class MaterialService {
  /**
   * TODO:
   * Expected each material data to response with sortingCenterNumber, commune,
   * plasticDuration, paperDuration, cardboardDuration, metalDuration.
   * Params: no params
   *
   * @param params object
   * @returns Array
   */
  async getMaterialData(contractId) {
    const response = await ApiMiddleware.getData(
      `${ANCHOR.CONTRACT}/${contractId}/qualites`
    );
    const materialData = [];
    if (
      response.body &&
      Array.isArray(response.body) &&
      response.body.length > 0
    )
      response.body.forEach(item => {
        materialData.push({qualiteBA: item.libelle, qualiteCiteo: item.qualite});
      });
    return materialData;
  }
}

export default new MaterialService();
