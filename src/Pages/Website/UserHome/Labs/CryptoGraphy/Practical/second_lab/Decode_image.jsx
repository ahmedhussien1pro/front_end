import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function Decode_image() {
  return (
    <FileDownloader
      answerText={"Flag{cyber_lab_steg_hunter}"}
      fileName={"Decode the Image.rar"}
      hint={"Try using steghide to extract the hidden message."}
      labInfo={
        "Ebrahim stumbled upon an old digital image on his computer titled 'secure_mountain.jpg.' The image, however, was far from ordinary—it was said to have a hidden secret a file buried deep within its pixels. Ebrahim set off on a mission to decrypt the image and retrieve the secret."
      }
      subject={"CryptoGraphy"}
      title={"Decode the Image"}
    />
  );
}
