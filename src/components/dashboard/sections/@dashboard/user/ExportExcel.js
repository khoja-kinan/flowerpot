import { Button } from "@mui/material";
import * as FileSaver from "file-saver";
import { useTranslation } from "react-i18next";
import * as XLSX from "xlsx";

export default function ExportExcel({ csvData, fileName }) {
  const { t } = useTranslation();
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      sx={{
        margin: "0 1rem",
        ":hover": {
          background: "none",
        },
      }}
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      {t("description.exportEcxel")}
    </Button>
  );
}
