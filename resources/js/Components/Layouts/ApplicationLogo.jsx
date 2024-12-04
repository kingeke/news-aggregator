import { appLogo } from "@/assets/pictures";

export default function ApplicationLogo({ width = 212 }) {
    return (
        <div>
            <img src={appLogo} alt="Logo" width={width} />
        </div>
    );
}
