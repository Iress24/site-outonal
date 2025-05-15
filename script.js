function iniciarSite() {
    atualizarHora();
    setInterval(atualizarHora, 1000);
    buscarClima();
    criarFolhasCaindo();
    verificarLembretesPeriodicamente();
    pedirPermissaoNotificacoes();
  }
  
  function atualizarHora() {
    const agora = new Date();
    const hora = agora.toLocaleTimeString('pt-BR');
    const data = agora.toLocaleDateString('pt-BR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  
    document.getElementById('data-hora').innerText = `${data}, ${hora}`;
    atualizarSaudacao(agora.getHours());
  }
  
  function atualizarSaudacao(hora) {
    let saudacao = "Olá!";
    if (hora >= 5 && hora < 12) saudacao = "☀️ Bom dia!";
    else if (hora >= 12 && hora < 18) saudacao = "🌤️ Boa tarde!";
    else saudacao = "🌙 Boa noite!";
    document.getElementById('saudacao').innerText = `🍂 ${saudacao}`;
  }
  
  function buscarClima() {
    fetch("https://wttr.in/Bauru?format=%C+%t")
      .then(res => res.text())
      .then(data => {
        document.getElementById('clima').innerText = `🌡️ Clima: ${data}`;
      })
      .catch(() => {
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
  
  // Lembretes com edição, exclusão e alarme
  const lembretes = [];
  
  function agendarLembrete() {
    const texto = document.getElementById("texto-lembrete").value.trim();
    const data = document.getElementById("data-lembrete").value;
  
    if (!texto || !data) return;
  
    const id = Date.now();
    lembretes.push({ id, texto, horario: new Date(data), disparado: false });
    renderizarLembretes();
  
    document.getElementById("texto-lembrete").value = "";
    document.getElementById("data-lembrete").value = "";
  }
  
  function renderizarLembretes() {
    const lista = document.getElementById("lista-lembretes");
    lista.innerHTML = "";
  
    lembretes.forEach(lembrete => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${lembrete.texto} - ${lembrete.horario.toLocaleString('pt-BR')}
        <button onclick="editarLembrete(${lembrete.id})">✏️</button>
        <button onclick="removerLembrete(${lembrete.id})">❌</button>
      `;
      lista.appendChild(li);
    });
  }
  
  function editarLembrete(id) {
    const lembrete = lembretes.find(l => l.id === id);
    if (!lembrete) return;
  
    const novoTexto = prompt("Editar lembrete:", lembrete.texto);
    const novaData = prompt("Editar data e hora (AAAA-MM-DDTHH:MM):", lembrete.horario.toISOString().slice(0,16));
  
    if (novoTexto && novaData) {
      lembrete.texto = novoTexto;
      lembrete.horario = new Date(novaData);
      lembrete.disparado = false;
      renderizarLembretes();
    }
  }
  
  function removerLembrete(id) {
    const index = lembretes.findIndex(l => l.id === id);
    if (index > -1) {
      lembretes.splice(index, 1);
      renderizarLembretes();
    }
  }
  
  function verificarLembretesPeriodicamente() {
    setInterval(() => {
      const agora = new Date();
      lembretes.forEach(lembrete => {
        if (!lembrete.disparado && agora >= lembrete.horario) {
          lembrete.disparado = true;
          notificarLembrete(lembrete.texto);
        }
      });
    }, 1000);
  }
  
  function notificarLembrete(texto) {
    const som = new Audio("https://www.soundjay.com/button/beep-07.wav");
    som.play();
  
    if (Notification.permission === "granted") {
      new Notification("🔔 Lembrete", {
        body: texto,
        icon: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png"
      });
    } else {
      alert("⏰ Lembrete: " + texto);
    }
  }
  
  function pedirPermissaoNotificacoes() {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }
  
  // Folhas
  const folhaSVG = "https://cdn-icons-png.flaticon.com/512/415/415733.png";
  
  function criarFolha() {
    const folha = document.createElement("img");
    folha.src = folhaSVG;
    folha.classList.add("folha");
  
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