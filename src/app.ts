import express from "express";
import { personRoutes, relationshipRoutes } from "./routes";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({
    message:"Route check ok!",
  })
})
  
app.use(personRoutes);
app.use(relationshipRoutes);
  
export default app;