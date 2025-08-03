import type { Pokemon } from './interfaces';

export function downloadLikesPokemonsV(liked: Pokemon[]) {
  if (!liked.length) return;

  const rows = liked.map((p) => [
    `ID: ${p.id}`,
    `Name: ${p.name}`,
    `Type: ${p.types}`,
    `Experience: ${p.experience}`,
    `Image: ${p.img}`,
  ]);

  const csvContent = [...rows.map((row) => row.join(', '))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const filename = `${liked.length}_item${liked.length > 1 ? 's' : ''}.csv`;

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
