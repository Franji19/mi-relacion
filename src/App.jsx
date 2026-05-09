import React from "react";

export default function App() {
  const fechaInicio = new Date("2025-01-01T00:00:00");
  const ahora = new Date();

  const diferencia = ahora - fechaInicio;

  const minutos = Math.floor(diferencia / 1000 / 60);
  const horas = Math.floor(diferencia / 1000 / 60 / 60);
  const dias = Math.floor(diferencia / 1000 / 60 / 60 / 24);

  const [mensajes, setMensajes] = React.useState(() => {
    const guardados = localStorage.getItem("mensajes");
    return guardados ? JSON.parse(guardados) : [];
  });

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
    localStorage.setItem("mensajes", JSON.stringify(mensajes));
  }, [mensajes]);

  React.useEffect(() => {
    localStorage.setItem("album", JSON.stringify(album));
  }, [album]);

  React.useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
  }, [playlist]);

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

  function enviarMensaje() {
    if (nuevoMensaje.trim() === "") return;

    setMensajes([...mensajes, nuevoMensaje]);
    setNuevoMensaje("");
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

  function eliminarCancion(index) {
    const nuevaPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(nuevaPlaylist);
  }

  function eliminarFoto(index) {
    const nuevoAlbum = album.filter((_, i) => i !== index);
    setAlbum(nuevoAlbum);
  }

  function eliminarMensaje(index) {
    const nuevosMensajes = mensajes.filter((_, i) => i !== index);
    setMensajes(nuevosMensajes);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-pink-300 mb-4">
            Edith ❤️ Franchesco
          </h1>

          <p className="text-gray-200 text-lg">Nuestro tiempo juntos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-pink-500/20 shadow-lg shadow-pink-500/10">
            <h2 className="text-4xl font-bold text-pink-300">{dias}</h2>
            <p className="text-white mt-2">Días</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
            <h2 className="text-4xl font-bold text-cyan-300">{horas}</h2>
            <p className="text-white mt-2">Horas</p>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 text-center border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
            <h2 className="text-4xl font-bold text-yellow-300">{minutos}</h2>
            <p className="text-white mt-2">Minutos</p>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-10 border border-cyan-500/20">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
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
            className="mt-4 bg-cyan-500 hover:bg-cyan-400 transition-all px-6 py-3 rounded-2xl font-bold text-white"
          >
            Agregar canción ❤️
          </button>

          <div className="mt-6 space-y-4">
            {playlist.map((cancion, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-700 rounded-2xl p-4"
              >
                <h3 className="text-xl font-bold text-pink-300 mb-2">
                  {cancion.nombre}
                </h3>

                <a
                  href={cancion.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 underline"
                >
                  Escuchar canción 🎵
                </a>

                <button
                  onClick={() => eliminarCancion(index)}
                  className="block mt-3 text-red-400 hover:text-red-300"
                >
                  Eliminar canción
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 mb-10 border border-yellow-500/20">
          <h2 className="text-3xl font-bold text-yellow-300 mb-4">
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
          <h2 className="text-3xl font-bold text-pink-300 mb-6">Álbum ❤️</h2>

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
                  <h3 className="text-xl font-bold text-pink-300">
                    {item.mes}
                  </h3>

                  <p className="text-gray-200 mt-2">{item.descripcion}</p>

                  <button
                    onClick={() => eliminarFoto(index)}
                    className="mt-3 text-red-400 hover:text-red-300"
                  >
                    Eliminar foto
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-pink-500/20">
          <h2 className="text-3xl font-bold text-pink-300 mb-6">
            Mensajes ❤️
          </h2>

          <textarea
            placeholder="Escribe un mensaje..."
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            className="w-full bg-black border border-zinc-700 rounded-2xl p-4 min-h-[120px] text-white placeholder-gray-400"
          />

          <button
            onClick={enviarMensaje}
            className="mt-4 bg-pink-500 hover:bg-pink-400 transition-all px-6 py-3 rounded-2xl font-bold text-white"
          >
            Enviar mensaje
          </button>

          <div className="mt-6 space-y-4">
            {mensajes.map((msg, index) => (
              <div
                key={index}
                className="bg-black border border-zinc-800 p-4 rounded-2xl text-white"
              >
                <p>{msg}</p>

                <button
                  onClick={() => eliminarMensaje(index)}
                  className="mt-3 text-red-400 hover:text-red-300"
                >
                  Eliminar mensaje
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}