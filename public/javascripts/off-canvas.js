const openBtn = document.getElementById('open-registration');
    const offcanvas = document.getElementById('offcanvas-register');
    const overlay = document.getElementById('offcanvas-overlay');
    const closeBtn = document.getElementById('close-registration');

    function openPanel() {
      offcanvas.classList.add('active');
      overlay.classList.add('active');
      offcanvas.setAttribute('aria-hidden', 'false');
      offcanvas.focus();
    }

    function closePanel() {
      offcanvas.classList.remove('active');
      overlay.classList.remove('active');
      offcanvas.setAttribute('aria-hidden', 'true');
    }

    openBtn.addEventListener('click', function(e){
      e.preventDefault();
      openPanel();
    });
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    document.addEventListener('keydown', function(e){
      if(e.key === "Escape" && offcanvas.classList.contains('active')){
        closePanel();
      }
    });

    document.querySelector('.register-form').addEventListener('submit', function(e){
      e.preventDefault();
      alert("Registration simulation complete!");
      closePanel();
    });