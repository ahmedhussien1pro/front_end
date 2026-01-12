import React from "react";
import "../Lab_Style.css";
import ProductList from "../../../../Components/ProductList/ProductList";
import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import products from "../data.json";
import ShowHintBtn from "../../../../Components/ShowHint_Btn/ShowHint_Btn";
import Go2TopBtn from "../../../../Components/Go2Top_Btn/Go2Top_Btn";

export default function Second_Lab() {
  const hintMessage = `
  <ul style="text-align: left; font-size: 16px; line-height: 1.8;">
    <li>1.
      Review the lab home page's source using Burp Suite or your web browser's developer tools.
    </li>
    \n
    <li>2.
      Observe that it contains some JavaScript that discloses the URL of the admin panel.
    </li>
    \n
    <li>3.
      Load the admin panel and delete <mark>carlos</mark>.
    </li>
    <li>4. <code>admin-qfn717</code></li>
  </ul>
`;

  const scriptContent = `
    var isAdmin = false;
    if (isAdmin) {
      var topLinksTag = document.getElementsByClassName("top-links")[0];
      var adminPanelTag = document.createElement('a');
      adminPanelTag.setAttribute('href', '/admin-qfn717');
      adminPanelTag.innerText = 'Admin panel';
      topLinksTag.append(adminPanelTag);
      var pTag = document.createElement('p');
      pTag.innerText = '|';
      topLinksTag.appendChild(pTag);
    }
  `;

  return (
    <>
      <GoBackBtn />
      <ShowHintBtn hintText={hintMessage} />
      <div className="container">
        <h1 style={{ textAlign: "center", marginBlock: "50px" }}>Products</h1>
        <ProductList products={products} />
        <Go2TopBtn />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script>${scriptContent}</script>`,
        }}
      />
    </>
  );
}
