document.addEventListener('DOMContentLoaded', () => {

    // ------------------------------------------------
    // 1. Animasi Penghitung Statistik (Hero Section)
    // ------------------------------------------------
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Semakin kecil, semakin cepat

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        let current = 0;
        const isDecimal = counter.innerText.includes('.');

        const updateCount = () => {
            const increment = target / speed;
            if (current < target) {
                current += increment;
                if (isDecimal) {
                    counter.innerText = current.toFixed(1);
                } else {
                    counter.innerText = Math.ceil(current);
                }
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    // Observer untuk menjalankan animasi saat Hero Section terlihat
    const heroObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Mulai saat 50% terlihat

    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // ------------------------------------------------
    // 2. Logika Tab Menu
    // ------------------------------------------------
    const menuGrid = document.querySelector('.menu-grid');
    const tabButtons = document.querySelectorAll('.tab-button');
    const menuItems = document.querySelectorAll('.menu-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');

            // Hapus kelas 'active' dari semua tombol dan item
            tabButtons.forEach(btn => btn.classList.remove('active'));
            menuItems.forEach(item => item.classList.remove('active'));

            // Tambahkan kelas 'active' ke tombol yang diklik
            e.target.classList.add('active');

            // Tampilkan item menu yang sesuai dengan kategori
            document.querySelectorAll(`.menu-${category}`).forEach(item => {
                item.classList.add('active');
            });
        });
    });

    // ------------------------------------------------
    // 3. Integrasi Pemesanan Menu ke WhatsApp (Tombol "Pesan Sekarang")
    // ------------------------------------------------
    document.querySelectorAll('.btn-order').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const itemName = e.target.getAttribute('data-item');
            const waNumber = '855962174640'; // Ganti dengan Nomor WhatsApp Restoran Anda
            const message = `Halo min, saya ingin memesan menu: *${itemName}*. Mohon konfirmasi ketersediaan dan total harga. Terima kasih.`;
            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(waLink, '_blank');
        });
    });

    // ------------------------------------------------
    // 4. Integrasi Pemesanan Catering ke WhatsApp (Tombol "Pesan Paket...")
    // ------------------------------------------------
    document.querySelectorAll('.btn-catering').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const packageName = e.target.getAttribute('data-package');
            const waNumber = '855962174640'; // Ganti dengan Nomor WhatsApp Restoran Anda
            const message = `Halo min, saya tertarik dengan *Paket Catering ${packageName}*. Bisakah saya mendapatkan detail dan prosedur lebih lanjut?`;
            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
            
            window.open(waLink, '_blank');
        });
    });

    // ------------------------------------------------
    // 5. Integrasi Form Kontak ke WhatsApp
    // ------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const waNumber = '855962174640'; // Ganti dengan Nomor WhatsApp Restoran Anda

            let waMessage = `*Pesan dari Website Restoran*\n\n`;
            waMessage += `Nama: ${name}\n`;
            waMessage += `No. HP: ${phone}\n`;
            waMessage += `Pesan: ${message}`;

            const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
            window.open(waLink, '_blank');

            // Reset form setelah submit
            contactForm.reset();
        });
    }

    // ------------------------------------------------
    // 6. Animasi Scroll (Reveal Section)
    // ------------------------------------------------
    const sections = document.querySelectorAll('section');

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.2 // Section terlihat 20% baru dianimasikan
    });

    sections.forEach(section => {
        // Abaikan Hero Section karena sudah pasti terlihat
        if (section.id !== 'hero') {
            scrollObserver.observe(section);
        } else {
            section.classList.add('visible'); // Tampilkan hero section langsung
        }
    });

});
