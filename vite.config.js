import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

//vitejs.dev/config/
https: export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost",
    port: 8080,
  },
});
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "192.168.0.50",
//     port: 8080,
//   },
// });
