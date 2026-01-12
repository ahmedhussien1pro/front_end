import { SelectionLab } from "../../../../Components/SelectionLab/SelectionLab";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function Learn_capital_1() {
  return (
    <>
      <ThemeSwitcher />
      <SelectionLab
        api={
          "https://digitopia-project-backend.vercel.app/api/fileInclusionLab1"
        }
        description={
          "Select a file to view its content and the image of the capital. This simulates a file inclusion vulnerability in a controlled environment."
        }
        hint={
          "This exercise demonstrates how file inclusion vulnerabilities work. Try to access files by manipulating the input. Always validate and sanitize user input to prevent such attacks!"
        }
        options={["Berlin", "Cairo", "London", "Paris", "Pyongyang", "Tokyo"]}
        question={"What is The Capital?"}
        title={"File Inclusion Demonstration"}
        type={"city"}
        navigateTo={"/fileinclusion/fileinclusion_lab"}
      />
    </>
  );
}
