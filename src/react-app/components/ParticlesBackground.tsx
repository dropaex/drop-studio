import { useEffect, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const options = useMemo(() => {
    return {
      fullScreen: {
        enable: false,
      },
      background: {
        color: "transparent",
      },
      particles: {
        number: {
          value: 35,
        },
        color: {
          value: ["#a855f7", "#3b82f6"],
        },
        opacity: {
          value: 0.4,
        },
        size: {
          value: { min: 1, max: 3 },
        },
        move: {
          enable: true,
          speed: 0.6,
        },
        links: {
          enable: true,
          color: "#a855f7",
          opacity: 0.15,
        },
      },
    };
  }, []);

  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  return (
    <div className="fixed inset-0 -z-10">
      <Particles init={particlesInit} options={options as any} />
    </div>
  );
}