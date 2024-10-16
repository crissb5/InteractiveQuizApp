import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../styles/globals.css"; // Import your global styles

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
