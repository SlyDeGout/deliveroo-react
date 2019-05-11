import React from "react";
import axios from "axios";
import Restaurant from "./restaurant";
import Menu from "./menu";
import Basket from "./Basket.js";
import formatPrice from "../utils/formatprice";

class App extends React.Component {
  state = {
    isLoading: true,
    restaurant: null,
    menus: null,
    basket: [],
    popOver: null, // { title: "Titre", description: "Description", price: "12.00" },
    popOverQuantity: 1,
    error: false
  };

  modifyQuantity = (id, quantity) => {
    const modBasket = [...this.state.basket];
    for (let i = 0; i < modBasket.length; i++) {
      if (
        modBasket[i].id === id &&
        ((quantity < 0 && modBasket[i].quantity + quantity >= 0) ||
          quantity > 0)
      ) {
        modBasket[i].quantity += quantity;
        if (modBasket[i].quantity <= 0) {
          modBasket.splice(i, 1);
        }
        break;
      }
    }

    this.setState({ basket: modBasket });
  };

  // onMenuCardClick = menuItem => {
  //   const modBasket = [...this.state.basket];
  //   let idxBasket = -1;
  //   for (var i = 0; i < modBasket.length; i++) {
  //     if (modBasket[i].id === menuItem.id) {
  //       idxBasket = i;
  //     }
  //   }
  //   if (idxBasket === -1) {
  //     modBasket.push({ ...menuItem, quantity: 1 });
  //   } else {
  //     modBasket[idxBasket].quantity++;
  //   }
  //   this.setState({ basket: modBasket });
  // };

  onMenuCardClick = menuItem => {
    this.setState({ popOver: menuItem });
  };

  onPopOverCancelClick = () => {
    this.setState({ popOver: null, popOverQuantity: 1 });
  };

  onPopOverTotalClick = (menuItem, quantity) => {
    const modBasket = [...this.state.basket];
    let idxBasket = -1;
    for (var i = 0; i < modBasket.length; i++) {
      if (modBasket[i].id === menuItem.id) {
        idxBasket = i;
      }
    }
    if (idxBasket === -1) {
      modBasket.push({ ...menuItem, quantity: quantity });
    } else {
      modBasket[idxBasket].quantity += quantity;
    }
    this.setState({ basket: modBasket, popOver: null, popOverQuantity: 1 });
  };

  render() {
    console.log("DELIVEROO RENDER");

    return (
      <div style={{ fontSize: "20px" }}>
        Il y a des petits doublons de données dans les states "Basket" et
        "popOver" ... ^_^ <br />
        <br />
        Les clicks sur le menu ne scrolle pas smooth ni à la bonne position
        ... ;p <br />
        <br />( pousse le sur github avant de faire des modifs )
      </div>
    );

    if (this.state.error) {
      return <div>Error while fetching datas...</div>;
    }

    if (this.state.isLoading) {
      return <div>Loading...</div>;
    }

    const menuList = Object.keys(this.state.menus);
    const notEmptyMenuList = menuList.filter(name => {
      return this.state.menus[name].length > 0;
    });

    return (
      <div className="App">
        {this.state.popOver !== null && (
          <div className="popOver">
            <div className="popOverContent">
              <img src={this.state.popOver.picture} alt="" />
              <span>{this.state.popOver.title}</span>
              <span>{this.state.popOver.description}</span>
              <span>
                <button
                  onClick={e => {
                    if (this.state.popOverQuantity - 1 > 0) {
                      this.setState({
                        popOverQuantity: this.state.popOverQuantity - 1
                      });
                    }
                  }}
                >
                  -
                </button>
                {this.state.popOverQuantity}
                <button
                  onClick={e =>
                    this.setState({
                      popOverQuantity: this.state.popOverQuantity + 1
                    })
                  }
                >
                  +
                </button>
              </span>
              <button onClick={() => this.onPopOverCancelClick()}>
                Annuler
              </button>
              <button
                onClick={e =>
                  this.onPopOverTotalClick(
                    this.state.popOver,
                    this.state.popOverQuantity
                  )
                }
              >
                Total{" "}
                {formatPrice(
                  this.state.popOver.price * this.state.popOverQuantity
                )}{" "}
                €
              </button>
            </div>
            <div
              className="popOverBackgroundClick"
              onClick={() => this.onPopOverCancelClick()}
            />
          </div>
        )}
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
        <nav>
          <div className="container">
            <ul>
              {notEmptyMenuList.map((navItem, index) => (
                <li key={index}>
                  <a href={"#" + navItem}>{navItem}</a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
        <main>
          <div className="container">
            <section className="menu-list">
              {notEmptyMenuList.map((name, index) => {
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
                modifyQuantity={(id, quantity) =>
                  this.modifyQuantity(id, quantity)
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
        this.setState({ error: true });
      });
  }
}

export default App;
