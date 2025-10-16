import logoImage from "../../../public/assets/images/cozy_logo.webp";

export default function AppLogoIcon(props) {
    return (
        <img src={logoImage} alt="CozyPlace" {...props} />
    );
}
