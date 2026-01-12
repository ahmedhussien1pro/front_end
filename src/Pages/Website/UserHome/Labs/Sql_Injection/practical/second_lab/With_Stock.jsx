import "./Second_Lab.css";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import image_1 from "../../../../assets/img/SQL_2nd_Lab/image_1.png";
import image_2 from "../../../../assets/img/SQL_2nd_Lab/image_2.png";
import image_3 from "../../../../assets/img/SQL_2nd_Lab/image_3.png";
import image_4 from "../../../../assets/img/SQL_2nd_Lab/image_4.png";
import image_5 from "../../../../assets/img/SQL_2nd_Lab/image_5.png";
import image_6 from "../../../../assets/img/SQL_2nd_Lab/image_6.png";
import image_7 from "../../../../assets/img/SQL_2nd_Lab/image_7.png";
import image_8 from "../../../../assets/img/SQL_2nd_Lab/image_8.png";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function With_Stock() {
  return (
    <>
      <ThemeSwitcher />
      <div className="Custom__body--bg">
        <GoBackBtn />
        {/* Start Courses  */}
        <div className="course-store ">
          <div className="container-store ">
            <h1 style={{ textAlign: "center", marginBlock: "15px" }}>
              Congratulations
            </h1>
            <div className="row-practice">
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_1} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_2} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_3} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_4} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_5} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_6} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_7} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
              <div className="card-store ">
                <div className="functions">
                  <i className="fa-solid fa-cart-plus"></i>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <img src={image_8} alt="" />
                <div className="card-text-store ">
                  <h4>T-Shirt</h4>
                  <p className="price">$29.9</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Go2TopBtn />
        {/* End Course Content  */}
      </div>
    </>
  );
}
