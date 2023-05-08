import shortid from "shortid";
import { lorem20, random100, aboutMe1, aboutMe2, aboutMe3 } from "./variables";

export const app = {
  socials: [
    {
      isEmpty: true,
      name: "instagram",
      link: "https://www.instagram.com//",
      uid: shortid.generate(),
    },
  ],
  checkout: {
    title: "Check out",
    subtitle: "",
    hasHero: false,
    hasIcon: false,
    hero: { link: "", name: "main-hero" },
  },
  footerNewsletter: {
    title: "Join the newsletter",
    subtitle: "Suscribe to get the latest content by email",
    response: "Unsubscribe at any time.",
    hasHero: false,
    hasIcon: false,
    hasLink: false,
    hero: { link: "", name: "main-hero" },
  },
  contact: {
    title: "Contact us",
    subtitle: "",
    hasHero: false,
    hasIcon: false,
    hero: { link: "", name: "main-hero" },
  },
  about: {
    title: "Welcome to SW-Auto 59",
    subtitle: "",
    hasHero: false,
    hasIcon: false,
    hero: { link: "", name: "main-hero" },
    sections: [
      {
        title: "Welcome to TFGames",
        response: aboutMe1,
        sections: [aboutMe2, aboutMe3],
        uid: shortid.generate(),
        hasHero: false,
        hasIcon: false,
        hasLink: false,
        hero: { link: "/lorem", name: "lorem ipsum" },
        hyperlink: [{ word: "Maiores", link: "/lorem" }],
      },
      {
        title: "Who am I?",
        response: lorem20 + lorem20,
        uid: shortid.generate(),
        hasHero: false,
        hasIcon: false,
        hero: { link: "", name: "" },
        hasLink: false,
        hyperlink: [{ word: "obcaecati assumenda", link: "/lorem" }],
      },
    ],
  },
  schedule: {
    title: "Bussiness Hours",
    subtitle: "",
    hasHero: false,
    hasIcon: false,
    hero: { link: "", name: "main-hero" },
    hours: [
      { day: "Monday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Tuesday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Wednesday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Thursday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Friday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Saturday", hours: "9:00am - 7:00pm", key: shortid.generate() },
      { day: "Sunday", hours: "Closed", key: shortid.generate() },
    ],
  },
  menu: [
    { name: "games", uid: shortid.generate(), notification: 0 },
    {
      name: "dashboard",
      uid: shortid.generate(),
      notification: 0,
      isPrivate: true,
      alt: "account",
    },
    // { name: "about", uid: shortid.generate(), notification: 0 },
  ],
  games: [
    {
      name: "tictactoe",
      key: shortid.generate(),
      defaultOptions: {
        size: { length: 3, width: 3 },
        gridSize: 9,
      },
    },
    {
      name: "snakeGame",
      key: shortid.generate(),
      defaultOptions: {
        size: { length: 7, width: 7 },
        gridSize: 49,
        renderSpeed: 1,
        lastRenderTime: 0,
        expansionRate: 1,
        newSegment: 0,
        inputDirection: { x: 0, y: 0 },
        lastInputDirection: { x: 0, y: 0 },
      },
    },
  ],
  name: "TF Games",
};
