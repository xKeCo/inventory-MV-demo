// React
import { useContext, useState } from "react";

// Next
import { useRouter } from "next/router";
import Link from "next/link";

// Local Components
import SEO from "../components/SEO/SEO";

// Context
import AuthContext from "../context/AuthProvider";

// Styles
import s from "../styles/ResetPassword.module.css";

// Chakra UI
import { FormControl, Input } from "@chakra-ui/react";

// react-hot-toast notifications
import { toast } from "react-hot-toast";

// Axios
import axios from "axios";

function ResetPassword() {
  // Auth context = User data | handle if user is logged in
  const { auth } = useContext(AuthContext);

  // Router
  const router = useRouter();

  // SetLoading
  const [loading, setLoading] = useState(false);

  // Handle if user already send a reset password request
  const [send, setSend] = useState(false);

  // username to send reset password request
  const [username, setUsername] = useState({
    username: "",
  });

  // redirect to home if already logged in
  if (auth) {
    router.push("/");
  }

  // handle input change = get data from input
  const handleChange = (e) => {
    setUsername({
      ...username,
      [e.target.name]: e.target.value,
    });
  };

  // handle form submit = send reset password request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "https://mascotas-back-production.up.railway.app/api/auth/reset-password",
        username
      );
      // router.push("/");
      setSend(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title={"Reset"} />

      <div className={s.reset}>
        <div className={s.reset__image__container}>
          <img
            src="/logos/logoLogin.png"
            alt="Logo de mascotas del valle"
            width="100%"
          />
        </div>
        {send ? (
          <div className={s.sendSuccess}>
            <h1 className={s.reset__form__text1}>
              Se ha enviado un correo electr&oacute;nico vinculado al nombre del
              usuario.
            </h1>
          </div>
        ) : (
          <form className={s.reset__form__container} onSubmit={handleSubmit}>
            <div className={s.reset__form__text__container}>
              <h1 className={s.reset__form__text1}>Restablecer contraseña,</h1>
              <p className={s.reset__form__text2}>
                Para hacerlo ingresa tu usuario.
              </p>
            </div>
            <FormControl id="email" isRequired className={s.reset__form}>
              <p>Usuario</p>
              <Input
                name="username"
                type="text"
                placeholder="Ingrese su usuario"
                onChange={handleChange}
              />
            </FormControl>

            <button
              className={
                loading
                  ? s.reset__form__button__disabled
                  : s.reset__form__button
              }
              type="submit"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Reestablecer contraseña"}
            </button>
          </form>
        )}
        <div className={s.password}>
          <p className={s.password__text}>¿Recuerdas tu contrase&ntilde;a?</p>
          <Link href="/login">
            <p className={s.password__link}>Iniciar sesi&oacute;n </p>
          </Link>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
