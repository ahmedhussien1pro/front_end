import { FileDownloader } from "../../../../Components/FileDwnLodrLab/FileDownloader";
export default function Top_Secret() {
  return (
    <FileDownloader
      answerText={"FLAG(CYBER_LAB_SECRET_LAYER)"}
      fileName={"Top Secret.rar"}
      hint={
        "Check the hex signature to verify if it's a PNG file. Use a hex editor to examine the first row for '89 50 4E 47'. Once you extract the text, analyze it to determine the type of encryption used!"
      }
      labInfo={
        "Ali found a mysterious USB drive labeled 'Top Secret'. he plugged it into laptop and discovered a single file named 'lost_image.jpg'. When he tried to open it, the image appeared corrupted and unreadable. Can you uncover the hidden message and identify what Ali has found?"
      }
      subject={"CryptoGraphy"}
      title={"Top Secret"}
    />
  );
}
