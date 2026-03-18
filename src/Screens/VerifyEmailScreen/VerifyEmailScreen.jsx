import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const VerifyEmailScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");

      if (!token) {
        await Swal.fire({
          icon: "error",
          title: "Token inválido",
        });

        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/auth/verify-email?token=${token}`,
          {
            method: "GET",
            headers: {
              "x-api-key": API_KEY,
            },
          },
        );

        const data = await response.json();

        if (!data.ok) {
          throw new Error(data.message);
        }

        await Swal.fire({
          icon: "success",
          title: "Email verificado",
          text: "Ahora puedes iniciar sesión",
        });

        navigate("/login");
      } catch (error) {
        console.error(error);

        await Swal.fire({
          icon: "error",
          title: "Error verificando email",
          text: error.message,
        });

        navigate("/login");
      }
    };

    verify();
  }, [navigate, searchParams]);

  return <div style={{ padding: 40 }}>Verificando email...</div>;
};

export default VerifyEmailScreen;
