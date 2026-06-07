// =============================================
// SCRIPT.JS - VORTEX CREW - INTERATIVIDADE TOTAL
// =============================================

document.addEventListener("DOMContentLoaded", function() {

    console.log("✅ JavaScript carregado com sucesso!");

    // ------------------------------------------------------------
    // 1. ATIVA ANIMAÇÕES AOS
    // ------------------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out'
        });
    }

    // ------------------------------------------------------------
    // 2. CONTAGEM REGRESSIVA PARA 22/10/2026
    // ------------------------------------------------------------
    // DATA DA COMPETIÇÃO: 22 de Outubro de 2026 às 10:00
    // Mês em JavaScript é 0-index: Outubro = 9 (Janeiro=0, Fevereiro=1... Outubro=9)
    const dataViagem = new Date(2026, 9, 22, 10, 0, 0);
    const targetTime = dataViagem.getTime();

    function atualizarContador() {
        const agora = new Date().getTime();
        const distancia = targetTime - agora;

        if (distancia < 0) {
            document.getElementById("dias").innerHTML = "00";
            document.getElementById("horas").innerHTML = "00";
            document.getElementById("minutos").innerHTML = "00";
            document.getElementById("segundos").innerHTML = "00";
            console.log("🎉 COMPETIÇÃO NO CANADÁ COMEÇOU! 🎉");
            return;
        }

        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

        document.getElementById("dias").innerHTML = dias < 10 ? "0" + dias : dias;
        document.getElementById("horas").innerHTML = horas < 10 ? "0" + horas : horas;
        document.getElementById("minutos").innerHTML = minutos < 10 ? "0" + minutos : minutos;
        document.getElementById("segundos").innerHTML = segundos < 10 ? "0" + segundos : segundos;

        console.log("Contagem atualizada:", dias, "dias", horas, "horas");
    }

    atualizarContador();
    setInterval(atualizarContador, 1000);

    // ------------------------------------------------------------
    // 3. FORMULÁRIO DE CONTATO COM VALIDAÇÃO
    // ------------------------------------------------------------
    const contatoForm = document.getElementById("contato-form");
    const feedbackDiv = document.getElementById("form-feedback");
    const submitBtn = document.getElementById("submit-btn");

    if (contatoForm) {
        contatoForm.addEventListener("submit", function(event) {
            const nome = document.querySelector('input[name="nome"]')?.value.trim() || '';
            const email = document.querySelector('input[name="_replyto"]')?.value.trim() || '';
            const mensagem = document.querySelector('textarea[name="mensagem"]')?.value.trim() || '';

            if (!nome || !email || !mensagem) {
                event.preventDefault();
                if (feedbackDiv) {
                    feedbackDiv.className = "form-feedback erro";
                    feedbackDiv.textContent = "⚠️ Por favor, preencha todos os campos antes de enviar.";
                }
                if (!nome && document.querySelector('input[name="nome"]')) 
                    document.querySelector('input[name="nome"]').style.borderColor = "#f87171";
                if (!email && document.querySelector('input[name="_replyto"]')) 
                    document.querySelector('input[name="_replyto"]').style.borderColor = "#f87171";
                if (!mensagem && document.querySelector('textarea[name="mensagem"]')) 
                    document.querySelector('textarea[name="mensagem"]').style.borderColor = "#f87171";
                return;
            }

            if (feedbackDiv) {
                feedbackDiv.className = "form-feedback sucesso";
                feedbackDiv.textContent = "✅ Mensagem enviada com sucesso! Entraremos em contato em breve.";
            }
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Enviado com sucesso! ✓";
                submitBtn.style.background = "#22c55e";
            }
        });

        document.querySelectorAll('input, textarea').forEach(campo => {
            campo.addEventListener('input', function() {
                this.style.borderColor = "rgba(255, 255, 255, 0.2)";
            });
        });
    }

    // ------------------------------------------------------------
    // 4. BOTÃO VOLTAR AO TOPO
    // ------------------------------------------------------------
    const btnTopo = document.getElementById("btn-topo");
    if (btnTopo) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 300) {
                btnTopo.classList.add("visivel");
            } else {
                btnTopo.classList.remove("visivel");
            }
        });

        btnTopo.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ------------------------------------------------------------
    // 5. CARDS DE INTEGRANTES COM CLIQUE INTERATIVO
    // ------------------------------------------------------------
    const integranteCards = document.querySelectorAll("#integrantes .card");
    console.log("Cards de integrantes encontrados:", integranteCards.length);
    
    integranteCards.forEach(function(card) {
        card.addEventListener("click", function() {
            const nome = this.querySelector(".card-title")?.textContent || "Integrante";
            const cargo = this.querySelector("small")?.textContent || "Membro";
            alert(` ${nome} - ${cargo}\n\nGostou deste integrante? Faz parte da família Vortex Crew!`);
        });
        card.style.cursor = "pointer";
    });

    // ------------------------------------------------------------
    // 6. NAVEGAÇÃO SUAVE NO MENU
    // ------------------------------------------------------------
    const menuLinks = document.querySelectorAll('.menu-lista a[href^="#"]');
    menuLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const navbarHeight = document.querySelector(".navbar")?.offsetHeight || 0;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                window.scrollTo({ top: targetPosition, behavior: "smooth" });
            }
        });
    });

    // ------------------------------------------------------------
    // 7. EFEITO DE DIGITAÇÃO NA CAPA
    // ------------------------------------------------------------
    const tituloCapa = document.querySelector(".capa-conteudo h1");
    if (tituloCapa) {
        const textoOriginal = tituloCapa.textContent;
        tituloCapa.textContent = "";
        let indice = 0;
        const velocidadeDigitacao = 150;
        function digitar() {
            if (indice < textoOriginal.length) {
                tituloCapa.textContent += textoOriginal.charAt(indice);
                indice++;
                setTimeout(digitar, velocidadeDigitacao);
            } else {
                tituloCapa.style.borderRight = "3px solid #6d28d9";
                tituloCapa.style.animation = "piscar 0.8s infinite";
            }
        }
        setTimeout(digitar, 500);
    }

    // ------------------------------------------------------------
    // 8. DESTAQUE DA SEÇÃO ATIVA NO MENU
    // ------------------------------------------------------------
    const secoes = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", function() {
        let scrollAtual = window.scrollY;
        secoes.forEach(function(secao) {
            const secaoTop = secao.offsetTop - 100;
            const secaoAltura = secao.offsetHeight;
            const secaoId = secao.getAttribute("id");
            if (scrollAtual >= secaoTop && scrollAtual < secaoTop + secaoAltura) {
                document.querySelectorAll(".menu-lista a").forEach(function(link) {
                    link.classList.remove("ativo");
                });
                const linkAtivo = document.querySelector(`.menu-lista a[href="#${secaoId}"]`);
                if (linkAtivo) linkAtivo.classList.add("ativo");
            }
        });
    });

    // ------------------------------------------------------------
    // 9. ADICIONA ANIMAÇÕES CSS FALTANTES
    // ------------------------------------------------------------
    if (!document.querySelector('#animacoes-vortex')) {
        const style = document.createElement('style');
        style.id = 'animacoes-vortex';
        style.textContent = `
            @keyframes piscar {
                0%, 100% { border-color: #6d28d9; }
                50% { border-color: transparent; }
            }
            @keyframes cair {
                0% { top: -20px; transform: rotate(0deg); opacity: 1; }
                100% { top: 100vh; transform: rotate(360deg); opacity: 0; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes fadeOut {
                0% { opacity: 1; }
                70% { opacity: 1; }
                100% { opacity: 0; visibility: hidden; }
            }
            .menu-lista a.ativo {
                background: #6d28d9 !important;
                border-radius: 5px;
                color: #fff !important;
            }
        `;
        document.head.appendChild(style);
    }

});