import React from "react";

function Restaurant(props) {
  const { name, description, picture } = props;
  return (
    <section className="restaurant">
      <div className="container">
        <div className="restaurant-details">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
        <img src={picture} alt={"Visuel " + name} />
      </div>
    </section>
  );
}

export default Restaurant;
