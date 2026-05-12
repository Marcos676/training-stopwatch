import { useState, useEffect } from "react";
import Button from "./Button";

export default function Stopwatch(): any {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const beepSound = new Audio("/beep_sound.mp3"); //Crea el objeto Audio usando la ruta pública

  useEffect(() => {
    // Usamos un intervalo para actualizar el tiempo
    let interval: any = null;
    // Si el cronómetro está corriendo, iniciamos el intervalo
    if (isRunning) {
      // Incrementamos el tiempo cada 10 milisegundos
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Aunque se limpie el intervalo al pausarlo, el tiempo se guardará en el estado, por lo que al reanudarlo continuará desde donde se quedó
      }, 10);
      //Reproduce sonido de beep
      beepSound.currentTime = 0.037; // Reinicia el sonido si ya se reproducción antes. 0.37 por el tiempo de silencio al comienzo del sonido
      beepSound
        .play()
        .catch((error) => console.error("Error al reproducir:", error));
    } else {
      // Si el cronómetro no está corriendo, limpiamos el intervalo
      clearInterval(interval);
    }
    // Limpiamos el intervalo cuando el componente se desmonta o cuando isRunning cambia para evitar fugas de memoria
    return () => clearInterval(interval);
  }, [isRunning]);

  // Función para formatear el tiempo en horas, minutos, segundos y milisegundos
  function formatTime(time: number): Array<string> {
    const milliseconds = time % 100;
    const seconds = Math.floor(time / 100) % 60;
    const minutes = Math.floor(time / 6000) % 60;
    const hours = Math.floor(time / 360000);
    // Formateamos el tiempo en formato HH:MM:SS:MS, asegurándonos de que cada unidad tenga al menos dos dígitos
    let result = [hours, minutes, seconds, milliseconds].map((unit) =>
      String(unit).padStart(2, "0"),
    );

    return result;
  }
  // Desestructuramos el resultado de formatTime para obtener horas, minutos, segundos y milisegundos por separado
  const [hours, minutes, seconds, milliseconds] = formatTime(time);

  function handleStart() {
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setTime(0);
  }

  return (
    <section className="stopwatch w-full flex flex-col items-center justify-center max-w-90">
      <div className="stopwatch_display text-white font-mono flex gap-1">
        <span className="stopwatch_hours text-2xl ">{hours}</span>
        <span className="stopwatch_minutes text-7xl min-[360px]:text-8xl">
          {`${minutes}:${seconds}`}
        </span>
        <span className="stopwatch_milliseconds text-2xl ">{milliseconds}</span>
      </div>
      <div className="stopwatch_controls w-full flex justify-between mt-4">
        <Button
          bgAndHoverColors="bg-green-500 hover:bg-green-700"
          text="START"
          click={handleStart}
        />
        <Button
          bgAndHoverColors="bg-red-500 hover:bg-red-700"
          text="STOP"
          click={handleStop}
        />
        <Button
          bgAndHoverColors="bg-gray-500 hover:bg-gray-700"
          text="RESET"
          click={handleReset}
        />
      </div>
    </section>
  );
}
