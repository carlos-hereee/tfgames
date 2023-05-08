import Icons from "../molecules/icons/Icons";

const SocialLink = ({ data }) => {
  const { name, isEmpty, link } = data;
  return (
    <a className={`social-link ${data.name}`} href={isEmpty ? "/#" : link}>
      <Icons name={name} size="2x" />
    </a>
  );
};

export default SocialLink;
