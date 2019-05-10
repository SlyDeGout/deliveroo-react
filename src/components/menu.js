import React from "react";
import MenuCard from "./menucard";

function Menu(props) {
  const { name, menus, onMenuCardClick } = props;

  return (
    <section className="menu">
      <h3 className="menu-title">{name}</h3>
      <div className="menu-cards">
        {menus.map((menuItem, index) => {
          return (
            <MenuCard
              key={index}
              id={menuItem.id}
              title={menuItem.title}
              description={menuItem.description}
              price={menuItem.price}
              picture={menuItem.picture}
              popular={menuItem.popular}
              onMenuCardClick={id => {
                onMenuCardClick({
                  id: menuItem.id,
                  title: menuItem.title,
                  price: menuItem.price
                });
              }}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Menu;
