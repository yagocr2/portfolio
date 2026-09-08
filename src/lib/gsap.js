/**
 * Registro central de GSAP y sus plugins.
 * Importa SIEMPRE gsap/ScrollTrigger desde aquí para garantizar que los
 * plugins se registran una única vez en toda la app.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Defaults globales con un toque "snappy" acorde a la estética retro.
gsap.defaults({ ease: 'power2.out', duration: 0.6 });

export { gsap, ScrollTrigger, useGSAP };
