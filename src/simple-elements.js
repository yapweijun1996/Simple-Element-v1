/**
 * Simple Elements Admin Panel JavaScript
 * Handles sidebar functionality, mobile responsiveness, and page-specific features
 */

import './simple-elements.css';
import './design-system.css';

// Sidebar functionality
document.addEventListener('DOMContentLoaded', function () {
  // Load sidebar
  loadSidebar();

  // Initialize mobile sidebar
  initMobileSidebar();

  // Set active page in sidebar
  setActivePage();
});

/**
 * Loads the sidebar HTML into the page
 */
async function loadSidebar() {
  try {
    const response = await fetch('sidebar.html');
    const sidebarHtml = await response.text();
    const sidebarContainer = document.querySelector('.admin-sidebar');
    if (sidebarContainer) {
      sidebarContainer.innerHTML = sidebarHtml;
    }
  } catch (error) {
    console.error('Error loading sidebar:', error);
  }
}

/**
 * Initializes mobile sidebar functionality
 */
function initMobileSidebar() {
  const sidebar = document.querySelector('.admin-sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  if (!sidebar || !toggleBtn) return;

  // Set initial state
  checkSidebarToggle();

  // Add event listeners
  toggleBtn.addEventListener('click', function () {
    const isHidden = sidebar.style.display === 'none';
    sidebar.style.display = isHidden ? '' : 'none';
    toggleBtn.setAttribute('aria-expanded', !isHidden);
  });

  window.addEventListener('resize', checkSidebarToggle);
}

/**
 * Checks and updates sidebar visibility based on screen size
 */
function checkSidebarToggle() {
  const sidebar = document.querySelector('.admin-sidebar');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  if (!sidebar || !toggleBtn) return;

  if (window.innerWidth <= 900) {
    toggleBtn.style.display = 'block';
    sidebar.style.display = 'none';
    toggleBtn.setAttribute('aria-expanded', 'false');
  } else {
    toggleBtn.style.display = 'none';
    sidebar.style.display = '';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Sets the active page in the sidebar based on current URL
 */
function setActivePage() {
  const currentPage = window.location.pathname
    .split('/')
    .pop()
    .replace('.html', '');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  sidebarLinks.forEach((link) => {
    const linkPage = link.getAttribute('data-page');
    if (
      linkPage === currentPage ||
      (currentPage === '' && linkPage === 'dashboard')
    ) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}
