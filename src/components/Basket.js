import React from "react";
import formatPrice from "../utils/formatprice";

class Basket extends React.Component {
  //{ basket, onClickValidate, basketContent } = props;

  render() {
    const deliveryCost = 2.5;
    let basketContent;
    let subTotal = 0;
    const validateClassName =
      "validate " + (this.props.basket.length > 0 ? "validate-active" : "");

    if (this.props.basket.length === 0) {
      basketContent = (
        <div className="basket-content-empty">Votre panier est vide</div>
      );
    } else {
      basketContent = [];
      console.log("---");
      const menusKeys = Object.keys(this.props.menus);
      this.props.basket.forEach(basketItem => {
        menusKeys.forEach(menuName => {
          //console.log(" -- " + menuName);
          this.props.menus[menuName].forEach(menuItem => {
            //console.log("  -");
            //console.log("   " + menuItem.id + " === " + basketItem.id);
            if (menuItem.id === basketItem.id) {
              let totalItem =
                parseFloat(basketItem.quantity) * parseFloat(menuItem.price);
              subTotal += totalItem;
              basketContent.push(
                <div className="basketItem" key={menuItem.id}>
                  <button
                    onClick={e => {
                      this.props.modifyQuantity(basketItem.id, -1);
                    }}
                  >
                    -
                  </button>
                  <span>{basketItem.quantity}</span>
                  <button
                    onClick={() => {
                      this.props.modifyQuantity(basketItem.id, 1);
                    }}
                  >
                    +
                  </button>
                  {menuItem.title},{" "}
                  {formatPrice(totalItem) +
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
        <div className="basketInside">
          <button
            className={validateClassName}
            onClick={e => {
              if (this.props.basket.length > 0) {
                this.props.onClickValidate();
              }
            }}
          >
            Valider mon panier
          </button>
          <div className="basket-content">
            {basketContent}

            {this.props.basket.length > 0 && (
              <div>
                <div className="basket-separator" />
                <div className="basket-footer-part">
                  <p>
                    <span>Sous-total</span>
                    <span>{formatPrice(subTotal)} €</span>
                  </p>
                  <p>
                    <span className="bodyBold">Frais de livraison</span>
                    <span>{formatPrice(deliveryCost)} €</span>
                  </p>
                </div>
                <div className="basket-separator-gradient" />
                <div className="basket-footer-part bodyBold">
                  <p>
                    <span>Total</span>
                    <span>{formatPrice(subTotal + deliveryCost)} €</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    );
  }
}

export default Basket;
