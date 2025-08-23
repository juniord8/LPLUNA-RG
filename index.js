// Substitua pelo número real (somente dígitos), ex.: 5591999999999
const WA_NUMBER = '5553997058349';

function sendWA(e){
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const servico = document.getElementById('servico').value;
  const quando = document.getElementById('quando').value.trim();
  const texto = `Olá, sou ${nome}. Gostaria de agendar uma avaliação para ${servico}. Melhor dia/horário: ${quando}.`;
  const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(texto)}`;

  // 🔹 Eventos do Pixel do Meta
  if (typeof fbq === 'function') {
    fbq('track', 'Lead'); // Marca como lead
    fbq('track', 'Contact', {content_name: 'WhatsApp'}); // Marca contato via WhatsApp
  }

  window.open(url, '_blank');
  return false;
}

// Atualiza link no rodapé
(function(){
  const wa = document.getElementById('waLink');
  if(wa && WA_NUMBER.startsWith('55')) wa.href = `https://wa.me/${WA_NUMBER}`;
})();
