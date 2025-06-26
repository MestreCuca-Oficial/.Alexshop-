document.addEventListener('DOMContentLoaded', function () {
    // Soma dos produtos
    const checkboxes = document.querySelectorAll('.produto-checkbox');
    const listaValores = document.getElementById('lista-valores');
    const totalSoma = document.getElementById('total-soma');

    function atualizarSoma() {
        let total = 0;
        let valoresSelecionados = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const valor = parseFloat(cb.getAttribute('data-valor')) || 0;
                valoresSelecionados.push(` ${valor.toFixed(2)}kz`);
                total += valor;
            }
        });
        listaValores.innerHTML = valoresSelecionados.length > 0 ? valoresSelecionados.join(' + ') : 'Nenhum produto selecionado';
        totalSoma.textContent = `Total: ${total.toFixed(2)}kz`;
    }

    checkboxes.forEach(cb => cb.addEventListener('change', atualizarSoma));
    atualizarSoma(); // Atualiza ao carregar

    // WhatsApp
    const botaoWhatsapp = document.getElementById('botao-whatsapp');
    const campoId = document.getElementById('campo-id');
    const radios = document.querySelectorAll('input[name="forma-pagamento"]');

    function gerarMensagemWhatsapp() {
        // ID do usuário
        const id = campoId.value || '(não informado)';
        // Produtos selecionados
        let produtos = [];
        let total = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const label = cb.closest('.produto-card');
                const nome = label ? label.querySelector('span')?.textContent : '';
                const valor = parseFloat(cb.getAttribute('data-valor')) || 0;
                produtos.push(`${nome} (${valor.toFixed(2)}kz)`);
                total += valor;
            }
        });
        // Forma de pagamento
        let forma = '';
        radios.forEach(radio => {
            if (radio.checked) {
                const label = radio.closest('label');
                forma = label ? label.querySelector('span')?.textContent : radio.value;
            }
        });

        // Monta a mensagem
        let mensagem = `Olá! Quero comprar no AlexShop.\n`;
        mensagem += `ID: ${id}\n`;
        mensagem += `Forma de pagamento: ${forma}\n`;
        mensagem += `Produtos: ${produtos.length > 0 ? produtos.join(', ') : 'Nenhum selecionado'}\n`;
        mensagem += `Valor total: ${total.toFixed(2)}kz`;

        return encodeURIComponent(mensagem);
    }

    function atualizarLinkWhatsapp() {
        const numero = '+244954355425'; // Seu número
        const mensagem = gerarMensagemWhatsapp();
        botaoWhatsapp.href = `https://wa.me/${numero}?text=${mensagem}`;
    }

    // Atualiza o link sempre que algo mudar
    campoId.addEventListener('input', atualizarLinkWhatsapp);
    checkboxes.forEach(cb => cb.addEventListener('change', atualizarLinkWhatsapp));
    radios.forEach(radio => radio.addEventListener('change', atualizarLinkWhatsapp));

    atualizarLinkWhatsapp(); // Inicializa ao carregar
});