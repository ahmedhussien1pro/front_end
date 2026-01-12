import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function Patient() {
  const hint =
    "Need to find specific text in files? Use grep in Linux! 🔍 Example: grep 'keyword' file.txt to search for 'keyword' inside file.txt.";
  return (
    <>
      <FileDownloader
        answerText={"FLAG{cyber_lab :)}"}
        hint={hint}
        fileName={"be_patient_or_skillful.rar"}
        subject={"Linux"}
        title={"Be Patient or Skillful"}
      />
    </>
  );
}
