import React, { Component } from "react";
import styles from "./MaterialContainer.module.scss";
import { Button, Col, ListGroupItem } from "reactstrap";
import { translate } from "common/methods/translations";
import { saveAs } from "file-saver";
import XLSX from "xlsx";

const columnDefs = [
  {
    headerName: "Qualité BA",
    field: "qualiteBA",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "Qualité Citéo",
    field: "qualiteCiteo",
    sortable: true,
    filter: true,
    resizable: true
  }
];

class MaterialContainer extends Component {
  griData = () => {
    const { item } = this.props;
    const gridData = [];

    if (item && item.items) {
      for (let i = 0; i < item.items.length; i++) {
        const newItem = {
          qualiteBA: item.items[i].qualiteBA,
          qualiteCiteo: item.items[i].qualiteCiteo
        };
        gridData.push(newItem);
      }
      return gridData;
    } else return null;
  };

  exportGridToExcel = () => {
    const gridData = this.griData();
    const headers = [];
    for (let i = 0; i < columnDefs.length; i++) {
      headers.push(columnDefs[i].headerName);
    }
    const data = [];
    data.push(headers);
    for (let i = 0; i < gridData.length; i++) {
      const row = [gridData[i].qualiteBA, gridData[i].qualiteCiteo];
      data.push(row);
    }
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    const reportName = "Nodus recyclage";
    XLSX.utils.book_append_sheet(wb, ws, reportName);
    const wbout = XLSX.write(wb, {
      bookType: "xlsx",
      bookSST: false,
      type: "array"
    });
    saveAs(
      new Blob([wbout], { type: "application/octet-stream" }),
      reportName + ".xlsx"
    );
  };

  render() {
    const { item } = this.props;
    return (
      <ListGroupItem className={styles.TabBox}>
        <div className={styles.buttonContainer}>
          <Button className={styles.btnBlue} onClick={this.exportGridToExcel}>
            EXCEL
          </Button>
        </div>
        <Col sm="6">
          <div className={styles.Header}>
            <h6>{item.sortingCenter}</h6>
          </div>
        </Col>
        <Col sm="12">
          <Col sm="6" className={styles.inlineBlock}>
            <div className={styles.ContentBox}>
              <div className={styles.TransparentRow}>
                <span>
                  {translate("myContracts.materials.typeBA").toUpperCase()}
                </span>
              </div>
              {item.items.map((elem, key) => {
                return (
                  <div
                    key={`elem-${key}`}
                    className={`${styles.GrayRow} ${
                      key % 2 === 0 ? styles.TileGrey : ""
                    }`}
                  >
                    <span>{elem.qualiteBA}</span>
                  </div>
                );
              })}
            </div>
          </Col>
          <Col sm="6" className={styles.inlineBlock}>
            <div className={styles.ContentBox}>
              <div className={styles.TransparentRow}>
                <span>
                  {translate("myContracts.materials.typeCiteo").toUpperCase()}
                </span>
              </div>
              {item.items.map((elem, key) => {
                return (
                  <div
                    key={`elem-${key}`}
                    className={`${styles.GrayRow} ${
                      key % 2 === 0 ? styles.TileGrey : ""
                    }`}
                  >
                    <span>{elem.qualiteCiteo}</span>
                  </div>
                );
              })}
            </div>
          </Col>
        </Col>
      </ListGroupItem>
    );
  }
}

export default MaterialContainer;
