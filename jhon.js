const express = require("express");
const app = express();
app.use(express.json());

let cursos = [
  { id: 1, nome: "Português", preco: 25.0, categoria: "Línguas" },
  { id: 2, nome: "Matemática", preco: 80.0, categoria: "Exatas" },
  { id: 3, nome: "Ciências", preco: 15.0, categoria: "Biológicas" },
  { id: 4, nome: "História", preco: 15.0, categoria: "Humanas" },
];


app.get("/cursos", (req, res) => {
  res.json(cursos);
});





app.post("/cursos", (req, res) => {
  const novo = { id: cursos.length + 1, ...req.body };
  cursos.push(novo);
  res.status(201).json(novo);
});


app.put("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cursos.findIndex((c) => c.id === id);
  if (index !== -1) {
    cursos[index] = { id, ...req.body };
    res.json(cursos[index]);
  } else res.status(404).json({ erro: "Curso não encontrado" });
});


app.delete("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cursos = cursos.filter((c) => c.id !== id);
  res.json({ mensagem: "Curso removido com sucesso" });
});


app.get("/cursos/preco/:valor", (req, res) => {
  const valor = parseFloat(req.params.valor);
  const filtrados = cursos.filter((c) => c.preco <= valor);
  res.json(filtrados);
});

app.post("/cursos/mercadoria", (req, res) => {
  const novos = req.body.map((c, i) => ({
    id: cursos.length + i + 1,
    ...c,
  }));
  cursos.push(...novos);
  res.status(201).json(novos);
});


app.get("/cursos/quantidade", (req, res) => {
  res.json({ quantidade: cursos.length });
});


app.get("/cursos/primeiro", (req, res) => {
  res.json(cursos[0]);
});


app.get("/cursos/ultimo", (req, res) => {
  res.json(cursos[cursos.length - 1]);
});


app.get("/cursos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const curso = cursos.find((c) => c.id === id);
  if (curso) res.json(curso);
  else res.status(404).json({ erro: "Curso não encontrado" });
});
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
