import React from "react";
import Button from "@material-ui/core/Button";
import { GTranslate } from "@material-ui/icons";
import { useGoogleLogin } from "react-google-login";

const clientId =
  "572601270732-rchfar60lvt5ao2kc6h4aunv7q13grac.apps.googleusercontent.com";

export default function GoogleLogin(props) {
  const { onSubmit } = props;
  const onSuccess = (res) => {
    onSubmit("SuccessGoogle", res.profileObj);
  };

  const onFailure = () => {
    onSubmit("Error");
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <Button
      color="secondary"
      variant="contained"
      onClick={signIn}
      startIcon={<GTranslate />}
    >
      <span>Sign In with Google</span>
    </Button>
  );
}
