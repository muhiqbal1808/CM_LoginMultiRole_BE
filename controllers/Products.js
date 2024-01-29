import { Op } from "sequelize";

import Products from "../models/ProductModel.js";
import Users from "../models/UserModel.js";

export const GetProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "superAdmin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product)
      return res.status(404).json({ msg: "Product tidak ditemukan" });

    let response;
    if (req.role === "superAdmin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const CreateProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Products.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product)
      return res.status(404).json({ msg: "Product tidak ditemukan" });

    const { name, price } = req.body;
    if (req.role === "superAdmin") {
      await Products.update(
        { name, price },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses ditolak" });
      await Products.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product berhasil di update" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product)
      return res.status(404).json({ msg: "Product tidak ditemukan" });

    const { name, price } = req.body;
    if (req.role === "superAdmin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Akses ditolak" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product berhasil di hapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
