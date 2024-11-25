import request from "supertest";
import { describe, expect, it } from '@jest/globals';
import index from "./index";

describe("/todos", () => {
  it("créer une nouvelle tache", async () => {
    const response = await request(index)
      .post("/todos")
      .send({ title: "Utiliser Supertest" });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      title: "Utiliser Supertest",
      completed: false,
    });
  });

  it("return 400 si title est introuvable", async () => {
    const response = await request(index)
      .post("/todos")
      .send({ completed: true });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: "titre requis",
    });
  });

  it("mise à jour d'une tâche", async () => {
    const newTodo = await request(index)
      .post("/todos")
      .send({ title: "Souhaiter un joyeux anniversaire", completed: false });

    const updatedTodo = await request(index)
      .put(`/todos/${newTodo.body.id}`)
      .send({ title: "Souhaiter un joyeux anniversaire à John Doe", completed: true });

    expect(updatedTodo.status).toBe(200);
    expect(updatedTodo.body.title).toBe("Souhaiter un joyeux anniversaire à John Doe");
    expect(updatedTodo.body.completed).toBe(true);
  });

  it("supprimer une tâche", async () => {
    const newTodo = await request(index)
      .post("/todos")
      .send({ title: "Ne rien faire", completed: false });
  
    expect(newTodo.status).toBe(201);
    expect(newTodo.body).toHaveProperty("id");
  
    const deleteResponse = await request(index).delete(`/todos/${newTodo.body.id}`);
    expect(deleteResponse.status).toBe(204);

    const responseAfterDelete = await request(index).get("/todos");
      console.log("TODOS AFTER DELETE:", responseAfterDelete.body);
  });
});