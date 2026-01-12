import GoBackBtn from "../../../../Components/GoBack_Btn/GoBack_Btn";
import data from "../third_lab/Data.json";
import ThemeSwitcher from "../../../../Components/ThemeSwitcher/ThemeSwitcher";
export default function Finish_test() {
  return (
    <>
      <ThemeSwitcher />
      <div className="Custom__body--bg">
        <GoBackBtn />

        <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
          <div
            className="container text-center py-5"
            style={{
              backgroundColor: "var(--secondary-bg)",
              borderRadius: "10px",
              padding: "30px",
              boxShadow: "0 0 10px var(--glass-effect)",
            }}
          >
            <h1 className="mb-4 main-color">Congratulations</h1>
            <table
              className="table table-bordered table-hover"
              style={{
                backgroundColor: "white",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <thead className="thead-dark">
                <tr>
                  <th
                    style={{
                      backgroundColor: "var(--primary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    Product Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "var(--primary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    Actual Price
                  </th>
                  <th
                    style={{
                      backgroundColor: "var(--primary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    Hidden Price
                  </th>
                  <th
                    style={{
                      backgroundColor: "var(--primary-bg)",
                      color: "var(--primary-text)",
                    }}
                  >
                    Admin Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        backgroundColor: "var(--secondary-bg)",
                        color: "var(--primary-text)",
                      }}
                    >
                      {product.name}
                    </td>
                    <td
                      style={{
                        backgroundColor: "var(--secondary-bg)",
                        color: "var(--primary-text)",
                      }}
                    >
                      {product.actual_price}
                    </td>
                    <td
                      style={{
                        backgroundColor: "var(--secondary-bg)",
                        color: "var(--primary-text)",
                      }}
                    >
                      {product.hidden_price}
                    </td>
                    <td
                      style={{
                        backgroundColor: "var(--secondary-bg)",
                        color: "var(--primary-text)",
                      }}
                    >
                      <button className="btn btn-outline-primary btn-sm">
                        Edit
                      </button>
                      <button className="btn btn-outline-danger btn-sm ms-2">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
