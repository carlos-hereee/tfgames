// import React from "react";
// import { AppContext } from "../../utils/context/AppContext";
// import Icons from "../atoms/Icons";

// const FollowUs = () => {
//   const { socials } = useContext(AppContext);
//   return (
//     <div className="socials">
//       <h4>Dont Miss a thing! Follow Us!</h4>
//       {socials.map((s) => (
//         <a href={s.link} key={s.uid} className={`social-link ${s.social}`}>
//           <Icons name={s.social} size="2x" />
//         </a>
//       ))}
//     </div>
//   );
// };

// export default FollowUs;
import { useContext } from "react";
import { AppContext } from "../../utils/context/AppContext";
import SocialLink from "../atoms/SocialLink";

const FollowUs = () => {
  const { socials } = useContext(AppContext);
  return (
    <div className="social">
      <h4>Dont miss a thing, Follow us on our socials</h4>
      <div className="social-icons">
        {socials.map(({ name, isEmpty, uid }) => (
          <SocialLink data={{ name, isEmpty }} key={uid} />
        ))}
      </div>
    </div>
  );
};

export default FollowUs;
