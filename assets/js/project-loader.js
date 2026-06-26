(function () {
  'use strict';

  function getViewerElements() {
    let viewer = document.getElementById('project-viewer');
    const main = document.getElementById('main');

    if (!viewer && main) {
      viewer = document.createElement('article');
      viewer.id = 'project-viewer';
      viewer.innerHTML = [
        '<h2 class="major" id="project-viewer-title">Project Details</h2>',
        '<p class="project-viewer-toolbar"><a href="#projects">← Back to Project Categories</a></p>',
        '<div id="project-viewer-content"><p>Select a project from the project list to load the full write-up.</p></div>'
      ].join('');
      main.appendChild(viewer);
    }

    return {
      viewer: viewer,
      title: document.getElementById('project-viewer-title'),
      content: document.getElementById('project-viewer-content')
    };
  }

  function setProjectLinksToRealHref() {
    document.querySelectorAll('a.load-project[data-project]').forEach(function (link) {
      const projectPath = link.getAttribute('data-project');
      if (projectPath) {
        link.setAttribute('href', projectPath);
      }
    });
  }

  function showViewerArticle() {
    // HTML5 UP Dimension shows articles through the hash router in assets/js/main.js.
    if (window.location.hash !== '#project-viewer') {
      window.location.hash = 'project-viewer';
    } else {
      // If the hash is already set, ask the router to re-process it.
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    }
  }

  function prepareLoadedContent(container) {
    if (!container) return;

    container.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');

      if (img.classList.contains('gallery-trigger') && typeof window.openGallery === 'function') {
        img.addEventListener('click', function () {
          window.openGallery(this);
        });
      }
    });

    if (window.hljs) {
      container.querySelectorAll('pre code').forEach(function (block) {
        window.hljs.highlightElement(block);
      });
    }
  }

  async function loadProject(projectPath, projectTitle) {
    const elements = getViewerElements();

    if (!elements.viewer || !elements.content) {
      window.location.href = projectPath;
      return;
    }

    if (elements.title) {
      elements.title.textContent = projectTitle || 'Project Details';
    }

    elements.content.innerHTML = '<p>Loading project…</p>';
    showViewerArticle();

    try {
      const response = await fetch(projectPath, { cache: 'no-cache' });

      if (!response.ok) {
        throw new Error('HTTP ' + response.status + ' while loading ' + projectPath);
      }

      const html = await response.text();
      elements.content.innerHTML = html;
      prepareLoadedContent(elements.content);
      showViewerArticle();
    } catch (error) {
      console.error(error);
      elements.content.innerHTML = [
        '<p><strong>Project could not be loaded dynamically.</strong></p>',
        '<p>This usually happens when the site is opened directly from the file system instead of through a local server or Netlify.</p>',
        '<p><a href="' + projectPath + '">Open the project content directly</a></p>'
      ].join('');
    }
  }

  function bindProjectLinks() {
    setProjectLinksToRealHref();

    document.querySelectorAll('a.load-project[data-project]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        const projectPath = link.getAttribute('data-project');
        const projectTitle = link.getAttribute('data-title') || link.textContent.trim();

        if (!projectPath) return;

        // fetch() is blocked by most browsers when index.html is opened as file://.
        // In that case, let the real href open the fragment directly instead of doing nothing.
        if (window.location.protocol === 'file:') {
          return;
        }

        event.preventDefault();
        loadProject(projectPath, projectTitle);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', bindProjectLinks);
})();
