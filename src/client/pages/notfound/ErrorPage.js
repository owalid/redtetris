import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => (
  <div className="d-flex jcnt--center aitems--center fdir--column pt-3 error--404-container">
    <h1 className="aself--center">404, Page introuvable 😭</h1>
    <Link className="aself--center" to="/">Revenir à la page d'accueil</Link>
  </div>
)

export default ErrorPage