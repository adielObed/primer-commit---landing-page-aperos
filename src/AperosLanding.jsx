/**
 * AperosLanding.jsx
 * Componente React principal de la landing page de Aperos Puro Coleo.
 *
 * Uso:
 *   import AperosLanding from './AperosLanding';
 *   <AperosLanding />
 *
 * Dependencias:
 *   - react (hooks: useState, useEffect, useRef)
 *   - lucide-react (iconos SVG)
 *   - ./styles.css  (estilos globales)
 *
 * Nota: Asegúrate de incluir styles.css en tu entrypoint
 *       (main.jsx / index.js) o importarlo aquí directamente.
 */

import { useState, useEffect, useRef } from 'react';
import {
  ShoppingCart, Search, User, Heart, Menu, X,
  Star, ChevronLeft, ChevronRight,
  MapPin, Phone, Mail, MessageCircle,
  ChevronDown, Instagram, Facebook, ArrowRight,
} from 'lucide-react';
import './styles.css';

// ── Constantes de color (usadas en estilos inline puntuales) ──
const GOLD = '#d4af37';

// ── Datos ─────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1, badge: 'NUEVO', badgeColor: GOLD, badgeTextColor: '#000',
    name: 'Sombrero Pelo de Guama', price: '$450.000', oldPrice: null,
    desc: 'Auténtico sombrero llanero fabricado en pelo de guama de primera calidad.',
    rating: 4.5, reviews: 24, category: 'Sombreros',
    img: '/img/sombrero.jpeg',
  },
  {
    id: 2, badge: null, badgeColor: null, badgeTextColor: null,
    name: 'Silla de Coleo Profesional', price: '$2.800.000', oldPrice: null,
    desc: 'Diseñada para la alta competencia. Fuste anatómico garantizado por 10 años.',
    rating: 5, reviews: 18, category: 'Sillas de Montar',
    img: '/img/silla.jpeg',
  },
  {
    id: 3, badge: '-15% OFF', badgeColor: '#c0392b', badgeTextColor: '#fff',
    name: 'Botas Texanas Luxury', price: '$680.000', oldPrice: '$800.000',
    desc: 'Cuero de avestruz legítimo con bordados en hilo de seda. Comodidad todo el día.',
    rating: 4.5, reviews: 42, category: 'Botas',
    img: '/img/botascoti.jpeg',
  },
  {
    id: 4, badge: null, badgeColor: null, badgeTextColor: null,
    name: 'Freno Artesanal Plata', price: '$320.000', oldPrice: null,
    desc: 'Plata fina con acabados a mano. Pieza única de maestro talabartero.',
    rating: 5, reviews: 11, category: 'Frenos & Bocados',
    img: '/img/freno2.jpeg',
  },
  {
    id: 5, badge: 'EXCLUSIVO', badgeColor: GOLD, badgeTextColor: '#000',
    name: 'Gorra', price: '$185.000', oldPrice: null,
    desc: 'Tejido artesanal en cuero crudo, frescas y resistentes para el trabajo en llano.',
    rating: 4, reviews: 33, category: 'Cotizas',
    img: '/img/gorras.jpeg',
  },
  {
    id: 6, badge: null, badgeColor: null, badgeTextColor: null,
    name: 'Correas de cuero', price: '$95.000', oldPrice: null,
    desc: 'Herraje decorativo en latón bañado en oro para sillas de montar de lujo.',
    rating: 4.5, reviews: 9, category: 'Casqueras',
    img: '/img/correa.jpeg',
  },
];

const CATEGORIES_DATA = [
  { name: 'Sillas de Montar', count: 12, img: '/img/silla.jpeg' },
  { name: 'Botas & Cotizas',  count: 28, img: '/img/botas.jpeg' },
  { name: 'Frenos & Aperos',  count: 8,  img: '/img/freno.jpeg' },
  { name: 'Sombreros',        count: 24, img: '/img/sombreros.jpeg' },
];

const TESTIMONIALS_DATA = [
  {
    text: 'La calidad de la silla de montar superó mis expectativas. Se ajusta perfectamente al caballo y me da una estabilidad increíble en la manga de coleo.',
    name: 'Carlos Martínez', location: 'Villavicencio, Meta', rating: 5,
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  },
  {
    text: 'Compré un sombrero pelo de guama y es una joya. El servicio al cliente fue excelente, me ayudaron con la talla exacta. Recomendados 100%.',
    name: 'Ana Rodríguez', location: 'Yopal, Casanare', rating: 5,
    img: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop',
  },
  {
    text: 'Los aperos llegaron muy rápido a Bogotá. El cuero huele a calidad y los acabados son impecables. Definitivamente volveré a comprar.',
    name: 'Jorge López', location: 'Bogotá D.C.', rating: 4.5,
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
  },
];

const CATEGORY_TABS = [
  'Todos', 'Sombreros', 'Sillas de Montar',
  'Botas', 'Frenos & Bocados', 'Cotizas', 'Casqueras',
];

const SIDEBAR_CATS = [
  ['Sombreros', 24], ['Sillas de Montar', 12],
  ['Frenos & Bocados', 8], ['Cotizas', 15], ['Casqueras', 6],
];

const MATERIALS = ['Cuero Crudo', 'Fieltro Pelo', 'Plata & Oro'];

// ── Subcomponentes ─────────────────────────────────────────────

/** Renders a row of star icons */
function StarRating({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => {
        const filled = i <= Math.floor(rating);
        const half   = !filled && i === Math.ceil(rating) && !Number.isInteger(rating);
        return (
          <svg key={i} viewBox="0 0 24 24" width="14" height="14"
            fill={filled || half ? GOLD : 'none'}
            stroke={filled || half ? GOLD : '#333'}
            strokeWidth="2"
            style={half ? { clipPath: 'inset(0 50% 0 0)' } : {}}
          >
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
          </svg>
        );
      })}
    </div>
  );
}

/** Single product card */
function ProductCard({ product, onAddToCart, onAddToWish }) {
  return (
    <div className="product-card">
      <div className="product-img-wrap">
        <img src={product.img} alt={product.name} className="product-img" loading="lazy" />
        {product.badge && (
          <span
            className="product-badge"
            style={{ background: product.badgeColor, color: product.badgeTextColor }}
          >
            {product.badge}
          </span>
        )}
        <button className="product-wish" onClick={onAddToWish} aria-label="Favorito">
          <Heart size={16} color={GOLD} />
        </button>
        <button className="product-add-cart" onClick={onAddToCart}>
          <ShoppingCart size={16} />
          AGREGAR AL CARRITO
        </button>
      </div>
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <div className="product-row">
          <h3 className="product-name font-serif">{product.name}</h3>
          <div>
            {product.oldPrice && <div className="product-old-price">{product.oldPrice}</div>}
            <div className="product-price">{product.price}</div>
          </div>
        </div>
        <p className="product-desc">{product.desc}</p>
        <div className="product-stars">
          <StarRating rating={product.rating} />
          <span className="product-reviews">({product.reviews} reseñas)</span>
        </div>
      </div>
    </div>
  );
}

/** Single testimonial card */
function TestimonialCard({ testimonial }) {
  return (
    <div className="testimonial-card">
      <div className="testimonial-quote-bg">"</div>
      <div className="testimonial-stars">
        <StarRating rating={testimonial.rating} />
      </div>
      <p className="testimonial-text font-cormorant">"{testimonial.text}"</p>
      <div className="testimonial-author">
        <img src={testimonial.img} alt={testimonial.name} className="testimonial-avatar" loading="lazy" />
        <div>
          <div className="testimonial-name">{testimonial.name}</div>
          <div className="testimonial-place">{testimonial.location}</div>
        </div>
      </div>
    </div>
  );
}

/** Category card in the grid */
function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <img src={category.img} alt={category.name} className="cat-img" loading="lazy" />
      <div className="cat-info">
        <div className="cat-count-label">{category.count} productos</div>
        <div className="cat-name font-serif">{category.name}</div>
      </div>
      <div className="cat-arrow">
        <ArrowRight size={20} color={GOLD} />
      </div>
    </div>
  );
}

// ── Componente principal ───────────────────────────────────────

export default function AperosLanding() {
  // — State —
  const [scrolled,          setScrolled]          = useState(false);
  const [mobileMenuOpen,    setMobileMenuOpen]     = useState(false);
  const [activeCategory,    setActiveCategory]     = useState('Todos');
  const [selectedMaterials, setSelectedMaterials]  = useState([]);
  const [priceRange,        setPriceRange]         = useState(30);
  const [cartCount,         setCartCount]          = useState(3);
  const [wishCount,         setWishCount]          = useState(2);
  const [email,             setEmail]              = useState('');
  const [subscribed,        setSubscribed]         = useState(false);

  // — Refs —
  const sliderRef = useRef(null);

  // — Effects —
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll animation observer
  useEffect(() => {
    const els = document.querySelectorAll('.observe-anim');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity    = '1';
          e.target.style.transform  = 'translateY(0)';
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(24px)';
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // — Derived —
  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  // — Handlers —
  const addToCart = ()          => setCartCount(c => c + 1);
  const addToWish = ()          => setWishCount(c => c + 1);
  const clearFilters = ()       => { setActiveCategory('Todos'); setSelectedMaterials([]); setPriceRange(30); };
  const toggleMaterial = mat    => setSelectedMaterials(prev =>
    prev.includes(mat) ? prev.filter(m => m !== mat) : [...prev, mat]
  );
  const handleSubscribe = ()    => { if (email.includes('@')) setSubscribed(true); };
  const priceDisplay = ()       => '$' + (priceRange * 50000).toLocaleString('es-CO');

  // ── JSX ───────────────────────────────────────────────────────

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        {!scrolled && (
          <div className="topbar">
            <div style={{ display: 'flex', gap: 24 }}>
              <span>🚚 Envíos a toda Colombia y Venezuela</span>
              <span>📞 +57 321 8088933</span>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              <a href="#">Rastrear Pedido</a>
              <a href="#">Ayuda</a>
              <a href="#" className="text-gold">Español ▾</a>
            </div>
          </div>
        )}

        <nav className="navbar">
          <a href="#" style={{ display: 'flex', alignItems: 'center' }}>
            <span className="logo-text">APEROS</span>
            <span className="logo-text logo-text--gold">PURO COLEO</span>
          </a>

          <div className="nav-links">
            {['Inicio', 'Colecciones ▾', 'Artesanía', 'Nosotros'].map(l => (
              <a key={l} href="#" className="nav-link">{l}</a>
            ))}
          </div>

          <div className="nav-actions">
            <button className="nav-icon" aria-label="Buscar"><Search size={20} /></button>

            <div className="badge-wrap nav-icon">
              <Heart size={20} />
              <span className="badge">{wishCount}</span>
            </div>

            <div className="badge-wrap nav-icon">
              <ShoppingCart size={20} />
              <span className="badge">{cartCount}</span>
            </div>

            <button className="btn-gold btn-sm" onClick={addToCart} style={{ borderRadius: 4 }}>
              <ShoppingCart size={14} /> VER CARRITO
            </button>

            <button className="nav-icon" aria-label="Cuenta"><User size={20} /></button>

            <button
              className="mobile-menu-btn nav-icon"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Menú"
            >
              {mobileMenuOpen ? <X size={24} color={GOLD} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="mobile-nav open">
            {['Inicio', 'Colecciones', 'Artesanía', 'Nosotros'].map(l => (
              <div key={l} className="mobile-nav-item">{l}</div>
            ))}
          </div>
        )}
      </header>

      <main>
        {/* ===== HERO ===== */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-bg-img" />
          <div className="hero-gradient" />
          <div className="hero-line-top" />
          <div className="hero-line-bottom" />

          <div className="hero-content">
            <div className="hero-badge animate-fadeInUp anim-delay-1">
              <span className="hero-badge-dot" />
              <span className="hero-badge-text">Nueva Colección 2026</span>
            </div>

            <h1 className="hero-title font-serif animate-fadeInUp anim-delay-2">
              Te vestimos a ti{' '}
              <em className="gold-shimmer">y a tu caballo</em>
            </h1>

            <p className="hero-desc animate-fadeInUp anim-delay-3">
              Descubre nuestra exclusiva línea de sombreros vaqueros y aperos de alta gama.
              Artesanía tradicional fusionada con lujo contemporáneo para el verdadero conocedor.
            </p>

            <div className="hero-actions animate-fadeInUp anim-delay-4">
              <a href="#products" className="btn-gold btn-lg">VER COLECCIÓN</a>
              <a href="#craft"    className="btn-outline btn-lg">NUESTRA HISTORIA</a>
            </div>

            <div className="hero-social-proof animate-fadeInUp anim-delay-4">
              <div className="avatar-stack">
                {[
                  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
                  'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=50&h=50&fit=crop',
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
                ].map((src, i) => <img key={i} src={src} alt={`cliente ${i + 1}`} />)}
              </div>
              <div>
                <div className="social-stars">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} viewBox="0 0 24 24" width="12" height="12" fill={GOLD}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <span className="social-label">
                  Más de <strong>500</strong> jinetes satisfechos
                </span>
              </div>
            </div>
          </div>

          <div className="scroll-hint">
            <span>Scroll</span>
            <ChevronDown size={16} color={GOLD} className="float-anim" />
          </div>
        </section>

        {/* ===== LAYOUT PRINCIPAL ===== */}
        <div className="main-layout">

          {/* — Sidebar — */}
          <aside className="sidebar">
            <div className="sidebar-header">
              <span className="sidebar-title">Filtros</span>
              <span className="sidebar-clear" onClick={clearFilters}>Limpiar</span>
            </div>

            {/* Categorías */}
            <div className="filter-group">
              <div className="filter-group-title">Categorías</div>
              {SIDEBAR_CATS.map(([cat, count]) => (
                <div
                  key={cat}
                  className={`cat-item ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(activeCategory === cat ? 'Todos' : cat)}
                >
                  <span>{cat}</span>
                  <span className="cat-count">{count}</span>
                </div>
              ))}
            </div>

            {/* Precio */}
            <div className="filter-group">
              <div className="filter-group-title">Precio</div>
              <input
                ref={sliderRef}
                type="range" min={0} max={100}
                value={priceRange}
                onChange={e => setPriceRange(+e.target.value)}
                style={{
                  background: `linear-gradient(to right, ${GOLD} 0%, ${GOLD} ${priceRange}%, #333 ${priceRange}%)`
                }}
              />
              <div className="price-row">
                <span>$0</span>
                <span className="current">{priceDisplay()}</span>
                <span>$5.000.000+</span>
              </div>
            </div>

            {/* Material */}
            <div className="filter-group">
              <div className="filter-group-title">Material</div>
              {MATERIALS.map(mat => (
                <div
                  key={mat}
                  className={`material-item ${selectedMaterials.includes(mat) ? 'checked' : ''}`}
                  onClick={() => toggleMaterial(mat)}
                >
                  <div className="checkbox">
                    <span className="checkbox-check">✓</span>
                  </div>
                  {mat}
                </div>
              ))}
            </div>
          </aside>

          {/* — Contenido — */}
          <div className="main-content">

            {/* Categorías Esenciales */}
            <section className="categories-section observe-anim" id="categories">
              <div className="categories-header">
                <div>
                  <p className="section-eyebrow">Explora</p>
                  <h2 className="section-title">Categorías <span>Esenciales</span></h2>
                </div>
                <div className="categories-nav">
                  <button className="btn-outline btn-round"><ChevronLeft size={18} color={GOLD} /></button>
                  <button className="btn-gold btn-round"><ChevronRight size={18} /></button>
                </div>
              </div>
              <p className="categories-subtitle">
                Todo lo necesario para el trabajo de llano y el coleo competitivo.
              </p>
              <div className="categories-grid">
                {CATEGORIES_DATA.map(cat => <CategoryCard key={cat.name} category={cat} />)}
              </div>
            </section>

            {/* Productos Destacados */}
            <section className="products-section observe-anim" id="products">
              <div className="products-header">
                <div>
                  <p className="section-eyebrow">Selección Curada</p>
                  <h2 className="section-title">Productos <span>Destacados</span></h2>
                </div>
                <a href="#" className="products-see-all">
                  VER TODO <ArrowRight size={14} />
                </a>
              </div>

              <div className="category-tabs">
                {CATEGORY_TABS.map(tab => (
                  <button
                    key={tab}
                    className={`tab-btn ${activeCategory === tab ? 'active' : ''}`}
                    onClick={() => setActiveCategory(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="products-grid">
                {filteredProducts.map(p => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToCart={addToCart}
                    onAddToWish={addToWish}
                  />
                ))}
              </div>
            </section>

            {/* El Arte de la Talabartería */}
            <section className="craft-section observe-anim" id="craft">
              {/* Imagen con marco dorado */}
              <div className="craft-img-wrap">
                <div className="craft-frame-tl" />
                <div className="craft-frame-br" />
                <img
                  src="/img/talabarteria.jpeg"
                  alt="Artesano trabajando cuero"
                  className="craft-img"
                  loading="lazy"
                />
                <div className="craft-years">
                  <div className="craft-years-num font-serif">30+</div>
                  <div className="craft-years-label">AÑOS DE TRADICIÓN</div>
                </div>
              </div>

              {/* Texto */}
              <div>
                <p className="section-eyebrow">Herencia &amp; Tradición</p>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  El Arte de la<br />Talabartería Llanera
                </h2>
                <div className="section-divider" />

                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.9, marginBottom: 20 }}>
                  En{' '}
                  <em className="font-cormorant text-gold" style={{ fontSize: 17 }}>
                    Aperos Puro Coleo
                  </em>
                  , cada pieza cuenta una historia. Trabajamos con maestros artesanos que han
                  heredado técnicas centenarias de curtido y repujado.
                </p>
                <p style={{ color: '#888', fontSize: 14, lineHeight: 1.9, marginBottom: 36 }}>
                  No solo vendemos productos; preservamos una cultura. Desde la selección del
                  cuero más robusto hasta el último detalle en hilo de oro, garantizamos aperos
                  que resisten la faena más dura sin perder su elegancia.
                </p>

                <div className="craft-stats">
                  {[['500+', 'Jinetes satisfechos'], ['30+', 'Artesanos expertos'], ['100%', 'Cuero legítimo']].map(([n, l]) => (
                    <div key={l}>
                      <div className="craft-stat-num font-serif">{n}</div>
                      <div className="craft-stat-label">{l}</div>
                    </div>
                  ))}
                </div>

                <a href="#" className="craft-link">
                  CONOCE A NUESTROS ARTESANOS <ArrowRight size={14} />
                </a>
              </div>
            </section>

            {/* Testimonios */}
            <section className="testimonials-section observe-anim">
              <div className="testimonials-header">
                <p className="section-eyebrow">Clientes Satisfechos</p>
                <h2 className="section-title">La Voz del <span>Llanero</span></h2>
                <div className="section-divider section-divider--center" />
              </div>
              <div className="testimonials-grid">
                {TESTIMONIALS_DATA.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
              </div>
            </section>

            {/* Newsletter */}
            <div className="newsletter-section observe-anim">
              <div className="newsletter-circle-1" />
              <div className="newsletter-circle-2" />
              <div className="newsletter-inner">
                <p className="section-eyebrow">Comunidad Llanera</p>
                <h2 className="font-serif" style={{ fontSize: '2.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 16 }}>
                  Únete a la Comunidad
                </h2>
                <p className="newsletter-desc">
                  Recibe noticias sobre eventos de coleo, lanzamientos exclusivos y un{' '}
                  <strong>10% de descuento</strong> en tu primera compra.
                </p>

                {subscribed ? (
                  <div className="newsletter-success">✓ ¡Bienvenido a la familia llanera!</div>
                ) : (
                  <div className="newsletter-form">
                    <input
                      type="email"
                      className="newsletter-input"
                      placeholder="Tu correo electrónico"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                    />
                    <button className="btn-gold btn-md newsletter-btn" onClick={handleSubscribe}>
                      SUSCRIBIRSE
                    </button>
                  </div>
                )}
                <p className="newsletter-fine">Respetamos tu privacidad. Puedes cancelar en cualquier momento.</p>
              </div>
            </div>

          </div>{/* /main-content */}
        </div>{/* /main-layout */}

        {/* ===== FOOTER ===== */}
        <footer className="site-footer" id="footer">
          <div className="footer-grid">

            {/* Marca */}
            <div>
              <div style={{ marginBottom: 16 }}>
                <span className="logo-text">APEROS</span>
                <span className="logo-text logo-text--gold">PURO COLEO</span>
              </div>
              <p className="footer-brand-desc">
                Dedicados a preservar la elegancia y tradición de la cultura llanera a través de
                productos de talabartería de clase mundial.
              </p>
              <div className="footer-socials">
                <button className="footer-social-btn" aria-label="Instagram"><Instagram size={16} /></button>
                <button className="footer-social-btn" aria-label="Facebook"><Facebook size={16} /></button>
                <button className="footer-social-btn" aria-label="WhatsApp"><MessageCircle size={16} /></button>
              </div>
            </div>

            {/* Explorar */}
            <div>
              <h3 className="footer-col-title">Explorar</h3>
              {['Nuestra Historia', 'Catálogo Completo', 'Blog del Llanero', 'Eventos & Coleo'].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>

            {/* Ayuda */}
            <div>
              <h3 className="footer-col-title">Ayuda</h3>
              {['Rastrear Pedido', 'Envíos y Devoluciones', 'Guía de Tallas', 'Cuidado del Cuero', 'Preguntas Frecuentes'].map(l => (
                <a key={l} href="#" className="footer-link">{l}</a>
              ))}
            </div>

            {/* Contacto */}
            <div>
              <h3 className="footer-col-title">Contacto</h3>
              <div className="footer-contact-item">
                <MapPin size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">Cra. 23 #7 66,<br />Yopal, Colombia</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} className="footer-contact-icon" />
                <span className="footer-contact-text">+57 321 8088933</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} className="footer-contact-icon" />
                <span className="footer-contact-text"></span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span className="footer-copy">© 2026 Aperos Puro Coleo. Todos los derechos reservados.</span>
            <div className="footer-legal">
              {['Privacidad', 'Términos', 'Cookies'].map(l => <a key={l} href="#">{l}</a>)}
            </div>
          </div>
        </footer>

      </main>

      {/* ===== WHATSAPP FAB ===== */}
      <a
        href="https://wa.me/573218088933"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Contactar por WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </>
  );
}
