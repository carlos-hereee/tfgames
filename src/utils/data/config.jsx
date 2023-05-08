import shortid from "shortid";
import { lorem20, lorem10 } from "./variables";

export const app = {
  socials: [
    {
      isEmpty: true,
      name: "instagram",
      link: "https://www.instagram.com//",
      uid: shortid.generate(),
    },
    {
      isEmpty: true,
      name: "twitter",
      link: "https://www.twitter.com//",
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
    title: "Welcome to TF Games",
    subtitle: "",
    hasHero: false,
    hasIcon: false,
    hasSection: false,
    description: lorem10,
    hero: { link: "", name: "main-hero" },
    details: [lorem20, lorem10],
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
  games: {
    title: "Feature Games",
    list: [
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
  },
  name: "TF Games",
};
