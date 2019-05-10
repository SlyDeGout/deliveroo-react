import React from "react";

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
        <span>{price}</span>
        {popular && (
          <span>
            <span role="img" aria-label="popular">
              ⭐
            </span>{" "}
            Popular
          </span>
        )}
      </div>
      {imgToDisplay}
    </div>
  );
}

export default MenuCard;
