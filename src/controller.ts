import { Request, Response } from "express";

interface Donut {
  id: number;
  name: string;
  flavor: string;
  price: number;
  available: boolean;
}

let donuts: Donut[] = [];
let currentId = 1;

export const createDonut = (req: Request, res: Response): void => {
  const { name, flavor, price, available = true } = req.body;

  if (!name || !flavor || price === undefined) {
    res.status(400).json({ error: "Nom, saveur, et prix requis" });
    return;
  }

  const newDonut: Donut = { id: currentId++, name, flavor, price, available };
  donuts.push(newDonut);

  res.status(201).json(newDonut);
};

export const getDonuts = (req: Request, res: Response): void => {
  res.json(donuts);
};

export const updateDonut = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);
  const { name, flavor, price, available } = req.body;

  const donut = donuts.find((d) => d.id === id);

  if (!donut) {
    res.status(404).json({ error: "Donut introuvable" });
    return;
  }

  if (name !== undefined) donut.name = name;
  if (flavor !== undefined) donut.flavor = flavor;
  if (price !== undefined) donut.price = price;
  if (available !== undefined) donut.available = available;

  res.json(donut);
};

export const deleteDonut = (req: Request, res: Response): void => {
  const id = parseInt(req.params.id, 10);

  const index = donuts.findIndex((d) => d.id === id);

  if (index === -1) {
    res.status(404).json({ error: "Donut introuvable" });
    return;
  }

  donuts.splice(index, 1);
  res.status(204).send();
};
