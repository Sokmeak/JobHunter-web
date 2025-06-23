<template>
  <main class="main-content">
    <DashboardHeader />
    <div class="dashboard-grid">
      <StatCards ref="statCardsContainer" />
      <div class="dashboard-sections">
        <RecentActivity />
        <PendingApprovals />
      </div>
    </div>
  </main>
</template>

<script setup>
import { provide, ref, inject, onMounted, nextTick } from "vue"; // Ajout de nextTick
import DashboardHeader from "@/components/Admin/Dashboard/DashboardHeader.vue";
import StatCards from "@/components/Admin/Dashboard/StatCards.vue";
import RecentActivity from "@/components/Admin/Dashboard/RecentActivity.vue";
import PendingApprovals from "@/components/Admin/Dashboard/PendingApprovals.vue";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const dashboardData = {
  username: "Admin",
  today: new Date().toLocaleDateString(),
};
provide("dashboardData", dashboardData);

const selectedDate = ref(new Date());
provide('selectedDate', selectedDate);

const statCardsContainer = ref(null);


/*EXPORT FUNCTION*/
const exportStatCardsToPdf = async () => {
  if (!statCardsContainer.value || !statCardsContainer.value.$el) {
    console.error("Le conteneur des StatCards n'est pas trouvé ou n'est pas un élément DOM.");
    return;
  }

  const elementToCapture = statCardsContainer.value.$el;

  // --- Améliorations pour html2canvas ---
  const canvas = await html2canvas(elementToCapture, {
    scale: 3, // Augmenter la résolution pour une meilleure netteté (peut être 2, 3 ou plus)
    useCORS: true,
    logging: false, // Désactiver les logs après le débogage
    ignoreElements: (element) => {
      return element.tagName === 'svg' || (element.tagName === 'IMG' && !element.complete);
    },
    backgroundColor: '#ffffff', // S'assurer d'un fond blanc pour le PDF
    // scrollY: -window.scrollY, // Peut aider si le scroll pose problème, mais souvent pas nécessaire
    // windowWidth: document.documentElement.offsetWidth, // Peut aider à gérer la largeur de la fenêtre
    // windowHeight: document.documentElement.offsetHeight, // Peut aider à gérer la hauteur de la fenêtre
  });

  const imgData = canvas.toDataURL('image/png');

  // --- Améliorations pour jsPDF ---
  const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' portrait, 'mm' millimètres, 'a4' format
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  // Définir les marges (en mm)
  const margin = 10;
  const contentWidth = pdfWidth - (margin * 2);
  const contentHeight = pdfHeight - (margin * 2);

  // Calculer la hauteur de l'image proportionnellement à la largeur du contenu PDF
  const imgAspectRatio = canvas.width / canvas.height;
  let imgPdfWidth = contentWidth;
  let imgPdfHeight = contentWidth / imgAspectRatio;

  // Si l'image est plus grande que la page, ajuster la taille pour qu'elle tienne
  if (imgPdfHeight > contentHeight) {
    imgPdfHeight = contentHeight;
    imgPdfWidth = contentHeight * imgAspectRatio;
  }

  // Centrer l'image
  const x = margin + (contentWidth - imgPdfWidth) / 2;
  let y = margin; // Position de départ après l'en-tête (si on en ajoute un)

  // --- Ajout d'un titre au PDF (optionnel mais recommandé pour la clarté) ---
  const title = "Dashboard Statistics Report";
  pdf.setFontSize(18);
  pdf.text(title, pdfWidth / 2, margin + 10, { align: 'center' }); // Centré, 10mm après la marge haute
  y += 20; // Décaler le contenu sous le titre

  // --- Ligne de séparation sous le titre (optionnel) ---
  pdf.setLineWidth(0.2);
  pdf.line(margin, y - 5, pdfWidth - margin, y - 5); // Dessine une ligne
  y += 5; // Espace après la ligne

  // Gérer les pages multiples si le contenu dépasse (peu probable pour les StatCards seuls, mais bonne pratique)
  let heightLeft = imgPdfHeight;
  let currentY = y; // Position Y pour le contenu actuel sur la page

  if (imgPdfHeight > pdfHeight - y - margin) { // Si l'image dépasse la première page disponible
    // Pour cet exemple, comme on exporte un petit bloc (StatCards), on le met sur la première page.
    // Si tu devais exporter une très longue section, la logique de pagination serait plus complexe.
    // Pour des stat cards, l'idée est de les faire tenir sur une seule page.
    // Si elles débordent, c'est que leur rendu original est trop grand.
    pdf.addImage(imgData, 'PNG', x, currentY, imgPdfWidth, imgPdfHeight);
  } else {
    pdf.addImage(imgData, 'PNG', x, currentY, imgPdfWidth, imgPdfHeight);
  }

  // --- Ajout d'un pied de page (optionnel) ---
  pdf.setFontSize(10);
  pdf.setTextColor(150); // Gris
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  pdf.text(`Generated on: ${currentDate}`, margin, pdfHeight - margin);
  pdf.text(`Page 1 of 1`, pdfWidth - margin, pdfHeight - margin, { align: 'right' }); // Pour une seule page

  // Sauvegarde le PDF
  pdf.save(`dashboard-stats-${new Date().toISOString().slice(0, 10)}.pdf`);
};

provide('exportStatCardsToPdf', exportStatCardsToPdf);
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
}

.app-container {
  display: flex;
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-content {
  flex: 1;
  padding: 1rem 1rem;
  overflow-y: auto;
}

.dashboard-grid {
  margin-top: 20px;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 1024px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
}
</style>
