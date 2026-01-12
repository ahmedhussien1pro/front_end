import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function Welcome() {
  const hint =
    "Navigate like a pro in Linux! 🐧 Use ls to list files and cd foldername to move between directories. Example: cd Documents && ls to enter 'Documents' and see its contents.";

  return (
    <>
      <FileDownloader
        answerText={"flag{Welcome_to_cyber_lap}"}
        hint={hint}
        fileName={"welcome.rar"}
        subject={"Linux"}
        title={"Welcome"}
      />
    </>
  );
}
