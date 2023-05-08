export const lorem10 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, neque?";
export const lorem20 =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, molestias reprehenderit. Voluptates fugit tenetur itaque minus sed, assumenda delectus accusantium!";
export const lorem30 =
  "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt explicabo accusantium vel. Quos, illo. Velit est voluptatum at dignissimos, amet alias veritatis obcaecati assumenda, repellat aliquid non quae nam! Nobis.";

export let random100 = (n) => Math.floor(Math.random() * n) + 1;
export let randomMileague = () => Math.floor(Math.random() * (300000 - 20000 + 1));
export let randomPrice = () => Math.floor(Math.random() * (65000 - 6000 + 1));
export let minPrice = (count, increment) => {
  let prices = [];
  for (let i = 0; i < count; i++) {
    prices.push(5000 + i * increment);
  }
  return prices;
};

export const color = ["red", "blue", "black", "white", "yellow", "brown"];
export const getRandomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];
export const aboutMe1 =
  "SW Auto of Houston treats our customers with paramount concern. We have a great varieties of vehicles for you to choose from. We all know that your time is precious and you have high expectations. As a fast growing used car dealer in Houston, we enjoy the challenge of meeting and exceeding those standards each and every time. So, come see us and find out.";

export const aboutMe2 =
  "Our experienced and friendly sales are always eager to share their knowledge and enthusiasm with you. We encourage you to browse our online inventory. Please don't hesitate to call and schedule a test drive when you are ready.";
export const aboutMe3 =
  "If you don't see a particular vehicle, we are only a phone call away. We will gladly work closely with you and inform you when a matching car arrives. Allow us to be your one-stop auto dealer. We look forward to serving you, always!";
