import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";

export default function Stolen_flag() {
  return (
    <FileDownloader
      answerText={"Flag{D3c0d3_P4ck3t_Cyber_Lab}"}
      fileName={"Stolen Flag.rar"}
      hint={"Search for HTTP POST and GET requests."}
      labInfo={
        "It all started when I executed a script my friend sent me. Shortly after, I noticed strange network activity, yet my files appeared untouched—but something didn't feel right. Can you trace where my stolen flag went and retrieve it?"
      }
      subject={"WireShark"}
      title={"Stolen Flag"}
    />
  );
}
