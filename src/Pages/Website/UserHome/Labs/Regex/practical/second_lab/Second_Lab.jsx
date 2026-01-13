import CompleteQuestion from '../../../../../components/CompleteQuestion/CompleteQuestion';
import Data from './second_Data.json';
import GoBackBtn from '../../../../../components/GoBack_Btn/GoBack_Btn';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
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
