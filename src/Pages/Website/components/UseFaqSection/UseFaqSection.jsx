import { useEffect, useRef } from "react";
import $ from "jquery";
// import { useNavigate } from "react-router-dom";

const UseFaqSection = () => {
  const faqSectionRef = useRef(null);
  // const navigate = useNavigate();

  const handleGoToLab = (path) => {
  window.open(path, '_blank', 'noopener,noreferrer');
};


  useEffect(() => {
    const $faqSection = $(faqSectionRef.current);
    const $dt = $faqSection.find("dt");
    const $dd = $faqSection.find("dd");

    $dd.hide();
    $dt.first().addClass("active");
    $dd.first().show();

    $dt.on("click", function () {
      const $this = $(this);
      const $nextDd = $this.next("dd");

      if ($this.hasClass("active")) {
        $this.removeClass("active");
        $nextDd.slideUp(500);
      } else {
        $dt.removeClass("active");
        $dd.slideUp(500);
        $this.addClass("active");
        $nextDd.slideDown(500);
      }
    });

    return () => {
      $dt.off("click");
    };
  }, []);

  return { faqSectionRef, handleGoToLab };
};
export default UseFaqSection;
