// Login component start!
export type LoginIconProps = {
    text: string;
    bgStyle: React.CSSProperties;
    logoStyle: React.CSSProperties;
    colorStyle?: React.CSSProperties;
    GoogleLoginHandler?: () => void;
    GithubLoginHandler?: () => void;
};
// Login component end!

// Login user infomation start!
export type UserProps = {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
}
// Login user infomation end!