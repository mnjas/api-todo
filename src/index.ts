import express, { Application } from "express";
import { createDonut, getDonuts, updateDonut, deleteDonut } from "./controller";

const app: Application = express();
const port = 3000;

app.use(express.json());

app.post("/donuts", createDonut);
app.get("/donuts", getDonuts);
app.put("/donuts/:id", updateDonut);
app.delete("/donuts/:id", deleteDonut);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;
