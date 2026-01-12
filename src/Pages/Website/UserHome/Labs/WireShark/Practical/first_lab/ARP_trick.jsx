import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function ARP_trick() {
  return (
    <FileDownloader
      answerText={"FLAG{CYBER_LAB_404X}"}
      fileName={"The ARP Trick.rar"}
      hint={"Inspect the payload of each packet."}
      labInfo={
        "An attacker on the network is attempting to poison the ARP table of a device with a specific IP address. The network administrator has captured a PCAP file containing the suspicious activity. Can you analyze the capture and uncover the flag?"
      }
      subject={"WireShark"}
      title={"The ARP Trick"}
    />
  );
}
