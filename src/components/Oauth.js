import "../Oauth.css";
// import { GoogleLogin } from "@react-oauth/google";
// import jwt_decode from "jwt-decode";


function Oauth() {
  const googleAuth = () => {
		window.open(
			`${process.env.REACT_APP_API_URL}/api/auth/google`,
			"_self"
		);
	};

  return (
    <div className="">
      <button className="google_btn" onClick={googleAuth}>
						<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRVnnbhIjkBSNZ2yCI5hyhiIX2IgwwcQPizEQV4qlk2Q&s" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
    </div>
  );
}

export default Oauth;
