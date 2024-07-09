import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const GoogleAuth = ({ onSuccess, onFailure }) => {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <div className="w-full flex justify-center items-center">
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          className="w-full max-w-xs"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
