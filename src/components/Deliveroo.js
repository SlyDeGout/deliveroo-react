import React from "react";
import axios from "axios";
import Restaurant from "./restaurant";
import Menu from "./menu";
import Basket from "./Basket.js";

class App extends React.Component {
  state = {
    isLoading: true,
    restaurant: null,
    menus: null,
    basket: []
  };

  addRemoveFromBasket = (id, quantity) => {
    const modBasket = [...this.state.basket];
    for (let i = 0; i < modBasket.length; i++) {
      if (
        modBasket[i].id === id &&
        ((quantity < 0 && modBasket[i].quantity + quantity >= 0) ||
          quantity > 0)
      ) {
        modBasket[i].quantity += quantity;
        break;
      }
    }
    this.setState({ basket: modBasket });
  };

  onMenuCardClick = menuItem => {
    const modBasket = [...this.state.basket];
    let idxBasket = -1;
    for (var i = 0; i < modBasket.length; i++) {
      if (modBasket[i].id === menuItem.id) {
        idxBasket = i;
      }
    }
    if (idxBasket === -1) {
      modBasket.push({ ...menuItem, quantity: 1 });
    } else {
      modBasket[idxBasket].quantity++;
    }
    this.setState({ basket: modBasket });
  };

  render() {
    console.log("DELIVEROO RENDER");
    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    let menuList;
    if (this.state.restaurant === null || this.state.menus === null) {
      return <div>Fatal error...</div>;
    } else {
      menuList = Object.keys(this.state.menus);
    }

    // let basketContent;
    // if (this.state.basket.length === 0) {
    //   basketContent = (
    //     <div className="basket-content-empty">Votre panier est vide</div>
    //   );
    // } else {
    //   basketContent = [];
    //   console.log("---");
    //   const menusKeys = Object.keys(this.state.menus);
    //   menusKeys.forEach(menuName => {
    //     //console.log(" -- " + menuName);
    //     this.state.menus[menuName].forEach(menuItem => {
    //       //console.log("  -");
    //       this.state.basket.forEach(basketItem => {
    //         console.log("   " + menuItem.id + " === " + basketItem.id);
    //         if (menuItem.id === basketItem.id) {
    //           console.log("found");
    //           basketContent.push(
    //             <div key={menuItem.id}>
    //               <button
    //                 onClick={e => {
    //                   this.addRemoveFromBasket(basketItem.id, -1);
    //                 }}
    //               >
    //                 -
    //               </button>
    //               {basketItem.quantity}
    //               <button
    //                 onClick={() => {
    //                   this.addRemoveFromBasket(basketItem.id, 1);
    //                 }}
    //               >
    //                 +
    //               </button>
    //               {menuItem.title},{" "}
    //               {(
    //                 parseFloat(basketItem.quantity) * parseFloat(menuItem.price)
    //               ).toFixed(2) +
    //                 " €" +
    //                 " / " +
    //                 basketItem.quantity * parseFloat(menuItem.price)}
    //             </div>
    //           );
    //         }
    //       });
    //     });
    //   });
    // }

    return (
      <div className="App">
        <header>
          <div className="container">
            <div className="logo">
              <img
                src="https://consumer-component-library.roocdn.com/11.3.1/static/images/logo-teal.64a39561252047a022e5ce0929c75374.svg"
                alt="Logo Deliveroo"
              />
            </div>
          </div>
        </header>
        {
          <Restaurant
            name={this.state.restaurant.name}
            description={this.state.restaurant.description}
            picture={this.state.restaurant.picture}
          />
        }
        <main>
          <div className="container">
            <section className="menu-list">
              {menuList.map((name, index) => {
                if (this.state.menus[name].length > 0) {
                  return (
                    <Menu
                      key={index}
                      name={name}
                      menus={this.state.menus[name]}
                      onMenuCardClick={menuItem =>
                        this.onMenuCardClick(menuItem)
                      }
                    />
                  );
                } else {
                  return null;
                }
              })}
            </section>
            {
              <Basket
                basket={this.state.basket}
                menus={this.state.menus}
                onClickValidate={() => {
                  console.log("onClick Basket Validate");
                }}
                addRemoveFromBasket={(id, quantity) =>
                  this.addRemoveFromBasket(id, quantity)
                }
              />
            }
          </div>
        </main>
      </div>
    );
  }

  componentDidMount() {
    console.log("DELIVEROO componentDidMount");
    axios
      .get("https://deliveroo-api.now.sh/menu")
      .then(res => {
        this.setState({
          restaurant: res.data.restaurant,
          menus: res.data.menu,
          isLoading: false
        });
      })
      .catch(e => {
        console.log({
          error: e.message
        });
      });
  }
}

export default App;
