import React from "react";
import welcome from "../../../../assets/img/welcome.png";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function Welcome() {
  return (
    <>
      <ThemeSwitcher />
      <div div className="Custom__body--bg">
        <GoBackBtn />
        <div className="container">
          <div
            className="row justify-content-center align-items-center text-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="col-md-8">
              <h1 className="content__title">Welcome To Our Page</h1>
              <img
                src={welcome}
                alt="Welcome Img"
                className="img-fluid w-50"
                style={{
                  filter:
                    "drop-shadow(0.35rem 0.35rem 0.35rem var(--main-color))",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
