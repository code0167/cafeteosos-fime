'use strict';

// Los productos siguen visibles si JavaScript no está disponible.
const filtros = document.querySelector('.filtros');
const productos = [...document.querySelectorAll('.producto')];
filtros.hidden = false;
filtros.addEventListener('click', (evento) => {
  const boton = evento.target.closest('button[data-filtro]');
  if (!boton) return;
  const categoria = boton.dataset.filtro;
  filtros.querySelectorAll('button').forEach((item) => {
    item.setAttribute('aria-pressed', String(item === boton));
  });
  let visibles = 0;
  productos.forEach((producto) => {
    producto.hidden = categoria !== 'todos' && producto.dataset.categoria !== categoria;
    if (!producto.hidden) visibles += 1;
  });
  document.getElementById('estado-filtro').textContent = `${visibles} productos en ${boton.textContent.toLowerCase()}.`;
});

const formulario = document.getElementById('formulario-contacto');
const mensaje = document.getElementById('mensaje');
const estado = document.getElementById('estado-formulario');
formulario.querySelector('[type="submit"]').disabled = false;
mensaje.addEventListener('input', () => {
  mensaje.setCustomValidity('');
  document.getElementById('conteo').textContent = mensaje.value.length;
});
document.getElementById('nombre').addEventListener('input', (evento) => evento.target.setCustomValidity(''));
formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const nombre = document.getElementById('nombre');
  nombre.setCustomValidity(nombre.value.trim() ? '' : 'Escribe tu nombre.');
  mensaje.setCustomValidity(mensaje.value.trim() ? '' : 'Escribe tu mensaje.');
  if (!formulario.reportValidity()) return;
  const correo = document.getElementById('correo').value.trim();
  const tema = document.getElementById('tema').value;
  const borrador = `Hola, Cafeteosos FIME.\n\nSoy ${nombre.value.trim()}.\nTema: ${tema}\n\n${mensaje.value.trim()}${correo ? `\n\nCorreo de contacto: ${correo}` : ''}`;
  document.getElementById('texto-borrador').textContent = borrador;
  document.getElementById('borrador').hidden = false;
  estado.textContent = 'Borrador preparado. No se ha enviado ningún mensaje.';
});
document.getElementById('copiar').addEventListener('click', async () => {
  try {
    if (!navigator.clipboard) throw new Error('Portapapeles no disponible');
    await navigator.clipboard.writeText(document.getElementById('texto-borrador').textContent);
    estado.textContent = 'Mensaje copiado. Puedes pegarlo donde lo necesites.';
  } catch {
    estado.textContent = 'No se pudo copiar automáticamente. Selecciona el texto del borrador y cópialo manualmente.';
  }
});
