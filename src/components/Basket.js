import React from "react";

class Basket extends React.Component {
  //{ basket, onClickValidate, basketContent } = props;
  render() {
    let basketContent;
    if (this.props.basket.length === 0) {
      basketContent = (
        <div className="basket-content-empty">Votre panier est vide</div>
      );
    } else {
      basketContent = [];
      console.log("---");
      const menusKeys = Object.keys(this.props.menus);
      menusKeys.forEach(menuName => {
        //console.log(" -- " + menuName);
        this.props.menus[menuName].forEach(menuItem => {
          //console.log("  -");
          this.props.basket.forEach(basketItem => {
            console.log("   " + menuItem.id + " === " + basketItem.id);
            if (menuItem.id === basketItem.id) {
              console.log("found");
              basketContent.push(
                <div key={menuItem.id}>
                  <button
                    onClick={e => {
                      this.props.addRemoveFromBasket(basketItem.id, -1);
                    }}
                  >
                    -
                  </button>
                  {basketItem.quantity}
                  <button
                    onClick={() => {
                      this.props.addRemoveFromBasket(basketItem.id, 1);
                    }}
                  >
                    +
                  </button>
                  {menuItem.title},{" "}
                  {(
                    parseFloat(basketItem.quantity) * parseFloat(menuItem.price)
                  ).toFixed(2) +
                    " €" +
                    " / " +
                    basketItem.quantity * parseFloat(menuItem.price)}
                </div>
              );
            }
          });
        });
      });
    }

    return (
      <aside className="basket">
        <button
          className={
            "validate " +
            (this.props.basket.length > 0 ? "validate-active" : "")
          }
          onClick={e => {
            if (this.props.basket.length > 0) {
              this.props.onClickValidate();
            }
          }}
        >
          Valider mon panier
        </button>
        <div className="basket-content">{basketContent}</div>
      </aside>
    );
  }
}

export default Basket;
