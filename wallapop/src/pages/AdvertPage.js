import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useState } from "react";
import { Button } from "../components/Button";
import Advert from "../components/Advert";
import { useSelector, useDispatch } from "react-redux";
import { getAd } from "../store/selectors";
import { deletedAd, navigateBack } from "../store/actions";

export function AdvertPage() {
  const { advertId } = useParams();
  const advert = useSelector(getAd(advertId));

  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [confirmToDelete, setConfirmToDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  //const [advert, setAdvert] = useState(null);

  const goBack = () => {
    dispatch(navigateBack());
  };

  const handleDeleteConfirm = async () => {
    try {
      setIsDeleting(true);
      await dispatch(deletedAd(advertId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteCancel = () => {
    setConfirmToDelete(false);
  };

  const handleDeleteRequest = () => {
    setConfirmToDelete(true);
  };

  return (
    <Layout title="Advert detail">
      {advert && (
        <>
          <Advert
            id={advert.id}
            photo={advert.photo}
            name={advert.name}
            price={advert.price}
            tags={advert.tags}
          />
          {!confirmToDelete && !error && (
            <Button onClick={handleDeleteRequest} disabled={isDeleting}>
              Delete Advert
            </Button>
          )}
        </>
      )}
      {error && <div className="Advert-delete-error">{`${error}`}</div>}
      <Button onClick={goBack}>Click here to go back</Button>
      {confirmToDelete && (
        <div className="Advert-confirm-to-delete">
          <p>Do you confirm to delete this ad?</p>
          <div>
            <Button onClick={handleDeleteConfirm} disabled={isDeleting}>
              Confirm
            </Button>
            <Button onClick={handleDeleteCancel} disabled={isDeleting}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {isDeleting && <div>Deleting Advert...</div>}
    </Layout>
  );
}

export default AdvertPage;
