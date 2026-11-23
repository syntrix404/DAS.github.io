const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
});

navigation.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-subject]').forEach(link => {
  link.addEventListener('click', () => {
    const category = document.querySelector('#category');
    const subject = link.dataset.subject;
    if (subject.includes('EPI')) category.value = 'Équipements de protection individuelle (EPI)';
    else if (subject.includes('informatique')) category.value = 'Matériel informatique';
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

document.querySelector('#quoteForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Demande de devis – DAS – ${form.get('category')}`);
  const body = encodeURIComponent(
    `Bonjour DAS,

Je souhaite obtenir des informations / un devis.

Nom : ${form.get('name')}
E-mail : ${form.get('email')}
Téléphone : ${form.get('phone') || 'Non renseigné'}
Besoin : ${form.get('category')}

Message :
${form.get('message')}

Cordialement,
${form.get('name')}`
  );
  document.querySelector('#formFeedback').textContent = 'Votre application e-mail va s’ouvrir avec votre demande préremplie.';
  window.location.href = `mailto:dalmeidaraphael@yahoo.fr?subject=${subject}&body=${body}`;
});
