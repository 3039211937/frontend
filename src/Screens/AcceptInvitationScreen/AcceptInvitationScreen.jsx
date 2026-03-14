import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const AcceptInvitationScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const acceptInvite = async () => {
      const token = searchParams.get("token");

      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Invitación inválida",
        });

        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/workspace/members/accept-invitation?token=${token}`,
        );

        const data = await response.json();

        if (!data.ok) {
          throw new Error(data.message);
        }

        await Swal.fire({
          icon: "success",
          title: "Invitación aceptada",
          text: "Ahora puedes acceder al workspace",
        });

        navigate("/home");
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error aceptando invitación",
          text: error.message,
        });

        navigate("/login");
      }
    };

    acceptInvite();
  }, []);

  return <div style={{ padding: 40 }}>Procesando invitación...</div>;
};

export default AcceptInvitationScreen;
