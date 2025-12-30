// -------------------- Dados dos artigos --------------------
const artigos = [
  {
    titulo:"Benefícios das Frutas",
    texto:"As frutas são fontes naturais de vitaminas, fibras e antioxidantes essenciais para a saúde...",
    cat:"frutas",
    img:"imagens/frutas.jpg"
  },
  {
    titulo:"Benefícios dos Legumes e Verduras",
    texto:"Vegetais oferecem minerais e fibras que ajudam no funcionamento intestinal e prevenção de doenças...",
    cat:"vegetais",
    img:"imagens/vegetais.jpg"
  },
  {
    titulo:"Benefícios das Carnes",
    texto:"As carnes fornecem proteínas de alto valor biológico e nutrientes como ferro e vitamina B12...",
    cat:"carnes",
    img:"imagens/carnes.jpg"
  },
  {
    titulo:"Alimentação Saudável",
    texto:"Uma dieta equilibrada melhora a imunidade, energia diária e bem-estar geral...",
    cat:"saude",
    img:"imagens/piramide.jpg"
  }
];


// -------------------- Busca / Filtro / Paginação --------------------
let paginaAtual = 1;
const porPagina = 4;

const lista = document.getElementById("listaArtigos");
const busca = document.getElementById("busca");
const categoria = document.getElementById("categoria");

function renderizar(){
  let filtrados = artigos.filter(a =>
    a.titulo.toLowerCase().includes(busca.value.toLowerCase()) &&
    (categoria.value === "todas" || a.cat === categoria.value)
  );

  const total = Math.max(1, Math.ceil(filtrados.length / porPagina));
  if(paginaAtual > total) paginaAtual = total;

  const inicio = (paginaAtual - 1) * porPagina;
  const pagina = filtrados.slice(inicio, inicio + porPagina);

  lista.innerHTML = pagina.map(a => `
    <article class="card">
      <img src="${a.img}" onclick="abrirLightbox('${a.img}')">
      <h3>${a.titulo}</h3>
      <p>${a.texto}</p>
    </article>
  `).join("");

  document.getElementById("infoPagina").innerText =
   `Página ${paginaAtual} de ${total}`;
}

document.getElementById("voltar").onclick = () => { if(paginaAtual>1){ paginaAtual--; renderizar(); }};
document.getElementById("avancar").onclick = () => { paginaAtual++; renderizar(); };

busca.oninput = renderizar;
categoria.onchange = renderizar;

renderizar();


// -------------------- Tema --------------------
document.getElementById("temaBtn").onclick =
  () => document.body.classList.toggle("light");


// -------------------- Navegação --------------------
document.querySelectorAll("nav button").forEach(btn=>{
  btn.onclick = () => {
    document.querySelectorAll(".pagina").forEach(p=>p.classList.remove("ativa"));
    document.getElementById(btn.dataset.page).classList.add("ativa");
  };
});


// -------------------- Lightbox --------------------
function abrirLightbox(src){
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";
}

function fecharLightbox(){
  document.getElementById("lightbox").style.display = "none";
}

window.fecharLightbox = fecharLightbox;
window.abrirLightbox = abrirLightbox;
