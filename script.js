function iniciarSite() {
    atualizarHora();
    setInterval(atualizarHora, 1000);
    buscarClima();
    criarFolhasCaindo();
  }
  
  function atualizarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR');
    const data = agora.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
    document.getElementById('data-hora').innerText = `${data}, ${hora}`;
    atualizarSaudacao(agora.getHours());
  }
  
  function atualizarSaudacao(hora) {
    let saudacao = "Olá!";
    if (hora >= 5 && hora < 12) {
      saudacao = "☀️ Bom dia!";
    } else if (hora >= 12 && hora < 18) {
      saudacao = "🌤️ Boa tarde!";
    } else {
      saudacao = "🌙 Boa noite!";
    }
    document.getElementById('saudacao').innerText = `🍂 ${saudacao}`;
  }
  
  function buscarClima() {
    fetch("https://wttr.in/Bauru?format=%C+%t")
      .then(response => response.text())
      .then(data => {
        document.getElementById('clima').innerText = `🌡️ Clima: ${data}`;
      })
      .catch(error => {
        document.getElementById('clima').innerText = "Erro ao obter clima";
      });
  }
  
  function adicionarTarefa() {
    const input = document.getElementById("nova-tarefa");
    const texto = input.value.trim();
    if (texto === "") return;
  
    const li = document.createElement("li");
    li.textContent = texto;
    document.getElementById("lista-tarefas").appendChild(li);
    input.value = "";
  }
  
  function agendarLembrete() {
    const texto = document.getElementById("texto-lembrete").value.trim();
    const data = document.getElementById("data-lembrete").value;
  
    if (texto && data) {
      const li = document.createElement("li");
      li.textContent = `${texto} - ${new Date(data).toLocaleString('pt-BR')}`;
      document.getElementById("lista-lembretes").appendChild(li);
  
      document.getElementById("texto-lembrete").value = "";
      document.getElementById("data-lembrete").value = "";
    }
  }
  
  // Folhas caindo (maçãs neste caso)
  const folhaSVG = "https://cdn-icons-png.flaticon.com/512/415/415733.png"; // ícone de maçã
  
  function criarFolha() {
    const folha = document.createElement("img");
    folha.src = folhaSVG;
    folha.classList.add("folha");
  
    // Tamanho aleatório entre 15 e 25px
    const tamanho = 15 + Math.random() * 10;
    folha.style.width = tamanho + "px";
  
    folha.style.left = Math.random() * window.innerWidth + "px";
    folha.style.animationDuration = 5 + Math.random() * 5 + "s";
    folha.style.opacity = 0.5 + Math.random() * 0.5;
  
    document.getElementById("folhas-container").appendChild(folha);
  
    setTimeout(() => folha.remove(), 10000);
  }
  
  function criarFolhasCaindo() {
    setInterval(criarFolha, 800);
  }