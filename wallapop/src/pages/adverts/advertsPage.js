import styles from "./advertsPage.module.css";
import { getAdverts } from "../service";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import Layout from "../../components/Layout";
import Advert from "../../components/Advert";
import { Link } from "react-router-dom";
import FilterName from "../../components/FilterName";
import { tagsAdvert } from "../service";
import FilterTag from "../../components/FilterTag";

function AdvertsPage() {
  const [adverts, setAdverts] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [tagAdvert, setTagAdvert] = useState([]);

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const filterAddsByName = adverts.filter(
    (advert) =>
      advert.name.toLowerCase().includes(filterName) ||
      advert.name.toLowerCase().startsWith(filterName),
  );

  const handleFilterTag = (tag) => {
    setFilterTag(tag);
  };
  const filterAdds = filterTag
    ? filterAddsByName.filter((advert) => advert.tags.includes(filterTag))
    : filterAddsByName;

  useEffect(() => {
    getAdverts().then((adverts) => setAdverts(adverts));
  }, []);

  useEffect(() => {
    tagsAdvert().then((tagAdvert) => setTagAdvert(tagAdvert));
  }, []);

  function EmptyAdverts() {
    return (
      <div className="AdvertsPage-empty">
        There is no add to show.
        <Button>Create an advert</Button>
      </div>
    );
  }

  /*
  <div>
        <h2>Filter by Tag:</h2>
        <button onClick={() => handleFilterTag(tagAdvert[0])}>Lifestyle</button>
        <button onClick={() => handleFilterTag(tagAdvert[1])}>Mobile</button>
        <button onClick={() => handleFilterTag(tagAdvert[2])}>Motor</button>
        <button onClick={() => handleFilterTag(tagAdvert[3])}>Work</button>
      </div>
    */

  return (
    <Layout title="All adverts">
      <FilterName
        value={filterName}
        onChange={handleFilterName}
        placeholder="Busca"
      ></FilterName>
      <FilterTag tags={tagAdvert} onTagClick={handleFilterTag}></FilterTag>
      <div className="advertsPage">
        {adverts.length > 0 ? (
          <ul className={styles.advertsList}>
            {filterAdds.map((advert) => (
              <li key={advert.id}>
                <Link to={`/v1/adverts/${advert.id}`}>
                  <Advert {...advert} />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyAdverts />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
