import React from "react";
import formatPrice from "../utils/formatprice";

function MenuCard(props) {
  const {
    id,
    title,
    description,
    price,
    picture,
    popular,
    onMenuCardClick
  } = props;

  const imgToDisplay = picture ? (
    <img src={picture} alt={"Visuel " + title} />
  ) : null;

  return (
    <div
      className="menu-card"
      onClick={e => {
        onMenuCardClick(id);
      }}
    >
      <div className="menu-card-details">
        <h4>{title}</h4>
        <p>{description}</p>
        <span>{formatPrice(price)}</span>
        {popular && (
          <span className="popular bodyBold">
            <span role="img" aria-label="popular">
              ⭐
            </span>{" "}
            Populaire
          </span>
        )}
      </div>
      {imgToDisplay}
    </div>
  );
}

export default MenuCard;
