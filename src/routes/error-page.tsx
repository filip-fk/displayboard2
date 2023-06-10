import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(typeof error);

  return (
    <div id="error-page">
      <h1>Booo!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {error instanceof Error ? error.message : ""}
      </p>
    </div>
  );
}