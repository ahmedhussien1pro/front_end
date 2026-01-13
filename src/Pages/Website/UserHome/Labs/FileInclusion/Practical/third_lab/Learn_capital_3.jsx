import { SelectionLab } from '../../../../../components/SelectionLab/SelectionLab';
import ThemeSwitcher from '../../../../../components/ThemeSwitcher/ThemeSwitcher';
export default function Learn_capital_3() {
  return (
    <>
      <ThemeSwitcher />
      <SelectionLab
        api={
          'https://digitopia-project-backend.vercel.app/api/fileInclusionLab3'
        }
        description={
          'Select a file to view its content and the image Car Brand Logos. This simulates a file inclusion vulnerability in a controlled environment.'
        }
        hint={
          'This exercise demonstrates how file inclusion vulnerabilities work. Try to access files by manipulating the input. Always validate and sanitize user input to prevent such attacks!'
        }
        options={['BMW', 'GTR', 'Honda', 'Kia', 'Mazda', 'Nissan']}
        question={'What is The Logo'}
        type={'car'}
        navigateTo={'/fileinclusion/fileinclusion_lab'}
      />
    </>
  );
}
