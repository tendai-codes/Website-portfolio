(() => {
    const PROJECT_RETURN_KEY = 'projectsReturnUrl';

  const rememberProjectsReturnUrl = () => {
    const isProjectsPage =
      window.location.pathname === '/projects/' ||
      window.location.pathname === '/projects';

    if (!isProjectsPage) {
      return;
    }

    const returnUrl =
      `${window.location.pathname}` +
      `${window.location.search}` +
      `${window.location.hash}`;

    try {
      sessionStorage.setItem(
        PROJECT_RETURN_KEY,
        returnUrl
      );
    } catch (_) {}
  };

  /*
   * ============================================================
   * PROJECT IMAGE LIGHTBOX / GALLERY
   * ============================================================
   */

  const openLightbox = (img) => {
    const existing = document.querySelector('.lightbox');

    if (existing) {
      existing.remove();
    }

    const gallery = img.closest('.image-gallery');

    const images = gallery
      ? [...gallery.querySelectorAll('img.gallery-trigger')]
      : [img];

    if (!images.length) {
      return;
    }

    let currentIndex = Math.max(0, images.indexOf(img));

    const dialog = document.createElement('dialog');
    dialog.className = 'lightbox';

    const frame = document.createElement('div');
    frame.className = 'lightbox-frame';

    /*
     * Close button
     */
    const close = document.createElement('button');
    close.className = 'lightbox-close';
    close.type = 'button';
    close.setAttribute('aria-label', 'Close image gallery');
    close.textContent = '×';

    /*
     * Previous image button
     */
    const previous = document.createElement('button');
    previous.className = 'lightbox-nav lightbox-prev';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Previous image');
    previous.textContent = '‹';

    /*
     * Next image button
     */
    const next = document.createElement('button');
    next.className = 'lightbox-nav lightbox-next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Next image');
    next.textContent = '›';

    /*
     * Full-resolution image
     */
    const full = document.createElement('img');
    full.decoding = 'async';

    /*
     * Footer
     */
    const footer = document.createElement('div');
    footer.className = 'lightbox-footer';

    const caption = document.createElement('p');
    caption.className = 'lightbox-caption';

    const counter = document.createElement('span');
    counter.className = 'lightbox-counter';
    counter.setAttribute('aria-live', 'polite');

    footer.append(caption, counter);

    frame.append(
      close,
      previous,
      full,
      next,
      footer
    );

    dialog.appendChild(frame);

    /*
     * Resolve the best/full-resolution source for a gallery image.
     */
    const getFullSource = (image) =>
      image.dataset.full ||
      image.currentSrc ||
      image.src;

    /*
     * Preload neighbouring images after showing the current one.
     *
     * Normal project pages continue to use lightweight thumbnails.
     * Full-resolution files are only requested once the lightbox is used.
     */
    const preloadNeighbours = () => {
      if (images.length <= 1) {
        return;
      }

      const nextImage =
        images[(currentIndex + 1) % images.length];

      const previousImage =
        images[
          (currentIndex - 1 + images.length) %
            images.length
        ];

      [nextImage, previousImage].forEach((image) => {
        const preload = new Image();
        preload.src = getFullSource(image);
      });
    };

    /*
     * Display one gallery image.
     */
    const showImage = (index) => {
      if (!images.length) {
        return;
      }

      /*
       * Wrap navigation:
       *
       * previous from image 1 → final image
       * next from final image → image 1
       */
      currentIndex =
        (index + images.length) % images.length;

      const current = images[currentIndex];

      full.src = getFullSource(current);
      full.alt = current.alt || '';

      const captionText =
        current.dataset.caption ||
        current
          .closest('figure')
          ?.querySelector('figcaption')
          ?.textContent
          ?.trim() ||
        '';

      caption.textContent = captionText;

      counter.textContent =
        images.length > 1
          ? `${currentIndex + 1} / ${images.length}`
          : '';

      dialog.setAttribute(
        'aria-label',
        captionText ||
          current.alt ||
          'Project figure'
      );

      const multipleImages = images.length > 1;

      previous.hidden = !multipleImages;
      next.hidden = !multipleImages;

      preloadNeighbours();
    };

    const showPrevious = () => {
      showImage(currentIndex - 1);
    };

    const showNext = () => {
      showImage(currentIndex + 1);
    };

    /*
     * Close button
     */
    close.addEventListener('click', () => {
      dialog.close();
    });

    /*
     * Arrow buttons
     */
    previous.addEventListener('click', (event) => {
      event.stopPropagation();
      showPrevious();
    });

    next.addEventListener('click', (event) => {
      event.stopPropagation();
      showNext();
    });

    /*
     * Keyboard navigation
     *
     * ← Previous
     * → Next
     * Escape Close
     */
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      }

      if (event.key === 'Escape') {
        dialog.close();
      }
    });

    /*
     * Swipe navigation for phones/tablets.
     */
    let touchStartX = null;

    dialog.addEventListener(
      'touchstart',
      (event) => {
        touchStartX =
          event.changedTouches[0]?.clientX ?? null;
      },
      {
        passive: true,
      }
    );

    dialog.addEventListener(
      'touchend',
      (event) => {
        if (touchStartX === null) {
          return;
        }

        const touchEndX =
          event.changedTouches[0]?.clientX ??
          touchStartX;

        const distance = touchEndX - touchStartX;

        /*
         * Ignore small accidental movements.
         */
        if (Math.abs(distance) > 50) {
          if (distance > 0) {
            showPrevious();
          } else {
            showNext();
          }
        }

        touchStartX = null;
      },
      {
        passive: true,
      }
    );

    /*
     * Clicking outside the image frame closes the gallery.
     */
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    /*
     * Clean the lightbox DOM after closing.
     */
    dialog.addEventListener('close', () => {
      dialog.remove();
    });

    document.body.appendChild(dialog);

    /*
     * Populate before opening to avoid an empty dialog flash.
     */
    showImage(currentIndex);

    dialog.showModal();

    close.focus();
  };

  /*
   * ============================================================
   * SITE INITIALISATION
   * ============================================================
   *
   * Called on:
   *
   * 1. Initial browser load
   * 2. Every Astro ClientRouter page transition
   */

  const initSite = () => {
    const root = document.documentElement;
    /*
     * ==========================================================
     * PROJECT RETURN LOCATION
     * ==========================================================
     *
     * Remember the current Projects page, including its filter.
     */
    rememberProjectsReturnUrl();

    /*
     * Update project-detail Back links so they return to the
     * previous Projects listing rather than always /projects/.
     */
    document
      .querySelectorAll('[data-project-back]')
      .forEach((link) => {
        let returnUrl = '/projects/';

        try {
          returnUrl =
            sessionStorage.getItem(
              PROJECT_RETURN_KEY
            ) || '/projects/';
        } catch (_) {}

        link.setAttribute('href', returnUrl);
      });
    /*
     * ==========================================================
     * THEME TOGGLE
     * ==========================================================
     *
     * The FIRST-VISIT default is controlled in BaseLayout.astro.
     * This section only handles switching and saving preferences.
     */

    document
      .querySelectorAll('[data-theme-toggle]')
      .forEach((button) => {
        if (button.dataset.bound === 'true') {
          return;
        }

        button.dataset.bound = 'true';

        button.addEventListener('click', () => {
          const nextTheme =
            root.dataset.theme === 'dark'
              ? 'light'
              : 'dark';

          root.dataset.theme = nextTheme;

          try {
            localStorage.setItem(
              'theme',
              nextTheme
            );
          } catch (_) {
            /*
             * The theme still changes for the current
             * page even if storage is unavailable.
             */
          }
        });
      });

    /*
     * ==========================================================
     * MOBILE NAVIGATION
     * ==========================================================
     */

    const menu = document.querySelector(
      '[data-mobile-nav]'
    );

    const menuButton = document.querySelector(
      '[data-menu-toggle]'
    );

    if (
      menuButton &&
      menuButton.dataset.bound !== 'true'
    ) {
      menuButton.dataset.bound = 'true';

      menuButton.addEventListener('click', () => {
        menu?.classList.toggle('open');
      });
    }

    menu?.querySelectorAll('a').forEach((link) => {
      if (link.dataset.bound === 'true') {
        return;
      }

      link.dataset.bound = 'true';

      link.addEventListener('click', () => {
        menu.classList.remove('open');
      });
    });

    /*
     * ==========================================================
     * PROJECT / ARTICLE FILTERING
     * ==========================================================
     *
     * The active filter is persisted in the URL:
     *
     * /projects/?filter=Machine%20Learning
     *
     * This means:
     *
     * Projects
     * → Machine Learning
     * → open project
     * → browser Back
     * → Machine Learning remains selected
     */

    document
      .querySelectorAll('[data-filter-group]')
      .forEach((group) => {
        if (group.dataset.bound === 'true') {
          return;
        }

        group.dataset.bound = 'true';

        const selector =
          group.getAttribute('data-target');

        if (!selector) {
          return;
        }

        const buttons = [
          ...group.querySelectorAll(
            '[data-filter]'
          ),
        ];

        const applyFilter = (
          value,
          updateUrl = false
        ) => {
          /*
           * Only accept filter values represented
           * by a real filter button.
           */
          const validButton = buttons.find(
            (button) =>
              button.getAttribute(
                'data-filter'
              ) === value
          );

          const selectedValue = validButton
            ? value
            : 'All';

          /*
           * Update active filter button.
           */
          buttons.forEach((button) => {
            const buttonValue =
              button.getAttribute(
                'data-filter'
              );

            button.classList.toggle(
              'active',
              buttonValue === selectedValue
            );

            button.setAttribute(
              'aria-pressed',
              buttonValue === selectedValue
                ? 'true'
                : 'false'
            );
          });

          /*
           * Show/hide cards.
           */
          document
            .querySelectorAll(selector)
            .forEach((card) => {
              const category =
                card.getAttribute(
                  'data-category'
                );

              const shouldHide =
                selectedValue !== 'All' &&
                category !== selectedValue;

              card.classList.toggle(
                'is-hidden',
                shouldHide
              );
            });

          /*
           * Persist the selected filter in the URL.
           *
           * We preserve history.state because Astro
           * may use it internally for navigation and
           * scroll restoration.
           */
          if (updateUrl) {
            const url = new URL(
              window.location.href
            );

            if (selectedValue === 'All') {
              url.searchParams.delete(
                'filter'
              );
            } else {
              url.searchParams.set(
                'filter',
                selectedValue
              );
            }

            history.replaceState(
              history.state,
              '',
              url
            );
            
            rememberProjectsReturnUrl();
          }
        };

        /*
         * Restore filter from URL whenever this page
         * is loaded or restored through Astro.
         */
        const params = new URLSearchParams(
          window.location.search
        );

        const initialFilter =
          params.get('filter') || 'All';

        applyFilter(initialFilter);

        /*
         * Bind buttons.
         */
        buttons.forEach((button) => {
          button.addEventListener(
            'click',
            () => {
              const value =
                button.getAttribute(
                  'data-filter'
                ) || 'All';

              applyFilter(value, true);
            }
          );
        });
      });

    /*
     * ==========================================================
     * COPY ARTICLE / PROJECT LINK
     * ==========================================================
     */

    document
      .querySelectorAll('[data-copy-link]')
      .forEach((button) => {
        if (button.dataset.bound === 'true') {
          return;
        }

        button.dataset.bound = 'true';

        button.addEventListener(
          'click',
          async (event) => {
            event.preventDefault();

            try {
              await navigator.clipboard.writeText(
                window.location.href
              );

              const original =
                button.textContent;

              button.textContent = 'Copied';

              setTimeout(() => {
                button.textContent =
                  original;
              }, 1400);
            } catch (_) {
              /*
               * Clipboard may be unavailable in
               * insecure/local contexts.
               */
            }
          }
        );
      });

    /*
     * ==========================================================
     * READING PROGRESS
     * ==========================================================
     */

    if (window.__readingProgressHandler) {
      window.removeEventListener(
        'scroll',
        window.__readingProgressHandler
      );

      window.__readingProgressHandler =
        null;
    }

    const progress = document.querySelector(
      '[data-reading-progress]'
    );

    if (progress) {
      const updateProgress = () => {
        const scrollableHeight =
          document.documentElement
            .scrollHeight -
          window.innerHeight;

        const percentage =
          scrollableHeight > 0
            ? Math.min(
                100,
                Math.max(
                  0,
                  (window.scrollY /
                    scrollableHeight) *
                    100
                )
              )
            : 0;

        progress.style.width =
          `${percentage}%`;
      };

      window.__readingProgressHandler =
        updateProgress;

      window.addEventListener(
        'scroll',
        updateProgress,
        {
          passive: true,
        }
      );

      updateProgress();
    }

    /*
     * ==========================================================
     * PROJECT FIGURE LAYOUT
     * ==========================================================
     *
     * Figure classes are derived from dimensions/content
     * so charts, screenshots and tall figures can be treated
     * differently by CSS.
     */

    document
      .querySelectorAll(
        '.project-prose .image-gallery'
      )
      .forEach((gallery) => {
        const figures = [
          ...gallery.querySelectorAll(
            ':scope > figure'
          ),
        ];

        gallery.classList.toggle(
          'gallery-large',
          figures.length >= 6
        );

        gallery.classList.toggle(
          'gallery-single',
          figures.length === 1
        );

        figures.forEach((figure) => {
          const img =
            figure.querySelector('img');

          if (!img) {
            return;
          }

          figure.classList.remove(
            'media-document',
            'media-tall',
            'media-standard'
          );

          const width =
            Number(
              img.getAttribute('width')
            ) || 0;

          const height =
            Number(
              img.getAttribute('height')
            ) || 0;

          const ratio =
            width && height
              ? width / height
              : 1;

          const text = `${
            img.getAttribute('alt') || ''
          } ${
            img.dataset.caption || ''
          }`.toLowerCase();

          /*
           * Tables/results/output screenshots and
           * very wide figures use document treatment.
           */
          if (
            /table|data frame|dataframe|evaluation|results|metrics|output/.test(
              text
            ) ||
            ratio >= 2
          ) {
            figure.classList.add(
              'media-document'
            );
          } else if (ratio < 0.8) {
            figure.classList.add(
              'media-tall'
            );
          } else {
            figure.classList.add(
              'media-standard'
            );
          }
        });
      });

    /*
     * ==========================================================
     * PROJECT IMAGE LIGHTBOX BINDING
     * ==========================================================
     */

    document
      .querySelectorAll(
        '.project-prose img.gallery-trigger'
      )
      .forEach((img) => {
        if (img.dataset.bound === 'true') {
          return;
        }

        img.dataset.bound = 'true';

        img.style.cursor = 'zoom-in';

        img.tabIndex = 0;

        img.setAttribute(
          'role',
          'button'
        );

        img.setAttribute(
          'aria-label',
          `${
            img.alt || 'Project figure'
          } — open full resolution`
        );

        img.addEventListener(
          'click',
          () => {
            openLightbox(img);
          }
        );

        img.addEventListener(
          'keydown',
          (event) => {
            if (
              event.key === 'Enter' ||
              event.key === ' '
            ) {
              event.preventDefault();
              openLightbox(img);
            }
          }
        );
      });
  };

  /*
   * ============================================================
   * INITIAL PAGE LOAD
   * ============================================================
   */

  initSite();

  /*
   * ============================================================
   * ASTRO CLIENTROUTER NAVIGATION
   * ============================================================
   *
   * Astro can swap page content without performing a complete
   * browser refresh.
   *
   * Re-run the initializer after every page transition so:
   *
   * - project filters work
   * - filter state restores
   * - lightboxes work
   * - reading progress works
   * - theme controls work
   * - mobile navigation works
   */

  document.addEventListener(
    'astro:page-load',
    initSite
  );
})();