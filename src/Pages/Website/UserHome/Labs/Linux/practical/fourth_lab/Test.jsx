import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function Test() {
  const hint =
    "Looking for hidden files in Linux? 🕵️ Use ls -a to show all files, including hidden ones (they start with .)";

  return (
    <>
      <FileDownloader
        answerText={"flag{y0u_h4v3_d0n3_1t}"}
        hint={hint}
        fileName={"test_your_self.rar"}
        subject={"linux"}
        title={"Test Yourself"}
      />
    </>
  );
}
