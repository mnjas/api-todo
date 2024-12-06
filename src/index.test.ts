import request from "supertest";
import { describe, expect, it } from "@jest/globals";
import index from "./index";

describe("/donuts", () => {
  it("créer un nouveau donut", async () => {
    const response = await request(index)
      .post("/donuts")
      .send({ name: "Donut fourré", flavor: "vanille", price: 2 });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(Number),
      name: "Donut fourré",
      flavor: "vanille",
      price: 2,
      available: true,
    });
  });

  it("return 400 si des champs requis sont introuvables", async () => {
    const response = await request(index)
      .post("/donuts")
      .send({ flavor: "pistache" });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: "Nom, saveur, et prix requis",
    });
  });

  it("mise à jour d'un donut", async () => {
    const newDonut = await request(index)
      .post("/donuts")
      .send({ name: "Donut au chocolat", flavor: "Chocolat", price: 2.5 });

    const updatedDonut = await request(index)
      .put(`/donuts/${newDonut.body.id}`)
      .send({ name: "Triple chocolat donut", price: 2.99, available: false });

    expect(updatedDonut.status).toBe(200);
    expect(updatedDonut.body.name).toBe("Triple chocolat donut");
    expect(updatedDonut.body.price).toBe(2.99);
    expect(updatedDonut.body.available).toBe(false);
  });

  it("supprimer un donut", async () => {
    const newDonut = await request(index)
      .post("/donuts")
      .send({ name: "donut nature", flavor: "nature", price: 1.5 });

    expect(newDonut.status).toBe(201);
    expect(newDonut.body).toHaveProperty("id");

    const deleteResponse = await request(index).delete(`/donuts/${newDonut.body.id}`);
    expect(deleteResponse.status).toBe(204);

    const responseAfterDelete = await request(index).get("/donuts");
    expect(responseAfterDelete.body).not.toEqual(
      expect.arrayContaining([expect.objectContaining({ id: newDonut.body.id })])
    );
  });
});
