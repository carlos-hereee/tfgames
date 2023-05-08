import { createContext, useContext, useEffect, useReducer } from "react";
import { axiosWithAuth } from "../fns/axios";
import { reducer } from "../reducer/AppReducer";
import { app } from "../data/config";
import { useNavigate } from "react-router-dom";

import shortid from "shortid";
import { AuthContext } from "./AuthContext";
// import shortid from "shortid";

export const AppContext = createContext();

export const AppState = ({ children }) => {
  const initialState = {
    isLoading: false,
    menu: app.menu,
    app: { ...app.about, name: app.name },
    socials: app.socials,
    about: app.about,
    checkout: app.checkout,
    contact: app.contact,
    footerNewsletter: app.footerNewsletter,
    burger: { notification: 0 },
    paymentType: {},
    selected: {},
    isFiltered: false,
    appliedFilters: [],
    filtered: [],
    filterToggle: false,
    games: app.games,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      getAllAssets(accessToken);
      //   if (!id) {
      //     saveLocalPlayer({
      //       nickname: generate({ words: 2 }).spaced,
      //       uid: uuidv4(),
      //     });
      //   } else {
      //     saveLocalPlayer();
      // }
    }
  }, [accessToken]);

  const getAllAssets = async (accessToken) => {
    console.log("accesstoken", accessToken);
  };
  const loadFilters = (arr) => {
    let filters = {};
    arr.forEach((a) => {
      // if f == brand then a[f] == acura
      Object.keys(a).filter((f) => {
        // if filter option exist
        if (filters[f]) {
          if (!filters[f].some((s) => s === a[f])) {
            filters[f].push(a[f]);
          }
        }
        // if filter option does not exist add it to the filter arr
        if (!filters[f]) {
          filters[f] = [a[f]];
        }
      });
    });

    dispatch({ type: "LOAD_FILTERS", payload: filters });
  };
  const updateBurger = (payload) => {
    dispatch({ type: "UPDATE_BURGER", payload: payload });
  };
  const updateMenu = (payload) => {
    dispatch({ type: "UPDATE_MENU", payload: payload });
  };
  const newsletter = async (values) => {
    dispatch({ type: "IS_LOADING", payload: true });
    try {
      const data = await axiosWithAuth.post("/newsletter", values);
      dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: data });
    } catch (e) {
      dispatch({ type: "ADD_MESSAGE_TO_LOG", payload: true });
    }
  };
  const selectPaymentType = (method) => {
    const data = { ...method, title: `Payment type: ${method.name}` };
    dispatch({ type: "SELECT_PAYMENT_TYPE", payload: data });
  };
  const readyCheckout = (paymentType, user, cart) => {
    console.log("paymentType, user, cart", paymentType, user, cart);
  };
  const seeDetails = (data) => {
    dispatch({ type: "UPDATE_SELECTED", payload: data });
    navigate("/vehicle");
  };
  const resetSelect = () => {
    dispatch({ type: "RESET_SELECTED", payload: {} });
  };
  const resetFilter = (lot) => {
    dispatch({ type: "RESET_FILTER", payload: lot });
  };

  const filterInRange = (arr, min, max, category) => {
    return arr.filter((a) => min < a[category] && a[category] < max);
  };
  const filterByCategory = (arr, conditon) => {
    return arr.filter((a) => {
      for (let b = 0; b < conditon.length; b++) {
        const current = conditon[b];
        const category = conditon[b].type;
        if (a[category] === current[category]) {
          return true;
        }
      }
    });
  };
  const updateFilter = (arr, appliedFilters) => {
    let conditions = [];
    let price = {};
    let brands = [];

    for (let af = 0; af < appliedFilters.length; af++) {
      const input = appliedFilters[af];
      if (input.type === "minprice" || input.type === "maxprice") {
        price[input.type] = parseInt(input[input.type]);
      } else conditions.push(...input.list);
    }
    // if price filter  has value
    if (price.minprice || price.maxprice) {
      const { minprice, maxprice } = price;
      arr = filterInRange(arr, minprice || 0, maxprice || 999999, "price");
    }
    // if models models are to be checked
    if (brands.length > 0) {
      arr = filterByCategory(arr, brands);
    }
    if (mileage > 0) {
      arr = filterInRange(arr, 0, mileage, "mileage");
    }
    // check other filters
    if (conditions.length > 0) {
      arr = filterByCategory(arr, conditions);
    }
    dispatch({ type: "UPDATE_FILTER", payload: arr });
  };
  const getList = (arr, key) => arr.filter((a) => a.type === key).pop();

  const updateAppliedFilter = (applied, { key, value }) => {
    let entry = { [key]: value, type: key, key: shortid.generate() };
    let list = getList(applied, key);

    if (list === undefined) {
      // model does not exist add to applied filters
      applied.push({ ...entry, list: [entry] });
    } else {
      const isMatch = list.list.some((f) => f[key] === value);
      if (isMatch) {
        const idx = list.list.findIndex((l) => l[key] === value);
        list.list.pop(idx);
        if (!list.list.length) {
          return dispatch({ type: "RESET_FILTER", payload: [] });
        }
      } else {
        list.list.push({ ...entry, list: [(prev) => prev, entry] });
      }
    }
    dispatch({ type: "UPDATE_APPLIED_FILTER", payload: applied });
  };
  return (
    <AppContext.Provider
      value={{
        isLoading: state.isLoading,
        socials: state.socials,
        about: state.about,
        services: state.services,
        menu: state.menu,
        schedule: state.schedule,
        burger: state.burger,
        gallery: state.gallery,
        checkout: state.checkout,
        contact: state.contact,
        footerNewsletter: state.footerNewsletter,
        app: state.app,
        paymentMethods: state.paymentMethods,
        selected: state.selected,
        paymentType: state.paymentType,
        disclaimer: state.disclaimer,
        filters: state.filters,
        filtered: state.filtered,
        appliedFilters: state.appliedFilters,
        isFiltered: state.isFiltered,
        filterToggle: state.filterToggle,
        games: state.games,
        updateBurger,
        updateMenu,
        newsletter,
        selectPaymentType,
        readyCheckout,
        seeDetails,
        resetSelect,
        updateFilter,
        updateAppliedFilter,
        resetFilter,
      }}>
      {children}
    </AppContext.Provider>
  );
};
