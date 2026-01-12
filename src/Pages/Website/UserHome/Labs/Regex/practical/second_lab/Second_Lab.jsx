import CompleteQuestion from "../../../../Components/CompleteQuestion/CompleteQuestion";
import Data from "./second_Data.json";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function Second_Lab() {
  return (
    <>
      <ThemeSwitcher />
      <div>
        <GoBackBtn />
        <CompleteQuestion questionsData={Data} />
      </div>
    </>
  );
}
