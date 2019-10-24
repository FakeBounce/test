import React, { Component } from "react";
//import styles from './Doughnut.module.scss';
import styles from "../../Reports/Reports.module.scss";
import { observer } from "mobx-react";
import DoughnutChart from "../../charts/doughnut/Doughnut.jsx";
import HorizontalBarChart from "../../charts/horizontalBar/HorizontalBar.jsx";
import BarChart from "../../charts/bar/Bar.jsx";
import _ from "underscore";
import jsPDF from "jspdf";
import "jspdf-autotable";
import XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Button } from "reactstrap";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { observable } from "mobx";

const monthList = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre"
];

const chartColor = [
  "#2F3976",
  "#ff9f00",
  "#a6cf63",
  "#B3D0FF",
  "#F4C2AA",
  "#E3672A",
  "#E41818",
  "#F5F5F5",
  "#587B1F",
  "#676767",
  "#ACB0C8",
  "#BABFDF",
  "#BBD5FF",
  "#E1ECFF",
  "#FFD999",
  "#F4A3A3",
  "#D3E7B2",
  "BCCAA5",
  "#91C33F"
];

const columnDefs = [
  {
    headerName: "Date de la prestation",
    field: "datePresta",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "Mois prestation",
    field: "moisPresta",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "N° ODC",
    field: "numODC",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "Centre de tri",
    field: "centreTri",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "Matière",
    field: "matiere",
    sortable: true,
    filter: true,
    resizable: true
  },
  {
    headerName: "Tonnage",
    field: "tonnage",
    sortable: true,
    filter: true,
    resizable: true
  }
];

const chartsTitles = [
  "Répartition de la matière",
  "Évolution des matières",
  "Tonnage trimestriel"
];

@observer
class Report1 extends Component {
  @observable gridData = [];

  constructor(props) {
    super(props);
    this.handleSwitch = this.handleSwitch.bind(this);
    this.exportGridToExcel = this.exportGridToExcel.bind(this);
    this.exportGridToPdf = this.exportGridToPdf.bind(this);
    this.printChart = this.printChart.bind(this);
    this.state = {
      showChart: true
    };
  }

  getRandomColor() {
    return Math.floor(Math.random() * 16777216).toString(16);
  }

  handleSwitch() {
    this.setState({ showChart: !this.state.showChart });
  }

  doughnutChartData() {
    const { dataReport } = this.props;
    if (dataReport !== undefined) {
      const dt = _.chain(dataReport)
        .groupBy("qualite")
        .map(function(value, key) {
          var reduceVal = _.reduce(
            value,
            function(acc, val) {
              if (isNaN(val.tonnage)) return acc;
              return acc + parseFloat(val.tonnage);
            },
            0
          );
          return {
            libelle: key,
            total: reduceVal.toFixed(2)
          };
        })
        .value();

      const labels = _.map(dt, function(value, key) {
        if (dt.length > 0 && value !== undefined && value != null)
          return value.libelle.trim();
      });

      const dhData = _.map(dt, function(value, key) {
        if (dt.length > 0 && value !== undefined && value != null)
          return value.total;
      });

      if (dhData.length > chartColor.length) {
        const dif = dhData.length - chartColor.length;
        for (let i = 0; i < dif; i++) {
          chartColor.push(this.getRandomColor());
        }
      }

      const formatedData = {
        labels: labels,
        datasets: [
          {
            data: dhData,
            backgroundColor: chartColor,
            hoverBackgroundColor: chartColor
          }
        ]
      };
      return formatedData;
    } else {
      const nada = {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: chartColor,
            hoverBackgroundColor: chartColor
          }
        ]
      };
      return nada;
    }
  }

  horizontalBarChartData() {
    const { dataReport } = this.props;
    const { dataReport2 } = this.props;

    if (dataReport !== undefined) {
      const getData = function(dataSource) {
        return _.chain(dataSource)
          .groupBy("qualite")
          .map(function(value, key) {
            var reduceVal = _.reduce(
              value,
              function(acc, val) {
                if (isNaN(val.tonnage)) return acc;
                if (val.tonnage !== undefined)
                  return acc + parseFloat(val.tonnage);
                else return acc;
              },
              0
            );
            return {
              libelle: key,
              total: reduceVal.toFixed(2)
            };
          })
          .value();
      };
      let dt1 = getData(dataReport);
      let dt2 = getData(dataReport2);

      dt1 = _.reject(dt1, function(val) {
        return val.total === 0;
      });
      dt1.sort(function(a, b) {
        return b.total - a.total;
      });
      dt1 = dt1.slice(0, 3);

      let data2 = [];
      for (var i = 0; i < dt1.length; i++) {
        var isDone = false;
        for (var j = 0; j < dt2.length; j++) {
          if (dt1[i].libelle === dt2[j].libelle) {
            isDone = true;
            data2.push(dt2[j].total);
          }
          if (!isDone && i === dt2.length - 1) {
            data2.push(0);
          }
        }
      }

      let data1 = _.map(dt1, function(value, key) {
        return value.total;
      });

      const { year } = this.props;
      const series = [year, year - 1];
      const labels = _.map(dt1, function(value, key) {
        return value.libelle.trim();
      });

      const formatedData = {
        labels: labels,
        datasets: [
          {
            label: series[0],
            backgroundColor: chartColor[0],
            borderColor: chartColor[0],
            borderWidth: 1,
            hoverBackgroundColor: chartColor[0],
            hoverBorderColor: chartColor[0],
            data: data1
          },
          {
            label: series[1],
            backgroundColor: chartColor[1],
            borderColor: chartColor[1],
            borderWidth: 1,
            hoverBackgroundColor: chartColor[1],
            hoverBorderColor: chartColor[1],
            data: data2
          }
        ]
      };
      return formatedData;
    } else {
      const noData = {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: chartColor[0],
            borderColor: chartColor[0],
            borderWidth: 1,
            hoverBackgroundColor: chartColor[0],
            hoverBorderColor: chartColor[0],
            data: []
          }
        ]
      };
      return noData;
    }
  }

  barChartData() {
    const { dataReport3 } = this.props;
    if (dataReport3 !== undefined) {
      const dt = _.chain(dataReport3)
        .groupBy("qualite")
        .map(function(value, key) {
          var dataByMonth = [];
          for (var index = 1; index <= 12; index++) {
            var dataMois = _.where(value, {
              mois: index.toString()
            });
            var reduceVal = _.reduce(
              dataMois,
              function(acc, val) {
                if (isNaN(val.tonnage)) return acc;
                return acc + parseFloat(val.tonnage);
              },
              0
            );

            var item = {
              dt: reduceVal.toFixed(2),
              mois: index
            };
            dataByMonth.push(item);
          }
          return {
            libelle: key,
            data: dataByMonth
          };
        })
        .value();

      const dataTri = _.map(dt, function(value, key) {
        const t = [];
        let count = 0;
        let total = 0;
        for (let i = 0; i <= 11; i++) {
          total = total + parseFloat(value.data[i].dt);
          count++;
          if (count > 2) {
            count = 0;
            t.push(total.toFixed(2));
            total = 0;
          }
        }
        return {
          libelle: value.libelle,
          data: t
        };
      });

      const dataSets = [];
      for (let i = 0; i < dataTri.length; i++) {
        const item = {
          label: dataTri[i].libelle.trim(),
          backgroundColor: chartColor[i],
          borderColor: chartColor[i],
          borderWidth: 1,
          hoverBackgroundColor: chartColor[i],
          hoverBorderColor: chartColor[i],
          data: dataTri[i].data
        };
        dataSets.push(item);
      }

      const barData = {
        labels: ["Trimestre 1", "Trimestre 2", "Trimestre 3", "Trimestre 4"],
        datasets: dataSets
      };
      return barData;
    } else {
      const noData = {
        labels: [],
        datasets: [
          {
            label: [],
            backgroundColor: chartColor[0],
            borderColor: chartColor[0],
            borderWidth: 1,
            hoverBackgroundColor: chartColor[0],
            hoverBorderColor: chartColor[0],
            data: []
          }
        ]
      };
      return noData;
    }
  }

  griData() {
    const { dataReport } = this.props;
    const gridData = [];

    if (dataReport !== undefined) {
      for (let i = 0; i < dataReport.length; i++) {
        const date = dataReport[i].date.split("T")[0].split("-");
        const item = {
          datePresta: date[2] + "-" + date[1] + "-" + date[0],
          moisPresta: monthList[parseInt(dataReport[i].mois, 10) - 1],
          numODC: dataReport[i].idOdc,
          centreTri: dataReport[i].producteur,
          matiere: dataReport[i].qualite,
          tonnage: dataReport[i].tonnage
        };
        gridData.push(item);
      }
      return gridData;
    } else return null;
  }

  exportGridToExcel() {
    const gridData = this.griData();
    const headers = [];
    for (let i = 0; i < columnDefs.length; i++) {
      headers.push(columnDefs[i].headerName);
    }
    const data = [];
    data.push(headers);
    for (let i = 0; i < gridData.length; i++) {
      const row = [
        gridData[i].datePresta,
        gridData[i].moisPresta,
        gridData[i].numODC,
        gridData[i].centreTri,
        gridData[i].matiere,
        gridData[i].tonnage
      ];
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
  }

  exportGridToPdf() {
    const gridData = this.griData();
    const headers = [];
    for (let i = 0; i < columnDefs.length; i++) {
      headers.push(columnDefs[i].headerName);
    }
    const data = [];
    for (let i = 0; i < gridData.length; i++) {
      const row = [
        gridData[i].datePresta,
        gridData[i].moisPresta,
        gridData[i].numODC,
        gridData[i].centreTri,
        gridData[i].matiere,
        gridData[i].tonnage
      ];
      data.push(row);
    }

    let doc = new jsPDF("l", "pt");
    let pageW = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    const reportName = "Nodus recyclage";
    doc.text(
      reportName,
      pageW / 2 - (doc.getStringUnitWidth(reportName) * 16) / 2,
      22
    );
    doc.autoTable({
      head: [headers],
      body: data
    });
    doc.save("table.pdf");
  }

  printChart() {
    const doughnutData = this.doughnutChartData();
    const labels = doughnutData.labels;
    const data = doughnutData.datasets[0].data;

    var reportPageWidth = document.getElementById("report").clientWidth;

    // create a new canvas object that we will populate with all other canvas objects
    var canvas = document.createElement("canvas");
    canvas.id = "canvaspdf";
    canvas.width = reportPageWidth;
    canvas.height = reportPageWidth;

    // keep track canvas position
    var pdfctx = canvas.getContext("2d");
    var pdfctxX = 30;
    var pdfctxY = 150;
    var bufferX = 10;
    var bufferY = 50;

    pdfctx.rect(0, 0, reportPageWidth, reportPageWidth);
    pdfctx.fillStyle = "white";
    pdfctx.fill();

    pdfctx.fillStyle = "black";
    var reportTitle = "RAPPORT NODUS RECYCLAGE";
    pdfctx.font = "26px Arial";
    pdfctx.fillText(
      reportTitle,
      (reportPageWidth + 50) / 2 - pdfctx.measureText(reportTitle).width / 2,
      30
    );

    var canvasAll = document.getElementsByTagName("canvas");
    var canvasList = Array.prototype.slice.call(canvasAll);

    for (var i = 0; i < canvasList.length; i++) {
      var canvasHeight = canvasList[i].height;
      var canvasWidth = canvasList[i].width;

      pdfctx.drawImage(
        canvasList[i],
        pdfctxX,
        pdfctxY,
        canvasWidth,
        canvasHeight
      );
      pdfctx.font = "16px Arial";
      pdfctx.fillText(
        chartsTitles[i],
        pdfctxX +
          canvasWidth / 2 -
          pdfctx.measureText(chartsTitles[i]).width / 2,
        pdfctxY - 10
      );

      if (i === 0) {
        pdfctx.font = "12px Arial";
        var tX = pdfctxX + canvasWidth * 1.1;
        var tY = pdfctxY + 20;

        for (var j = 0; j < labels.length; j++) {
          pdfctx.fillText(labels[j], tX, tY);
          pdfctx.fillText(data[j], tX + canvasWidth / 1.5, tY);
          tY += 20;
        }
      }

      pdfctxX += canvasWidth + bufferX;

      if (i === 0) {
        pdfctxX = 30;
        pdfctxY += canvasHeight + bufferY;
      }
    }

    var pdf = new jsPDF("l", "pt", "A4");
    var docW = pdf.internal.pageSize.getWidth();
    pdf.addImage(canvas, "PNG", 0, 0, docW, docW, undefined, "FAST");
    pdf.save("report.pdf");
  }

  render() {
    this.barChartData();
    const dtDh = this.doughnutChartData();
    const dtHb = this.horizontalBarChartData();
    const dtBar = this.barChartData();

    const optDoughnut = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        }
      }
    };

    const opt = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        }
      },
      scales: {
        yAxes: [
          {
            ticks: {
              min: 0,
              beginAtZero: true,
              callback: function(value, index, values) {
                if (Math.floor(value) === value) {
                  return value;
                }
              }
            }
          }
        ]
      }
    };

    const opt2 = {
      legend: {
        display: true,
        labels: {
          usePointStyle: true
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              min: 0,
              beginAtZero: true,
              callback: function(value, index, values) {
                if (Math.floor(value) === value) {
                  return value;
                }
              }
            }
          }
        ]
      }
    };

    const rowData = this.griData();

    function onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    }

    function Charts() {
      return (
        <div className={styles.reportContainer}>
          <div className={styles.chartRow}>
            <DoughnutChart
              data={dtDh}
              title={chartsTitles[0]}
              option={optDoughnut}
            />
          </div>
          <div className={styles.chartRow}>
            {dtHb &&
              dtHb["datasets"] &&
              dtHb["datasets"][0].data.length > 0 &&
              dtHb["datasets"][1].data.length > 0 && (
                <HorizontalBarChart
                  data={dtHb}
                  title={chartsTitles[1]}
                  option={opt2}
                />
              )}
            {dtBar && dtBar["datasets"] && dtBar["datasets"].length > 0 && (
              <BarChart data={dtBar} title={chartsTitles[2]} option={opt} />
            )}
          </div>
        </div>
      );
    }

    function Grid() {
      return (
        <div className={styles.reportContainer}>
          <div
            style={{ height: "100%", width: "100%" }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              onGridReady={onGridReady}
            />
          </div>
        </div>
      );
    }

    const { showChart } = this.state;

    // Export Excel & Export PDF
    return (
      <div className={styles.reportContainer} id="report">
        <div className={styles.reportHeader}>
          <span>Graphiques</span>
          <label className={styles.switch}>
            <input type="checkbox" onClick={this.handleSwitch} />
            <span className={styles.slider + " " + styles.round} />
          </label>
          <span>Tableau</span>
          {showChart ? (
            <Button className={styles.btnBlue} onClick={this.printChart}>
              PDF
            </Button>
          ) : (
            <div className={styles.buttonContainer}>
              <Button
                className={styles.btnBlue}
                onClick={this.exportGridToExcel}
              >
                EXCEL
              </Button>
            </div>
          )}
        </div>
        <div className={styles.reportBody}>
          {showChart ? <Charts /> : <Grid />}
        </div>
      </div>
    );
  }
}
export default Report1;
