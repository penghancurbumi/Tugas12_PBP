const express = require("express");
const app = express();
const port = 3000;
const prisma = require("./modules/dbprisma");

app.use(express.json());

app.get("/iphone", async (req, res) => {
  try {
    const handphone = await prisma.iphone.findMany();
    res.status(200).json({  status: "success",message: "handphone berhasil dipilih", handphone });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/oppo", async (req, res) => {
  try {
    const handphone = await prisma.oppo.findMany();
    res.status(200).json({  status: "success",message: "handphone berhasil diambil", handphone });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/vivo", async (req, res) => {
  try {
    const handphone = await prisma.vivo.findMany();
    res.status(200).json({  status: "success",message: "handphone berhasil dipilih", handphone });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/xiomi", async (req, res) => {
  try {
    const handphone = await prisma.xiomi.findMany();
    res.status(200).json({  status: "success",message: "handphone berhasil dipilih", handphone });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
app.get("/poco", async (req, res) => {
  try {
    const handphone = await prisma.poco.findMany();
    res.status(200).json({ status: "success", message: "Pemain berhasil diambil", handphone });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/jenis/:brand", async (req, res) => {
  const brand = req.params.brand;
  const { nama, seri, harga } = req.body;

  try {
    const insertphone = await prisma[brand].create({
      data: {
        nama,
        seri,
        harga,
      },
    });
    res
      .status(201)
      .json({  status: "success",message: "seri handphone berhasil ditambahkan dengan merek " + brand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/jenis/:brand/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const brand = req.params.brand;

  const { nama, seri, harga } = req.body;

  try {
    const updatephone= await prisma[brand].update({
      where: { id },
      data: {
        nama,
        seri,
        harga,
      },
    });
    res.status(200).json({  status: "success",message: "Data brand handphone berhasil diupdate!",updatephone: updatephone});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
app.delete("/jenis/:brand/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const brand = req.params.brand;
  try {
    const deleteUser = await prisma[brand].delete({
      where: { id },
    });
    res.status(202).json({ status: "success", message: "Data brand hanphone berhasil dihapus!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({  status: "success",message: "Url yang anda berikan tidak ada!" });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

module.exports = app;