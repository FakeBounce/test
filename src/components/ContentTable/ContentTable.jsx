import React, { Component } from "react";
import styles from "./ContentTable.module.scss";
import { Table } from "reactstrap";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import PurchaseSlipService from "services/PurchaseSlipService";
import { ClientContext } from "../../common/consts/ClientContext";
import { translate } from "common/methods/translations";
import ReactGA from "react-ga";

class ContentTable extends Component {
  constructor() {
    super();
    this.renderRows = this.renderRows.bind(this);
  }

  async downloadFile(singleRow, collectiviteInfo) {
    const response = await PurchaseSlipService.getPurchaseSlipsDocument(
      singleRow
    );
    const fileName = `${singleRow.reference}-${moment(singleRow.date).format(
      "D/M/YYYY"
    )}.pdf`;
    if (navigator.appVersion.toString().indexOf(".NET") > 0) {
      console.log("index of net", navigator.appVersion.toString());
      window.navigator.msSaveBlob(response, fileName);
    } else {
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(response);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
    }

    ReactGA.event({
      category: `${collectiviteInfo}`,
      action: "Downloaded file"
    });
  }

  renderRows(rows) {
    if (rows && rows.length > 0) {
      return (
        <Table className={styles.PurchaseSlipsTable}>
          <thead>
            <tr>
              <th>{translate("myFiles.reference")}</th>
              <th>{translate("globals.date")}</th>
              <th className={styles.amount}>{translate("myFiles.amount")}</th>
              <th>PDF</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((singleRow, index) => {
              const { date, reference, amount } = singleRow;
              return (
                <tr key={index}>
                  <td>{reference}</td>
                  <td>{moment(date).format("D/MM/YYYY")}</td>
                  <td className={styles.amount}>
                    <CurrencyFormat
                      value={amount}
                      displayType={"text"}
                      suffix={" €"}
                      decimalScale={2}
                      thousandSeparator={" "}
                    />
                  </td>
                  {/* <td>{`${amount} €`}</td> */}
                  <td>
                    <ClientContext.Consumer>
                      {({ collectiviteInfo }) => (
                        <div
                          className={styles.PDFLink}
                          onClick={this.downloadFile.bind(
                            this,
                            singleRow,
                            collectiviteInfo
                          )}
                        />
                      )}
                    </ClientContext.Consumer>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      );
    } else {
      return null;
    }
  }

  render() {
    const { dataToShow } = this.props;
    return this.renderRows(dataToShow);
  }
}

export default ContentTable;
