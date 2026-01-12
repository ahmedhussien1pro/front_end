import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";

export default function TCP_intrusion() {
  return (
    <FileDownloader
      answerText={"FLAG{TRACE_THE_PATHWAY_CYBER_LAB}"}
      fileName={"TCP Intrusion.rar"}
      hint={
        "Analyze the TCP protocol, identify the attacker's source IP, and check the packet payload."
      }
      labInfo={
        "Someone appears to have attempted a brute-force attack on multiple IPs. Can you investigate and reveal what they were hiding"
      }
      subject={"WireShark"}
      title={"TCP Intrusion"}
    />
  );
}
