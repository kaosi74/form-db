import express from "express";
import { Router } from "express";
import User from "../models/user.model";

const router = Router()

router.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message})
    }
})

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({message: "Internal Server Error", error: error.message})
      }
})