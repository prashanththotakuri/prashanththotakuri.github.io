/* -------------------------
   Card action separator
------------------------- */
.sep{
  color: rgba(234,240,255,.35);
  font-weight: 900;
  margin: 0 6px;
}

/* -------------------------
   Metrics section
------------------------- */
.metrics{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}
.metric{
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.06);
  padding: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,.22);
}
.metric-num{
  font-size: 22px;
  font-weight: 900;
  letter-spacing: -.2px;
}
.metric-label{
  margin-top: 6px;
  font-weight: 800;
  color: rgba(234,240,255,.88);
}
.metric-sub{
  margin-top: 6px;
  color: rgba(234,240,255,.62);
  font-weight: 700;
  font-size: 13px;
}

/* -------------------------
   Testimonials
------------------------- */
.tgrid{
  margin-top: 18px;
  display:grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}
.tcard{
  border-radius: 18px;
  border: 1px solid rgba(255,255,255,.10);
  background: rgba(255,255,255,.06);
  padding: 16px;
  box-shadow: 0 12px 40px rgba(0,0,0,.22);
}
.tquote{
  margin: 0;
  color: rgba(234,240,255,.86);
  font-weight: 700;
  line-height: 1.6;
}
.tby{
  margin-top: 12px;
  color: rgba(234,240,255,.55);
  font-weight: 800;
  font-size: 13px;
}

/* -------------------------
   Cursor FX (premium but not annoying)
------------------------- */
.cursorfx{
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  pointer-events: none;
  transform: translate3d(50vw, 50vh, 0);
}
.cursorfx-glow{
  position: absolute;
  width: 180px;
  height: 180px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  filter: blur(90px);
  opacity: .78;
  background:
    radial-gradient(circle, rgba(0,230,183,.30), transparent 55%),
    radial-gradient(circle, rgba(109,91,255,.24), transparent 60%);
  transition: opacity .18s ease, filter .18s ease, transform .18s ease;
}
.cursorfx-core{
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,.95);
  box-shadow:
    0 0 16px rgba(0,230,183,.85),
    0 0 28px rgba(109,91,255,.55);
  opacity: .92;
}

/* subtle boost on hover */
.cursorfx.is-boost .cursorfx-glow{
  opacity: .95;
  filter: blur(105px);
  transform: translate(-50%, -50%) scale(1.04);
}
.cursorfx.is-boost .cursorfx-core{
  box-shadow:
    0 0 18px rgba(0,230,183,1),
    0 0 36px rgba(109,91,255,.70);
}

/* click pulse */
.cursorfx-pulse{
  position:absolute;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  transform: translate(-50%, -50%);
  left: var(--x);
  top: var(--y);
  pointer-events:none;
  mix-blend-mode: screen;
  background: radial-gradient(circle, rgba(255,255,255,.95), rgba(255,255,255,0) 70%);
  box-shadow:
    0 0 40px rgba(0,230,183,.65),
    0 0 70px rgba(109,91,255,.55);
  opacity: .9;
  animation: pulseBurst .55s ease-out forwards;
}
@keyframes pulseBurst{
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: .95; }
  100% { transform: translate(-50%, -50%) scale(18);  opacity: 0; }
}

/* Responsive: metrics/testimonials grids */
@media (max-width: 980px){
  .metrics{ grid-template-columns: 1fr; }
  .tgrid{ grid-template-columns: 1fr; }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce){
  .cursorfx{ display:none; }
}
