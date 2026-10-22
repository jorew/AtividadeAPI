const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// Configura o EJS como template engine
app.set("view engine", "ejs");

// Servir ficheiros estáticos (caso queira usar CSS personalizado)
app.use(express.static("public"));

// Rota principal
app.get("/", async (req, res) => {
  try {
    // Consome a API Ron Swanson Quotes
    const response = await axios.get(
      "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    );

    // A API devolve um array com uma citação, ex: ["Clear liquor is for rich women on diets."]
    const quote = response.data[0];

    // Renderiza a view 'index.ejs' passando a citação
    res.render("index", { quote, error: null });
  } catch (error) {
    console.error("Erro ao procurar a citação:", error.message);
    res.render("index", {
      quote: null,
      error:
        "Não foi possível carregar a mensagem do dia. Tente novamente mais tarde.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a rodar na porta http://localhost:${PORT}`);
});
