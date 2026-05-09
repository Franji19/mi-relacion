import React from "react";
import { supabase } from "./supabase";

export default function App() {
  const [logueado, setLogueado] = React.useState(false);
const [claveLogin, setClaveLogin] = React.useState("");

function entrar() {
  if (claveLogin === "lukacopito") {
    setLogueado(true);
  } else {
    alert("Contraseña incorrecta");
  }
}
  const fechaInicio = new Date("2025-01-01T00:00:00");
  const ahora = new Date();

  const diferencia = ahora - fechaInicio;
  const minutos = Math.floor(diferencia / 1000 / 60);
  const horas = Math.floor(diferencia / 1000 / 60 / 60);
  const dias = Math.floor(diferencia / 1000 / 60 / 60 / 24);

  const [mensajes, setMensajes] = React.useState([]);
  const [nuevoMensaje, setNuevoMensaje] = React.useState("");

  const [album, setAlbum] = React.useState(() => {
    const guardado = localStorage.getItem("album");
    return guardado ? JSON.parse(guardado) : [];
  });

  const [nombreCancion, setNombreCancion] = React.useState("");
  const [linkCancion, setLinkCancion] = React.useState("");

  const [playlist, setPlaylist] = React.useState(() => {
    const guardada = localStorage.getItem("playlist");
    return guardada ? JSON.parse(guardada) : [];
  });

  React.useEffect(() => {
    cargarMensajes();
  }, []);

  React.useEffect(() => {
    localStorage.setItem("album", JSON.stringify(album));
  }, [album]);

  React.useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

  async function cargarMensajes() {
    const { data, error } = await supabase
      .from("mensajes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Error cargando mensajes:", error);
      return;
    }

    setMensajes(data);
  }

  async function enviarMensaje() {
    if (nuevoMensaje.trim() === "") return;

    const { error } = await supabase
      .from("mensajes")
      .insert([{ texto: nuevoMensaje }]);

    if (error) {
      console.log("Error enviando mensaje:", error);
      alert("No se pudo guardar el mensaje");
      return;
    }

    setNuevoMensaje("");
    cargarMensajes();
  }

  function subirFoto(event) {
    const archivo = event.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();

    lector.onload = function () {
      const nuevaFoto = {
        mes: "Nuevo recuerdo ❤️",
        foto: lector.result,
        descripcion: "Momento especial",
      };

      setAlbum([...album, nuevaFoto]);
    };

    lector.readAsDataURL(archivo);
  }

  function agregarCancion() {
    if (nombreCancion.trim() === "" || linkCancion.trim() === "") return;

    const nuevaCancion = {
      nombre: nombreCancion,
      link: linkCancion,
    };

    setPlaylist([...playlist, nuevaCancion]);
    setNombreCancion("");
    setLinkCancion("");
  }
if (!logueado) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-pink-500/20 rounded-3xl p-8 max-w-md w-full text-center shadow-lg shadow-pink-500/10">

        <h1 className="text-4xl font-bold text-pink-200 mb-4">
          Edith ❤️ Franchesco
        </h1>

        <p className="text-gray-300 mb-6">
          Ingresa la contraseña para entrar
        </p>

        <input
          type="password"
          placeholder="Contraseña"
          value={claveLogin}
          onChange={(e) => setClaveLogin(e.target.value)}
          className="w-full p-3 rounded-2xl bg-black border border-zinc-700 text-white placeholder-gray-400 mb-4"
        />

        <button
          onClick={entrar}
          className="w-full bg-pink-500 hover:bg-pink-400 transition-all px-6 py-3 rounded-2xl font-bold text-white"
        >
          Entrar ❤️
        </button>

      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-400 bg-clip-text text-transparent mb-4 drop-shadow-lg">
            Edith ❤️ Franchesco
          </h1>
          <p className="text-white text-lg font-semibold">💗 Nuestro tiempo juntos 💗</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-pink-500/20">
            <h2 className="text-4xl font-bold text-pink-200">{dias}</h2>
            <p className="text-white mt-2">Días</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-cyan-500/20">
            <h2 className="text-4xl font-bold text-cyan-200">{horas}</h2>
            <p className="text-white mt-2">Horas</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-yellow-500/20">
            <h2 className="text-4xl font-bold text-yellow-200">{minutos}</h2>
            <p className="text-white mt-2">Minutos</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-10 border border-cyan-500/20">
          <h2 className="text-3xl font-bold text-cyan-200 mb-6">
            Playlist de la pareja 🎵
          </h2>

          <input
            type="text"
            placeholder="Nombre de la canción"
            value={nombreCancion}
            onChange={(e) => setNombreCancion(e.target.value)}
            className="w-full p-3 rounded-2xl bg-black border border-zinc-700 text-white placeholder-gray-400 mb-4"
          />

          <input
            type="text"
            placeholder="Pega un link de Spotify o YouTube"
            value={linkCancion}
            onChange={(e) => setLinkCancion(e.target.value)}
            className="w-full p-3 rounded-2xl bg-black border border-zinc-700 text-white placeholder-gray-400"
          />

          <button
            onClick={agregarCancion}
            className="mt-4 bg-cyan-500 hover:bg-cyan-400 px-6 py-3 rounded-2xl font-bold text-white"
          >
            Agregar canción ❤️
          </button>

          <div className="mt-6 space-y-4">
            {playlist.map((cancion, index) => (
              <div key={index} className="bg-black border border-zinc-700 rounded-2xl p-4">
                <h3 className="text-xl font-bold text-pink-200 mb-2">
                  {cancion.nombre}
                </h3>

                <a
                  href={cancion.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-200 underline"
                >
                  Escuchar canción 🎵
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-10 border border-yellow-500/20">
          <h2 className="text-3xl font-bold text-yellow-200 mb-4">
            Subir recuerdos 📸
          </h2>

          <input
            type="file"
            accept="image/*"
            onChange={subirFoto}
            className="text-white"
          />
        </div>

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-pink-200 mb-6">Álbum ❤️</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 rounded-3xl overflow-hidden border border-pink-500/20"
              >
                <img
                  src={item.foto}
                  alt={item.mes}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-xl font-bold text-pink-200">
                    {item.mes}
                  </h3>
                  <p className="text-white mt-2">{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-pink-500/20">
          <h2 className="text-3xl font-bold text-pink-200 mb-6">
            Mensajes online ❤️
          </h2>

          <textarea
            placeholder="Escribe un mensaje..."
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 min-h-[120px] text-white placeholder-gray-400"
          />

          <button
            onClick={enviarMensaje}
            className="mt-4 bg-pink-500 hover:bg-pink-400 px-6 py-3 rounded-2xl font-bold text-white"
          >
            Enviar mensaje
          </button>

          <div className="mt-6 space-y-4">
            {mensajes.map((msg) => (
              <div
                key={msg.id}
                className="bg-black border border-zinc-800 p-4 rounded-2xl text-white"
              >
                {msg.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}