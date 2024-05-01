import styles from "./advertsPage.module.css";
import { getAdverts } from "../service";
import { useState, useEffect } from "react";
import { logout } from "../service";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";

function AdvertsPage({ onLogout }) {
  const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    getAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  const handleLogout = async () => {
    await logout();
    onLogout();
  };

  function tagsAdd(tagsList) {
    const tags = tagsList.map((tag) => {
      return `${tag}`;
    });
    return tags.join(" ");
  }
  return (
    <Layout>
      <div>
        <ul className={styles.advertsList}>
          <Button onClick={handleLogout}>Logout</Button>
          {adverts.map((add) => (
            <li key={add.id}>
              <ul>
                <li>{add.name}</li>
                <li>Estado:{add.sale ? "En venta" : "compra"}</li>
                <li>Precio: {add.price}</li>
                <li>Categoria:{tagsAdd(add.tags)} </li>
                <li>Photo:{add.photo}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default AdvertsPage;
