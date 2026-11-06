import { useMemo, useState } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react'
import {
  Link,
  NavLink,
  Route,
  Routes,
  useNavigate,
  useParams,
} from 'react-router-dom'

type Product = {
  id: number
  name: string
  category: string
  price: number
  image: string
  tag?: string
  color: string
  colorHex: string
  sizes: string[]
  description: string
}

type CartItem = {
  product: Product
  size: string
  quantity: number
}

const products: Product[] = [
  {
    id: 1,
    name: 'Camiseta Move Studio',
    category: 'Camisetas',
    price: 189,
    image: 'photo-1521572163474-6864f9cf17ab',
    tag: 'Mais vendido',
    color: 'Off-white',
    colorHex: '#e9e6df',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Um essencial reinventado. Algodão macio de toque premium, corte relaxado e um caimento que acompanha você do treino ao próximo destino.',
  },
  {
    id: 2,
    name: 'Jaqueta Pace Shell',
    category: 'Jaquetas',
    price: 489,
    image: 'photo-1551028719-00167b16eac5',
    tag: 'Novo',
    color: 'Areia',
    colorHex: '#c4b8a5',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Leve, funcional e pronta para qualquer previsão. A camada essencial para começar cedo e terminar longe.',
  },
  {
    id: 3,
    name: 'Calça Form Track',
    category: 'Calças',
    price: 329,
    image: 'photo-1503341455253-b2e723bb3dbb',
    tag: 'Novo',
    color: 'Preto',
    colorHex: '#242522',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Movimento sem distrações. Tecido leve, cintura confortável e linhas limpas para uma silhueta atlética.',
  },
  {
    id: 4,
    name: 'Top Studio Flex',
    category: 'Tops',
    price: 219,
    image: 'photo-1503342217505-b0a15ec3261c',
    color: 'Verde oliva',
    colorHex: '#78806b',
    sizes: ['PP', 'P', 'M', 'G'],
    description: 'Suporte na medida certa, liberdade em todos os ângulos. Feito para acompanhar seu ritmo sem perder o conforto.',
  },
  {
    id: 5,
    name: 'Moletom Ground',
    category: 'Moletons',
    price: 379,
    image: 'photo-1556821840-3a63f95609a7',
    color: 'Cinza mescla',
    colorHex: '#aaa9a4',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Seu novo ponto de partida. Interior macio, proporção contemporânea e conforto para todos os momentos entre movimentos.',
  },
  {
    id: 6,
    name: 'Short Pace 5"',
    category: 'Calças',
    price: 249,
    image: 'photo-1515886657613-9f3515b0c78f',
    color: 'Azul noite',
    colorHex: '#34445a',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Leveza para ir além. Um short de corrida com corte pensado para se mover junto com você.',
  },
  {
    id: 7,
    name: 'Regata Air Knit',
    category: 'Camisetas',
    price: 169,
    image: 'photo-1503341455253-b2e723bb3dbb',
    color: 'Branco',
    colorHex: '#f0eee9',
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Respirabilidade e simplicidade em equilíbrio. Uma camada leve para os dias que pedem mais movimento.',
  },
  {
    id: 8,
    name: 'Legging Contour',
    category: 'Calças',
    price: 299,
    image: 'photo-1518611012118-696072aa579a',
    color: 'Preto',
    colorHex: '#242522',
    sizes: ['PP', 'P', 'M', 'G'],
    description: 'Ajuste confortável com liberdade total. Tecido de toque suave e cintura alta para acompanhar cada repetição.',
  },
]

const imageUrl = (id: string, width = 720) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`
const money = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

function Logo() {
  return <span className="wordmark">NORTH<span>/</span>FORM</span>
}

function Header({ cartCount }: { cartCount: number }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="announcement">FRETE GRÁTIS A PARTIR DE R$ 399 <span>—</span> SEU PRÓXIMO MOVIMENTO COMEÇA AQUI</div>
      <header className="site-header">
        <button className="icon-button mobile-menu-button" aria-label="Abrir menu" onClick={() => setMenuOpen(true)}>
          <Menu size={22} />
        </button>
        <Link to="/" className="logo-link" aria-label="NORTH/FORM início"><Logo /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <NavLink to="/catalogo">Novidades</NavLink>
          <NavLink to="/catalogo">Roupas</NavLink>
          <NavLink to="/catalogo">Coleções</NavLink>
          <a href="#movimento">Nossa essência</a>
        </nav>
        <div className="header-actions">
          <Link className="header-link" to="/catalogo">Buscar</Link>
          <Link className="header-link cart-link" to="/carrinho">Sacola <span className="cart-count">{cartCount}</span></Link>
        </div>
      </header>
      {menuOpen && (
        <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)}>
          <nav className="mobile-menu" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-menu-top"><Logo /><button className="icon-button" aria-label="Fechar menu" onClick={() => setMenuOpen(false)}><X /></button></div>
            <NavLink onClick={() => setMenuOpen(false)} to="/">Início <ArrowRight size={18} /></NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/catalogo">Novidades <ArrowRight size={18} /></NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/catalogo">Roupas <ArrowRight size={18} /></NavLink>
            <NavLink onClick={() => setMenuOpen(false)} to="/carrinho">Sacola ({cartCount}) <ArrowRight size={18} /></NavLink>
            <p>MOVE WITH INTENT.</p>
          </nav>
        </div>
      )}
    </>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand"><Logo /><p>Feito para acompanhar você.<br />Onde quer que o movimento leve.</p></div>
        <div className="footer-column"><span>EXPLORE</span><Link to="/catalogo">Novidades</Link><Link to="/catalogo">Roupas</Link><Link to="/catalogo">Coleções</Link></div>
        <div className="footer-column"><span>AJUDA</span><a href="#ajuda">Envios & entregas</a><a href="#ajuda">Trocas & devoluções</a><a href="#ajuda">Fale com a gente</a></div>
        <div className="footer-note"><span>NOTAS DE MOVIMENTO</span><p>Ideias, novidades e inspiração<br />para seguir em frente.</p><div className="newsletter-input"><span>Seu melhor e-mail</span><ArrowRight size={18} /></div></div>
      </div>
      <div className="footer-bottom"><span>© 2025 NORTH/FORM. CONCEITO FICTÍCIO.</span><span>FEITO PARA IR MAIS LONGE <ArrowUpRight size={12} /></span></div>
    </footer>
  )
}

function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const [liked, setLiked] = useState(false)
  return (
    <article className="product-card" style={{ animationDelay: `${index * 70}ms` }}>
      <div className="product-card-image-wrap">
        <Link to={`/produto/${product.id}`} className="product-card-image">
          <img src={imageUrl(product.image)} alt={product.name} loading="lazy" />
        </Link>
        {product.tag && <span className="product-tag">{product.tag}</span>}
        <button className={`favorite-button ${liked ? 'is-liked' : ''}`} aria-label={liked ? 'Remover dos favoritos' : 'Adicionar aos favoritos'} onClick={() => setLiked(!liked)}>
          <Heart size={17} fill={liked ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/produto/${product.id}`} className="quick-add">VER PRODUTO <ArrowUpRight size={14} /></Link>
      </div>
      <div className="product-card-meta"><div><Link to={`/produto/${product.id}`} className="product-name">{product.name}</Link><span className="product-category">{product.category}</span></div><span className="product-price">{money(product.price)}</span></div>
      <div className="swatch-row"><span className="color-swatch" style={{ backgroundColor: product.colorHex }} /><span className="swatch-label">{product.color}</span></div>
    </article>
  )
}

function SectionHeading({ eyebrow, title, action }: { eyebrow: string; title: string; action?: React.ReactNode }) {
  return <div className="section-heading"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div>
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero">
          <img className="hero-image" src={imageUrl('photo-1538805060514-97d9cc17730c', 1800)} alt="Atleta correndo ao ar livre" />
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-kicker"><span className="hero-dot" /> COLEÇÃO 01 — 2025</span>
            <h1>Encontre seu<br />próprio <em>ritmo.</em></h1>
            <p>Peças pensadas para o movimento.<br />Feitas para ir com você.</p>
            <Link to="/catalogo" className="button button-light">EXPLORE A COLEÇÃO <ArrowUpRight size={16} /></Link>
          </div>
          <div className="hero-bottom"><span>01 — 03</span><span>PERFORMANCE, SEM PRESSA.</span><a href="#categorias" aria-label="Rolar para baixo"><ArrowDown size={17} /></a></div>
        </section>

        <section className="category-section content-width" id="categorias">
          <SectionHeading eyebrow="ESCOLHA SEU CAMINHO" title="Feito para se mover." action={<Link className="text-link" to="/catalogo">VER TUDO <ArrowUpRight size={15} /></Link>} />
          <div className="category-grid">
            {[
              { title: 'Roupas leves', category: 'Camisetas', image: 'photo-1521572163474-6864f9cf17ab', number: '01' },
              { title: 'Camadas', category: 'Jaquetas', image: 'photo-1551028719-00167b16eac5', number: '02' },
              { title: 'Movimento', category: 'Calças', image: 'photo-1518611012118-696072aa579a', number: '03' },
            ].map((item) => (
              <Link to="/catalogo" key={item.title} className="category-card">
                <img src={imageUrl(item.image)} alt="" loading="lazy" />
                <div className="category-card-shade" />
                <span className="category-number">{item.number} / 03</span>
                <div className="category-card-label"><div><span>{item.category}</span><h3>{item.title}</h3></div><span className="round-arrow"><ArrowUpRight size={17} /></span></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="featured-section">
          <div className="content-width">
            <SectionHeading eyebrow="ESCOLHAS DA TEMPORADA" title="Em movimento." action={<Link className="text-link" to="/catalogo">VER TODOS OS PRODUTOS <ArrowUpRight size={15} /></Link>} />
            <div className="product-grid">
              {products.slice(0, 4).map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
          </div>
        </section>

        <section className="editorial" id="movimento">
          <div className="editorial-image"><img src={imageUrl('photo-1538805060514-97d9cc17730c', 1200)} alt="Corrida em um caminho aberto" loading="lazy" /><span>ESTUDO DE MOVIMENTO Nº 001</span></div>
          <div className="editorial-copy"><span className="eyebrow">NÃO É SOBRE CHEGAR.</span><h2>É sobre o que<br />acontece <em>no caminho.</em></h2><p>A gente acredita que movimento não precisa de linha de chegada. Só precisa de um primeiro passo. Cada peça NORTH/FORM é feita para esse instante — e para todos os que vêm depois.</p><Link className="text-link" to="/catalogo">CONHEÇA NOSSA ESSÊNCIA <ArrowUpRight size={15} /></Link><span className="editorial-mark">N/F — 001</span></div>
        </section>

        <section className="new-arrivals content-width">
          <div className="new-arrivals-banner"><div><span className="eyebrow">CHEGOU AGORA</span><h2>Novas formas.<br /><em>Mesmo propósito.</em></h2><Link to="/catalogo" className="button button-dark">DESCUBRA OS LANÇAMENTOS <ArrowUpRight size={16} /></Link></div><img src={imageUrl('photo-1515886657613-9f3515b0c78f', 960)} alt="Nova coleção de roupas esportivas" loading="lazy" /></div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function CatalogPage() {
  const [category, setCategory] = useState('Todas')
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [sort, setSort] = useState('Destaques')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const categories = ['Todas', 'Camisetas', 'Calças', 'Jaquetas', 'Tops', 'Moletons']
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) =>
      (category === 'Todas' || product.category === category) &&
      (!size || product.sizes.includes(size)) &&
      (!color || product.color === color),
    )
    if (sort === 'Menor preço') return filtered.sort((a, b) => a.price - b.price)
    if (sort === 'Maior preço') return filtered.sort((a, b) => b.price - a.price)
    return filtered
  }, [category, size, color, sort])

  return (
    <>
      <main className="catalog-page content-width">
        <div className="breadcrumbs"><Link to="/">INÍCIO</Link><span>/</span><span>ROUPAS</span></div>
        <div className="catalog-intro"><div><span className="eyebrow">PEÇAS PARA TODOS OS CAMINHOS</span><h1>Vista o <em>movimento.</em></h1></div><p>Essenciais com intenção. Feitos para acompanhar cada passo, cada pausa e cada recomeço.</p></div>
        <div className="catalog-toolbar">
          <div className="catalog-result">{visibleProducts.length} PRODUTOS</div>
          <button className={`filter-toggle ${filtersOpen ? 'active' : ''}`} onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal size={16} /> FILTROS <ChevronDown size={14} /></button>
          <label className="sort-select">ORDENAR POR <select value={sort} onChange={(event) => setSort(event.target.value)}><option>Destaques</option><option>Menor preço</option><option>Maior preço</option></select><ChevronDown size={14} /></label>
        </div>
        <div className="catalog-layout">
          <aside className={`filter-panel ${filtersOpen ? 'is-open' : ''}`}>
            <div className="filter-group"><span className="filter-heading">CATEGORIA</span>{categories.map((item) => <button key={item} className={`filter-option ${category === item ? 'selected' : ''}`} onClick={() => setCategory(item)}>{item}<span>{item === 'Todas' ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div>
            <div className="filter-group"><span className="filter-heading">TAMANHO</span><div className="filter-sizes">{['PP', 'P', 'M', 'G', 'GG'].map((item) => <button key={item} className={size === item ? 'selected' : ''} onClick={() => setSize(size === item ? '' : item)}>{item}</button>)}</div></div>
            <div className="filter-group"><span className="filter-heading">COR</span><div className="filter-colors">{[...new Map(products.map((product) => [product.color, product])).values()].map((product) => <button key={product.color} className={`filter-color ${color === product.color ? 'selected' : ''}`} onClick={() => setColor(color === product.color ? '' : product.color)}><span className="color-swatch" style={{ backgroundColor: product.colorHex }} />{product.color}</button>)}</div></div>
            {(size || color || category !== 'Todas') && <button className="clear-filters" onClick={() => { setSize(''); setColor(''); setCategory('Todas') }}>LIMPAR FILTROS <X size={13} /></button>}
          </aside>
          <div className="catalog-products">
            {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="empty-results"><span>NENHUMA PEÇA ENCONTRADA</span><p>Tente ajustar os filtros para encontrar seu próximo essencial.</p><button className="text-link" onClick={() => { setSize(''); setColor(''); setCategory('Todas') }}>LIMPAR FILTROS <ArrowRight size={15} /></button></div>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function ProductPage({ addToCart }: { addToCart: (product: Product, size: string) => void }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find((item) => item.id === Number(id))
  const [selectedSize, setSelectedSize] = useState('')
  const [added, setAdded] = useState(false)
  if (!product) return <main className="not-found"><span>PEÇA NÃO ENCONTRADA</span><Link to="/catalogo" className="button button-dark">VOLTAR ÀS PEÇAS <ArrowRight size={16} /></Link></main>

  const handleAdd = () => {
    if (!selectedSize) return
    addToCart(product, selectedSize)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <>
      <main className="product-page content-width">
        <div className="breadcrumbs"><Link to="/">INÍCIO</Link><span>/</span><Link to="/catalogo">ROUPAS</Link><span>/</span><span>{product.name.toUpperCase()}</span></div>
        <div className="product-detail">
          <div className="product-gallery"><div className="gallery-main"><img src={imageUrl(product.image, 1100)} alt={product.name} /></div><div className="gallery-secondary"><img src={imageUrl('photo-1515886657613-9f3515b0c78f', 700)} alt={`${product.name} em uso`} /><img src={imageUrl('photo-1529139574466-a303027c1d8b', 700)} alt="Detalhe da coleção" /></div></div>
          <div className="product-info"><span className="eyebrow">{product.category.toUpperCase()} — COLEÇÃO 01</span><h1>{product.name}</h1><p className="detail-price">{money(product.price)}</p><p className="detail-description">{product.description}</p><div className="detail-color"><span>COR</span><div><i className="color-swatch" style={{ backgroundColor: product.colorHex }} />{product.color}</div></div><div className="detail-size"><div><span>TAMANHO</span><button className="size-guide">GUIA DE TAMANHOS <ArrowUpRight size={12} /></button></div><div className="size-options">{product.sizes.map((item) => <button key={item} className={selectedSize === item ? 'selected' : ''} onClick={() => setSelectedSize(item)}>{item}</button>)}</div>{!selectedSize && <span className="size-hint">Selecione um tamanho para continuar.</span>}</div><button className={`button add-to-bag ${added ? 'added' : ''}`} onClick={handleAdd}>{added ? <><Check size={17} /> ADICIONADO À SACOLA</> : <>ADICIONAR À SACOLA <ArrowRight size={17} /></>}</button><p className="shipping-note"><span /> FRETE GRÁTIS A PARTIR DE R$ 399</p><div className="detail-accordion"><details><summary>DETALHES DA PEÇA <Plus size={16} /></summary><p>Design pensado para o movimento. Materiais selecionados com foco em conforto, durabilidade e versatilidade.</p></details><details><summary>ENVIO & DEVOLUÇÕES <Plus size={16} /></summary><p>Esta é uma demonstração de loja. Prazos, envios e devoluções não estão disponíveis nesta versão conceitual.</p></details></div><button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={15} /> VOLTAR</button></div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function CartPage({ items, updateQuantity, removeItem }: { items: CartItem[]; updateQuantity: (id: number, size: string, amount: number) => void; removeItem: (id: number, size: string) => void }) {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  return (
    <>
      <main className="cart-page content-width">
        <div className="breadcrumbs"><Link to="/">INÍCIO</Link><span>/</span><span>SACOLA</span></div>
        <div className="cart-heading"><div><span className="eyebrow">QUASE LÁ</span><h1>Sua sacola<span>.</span></h1></div><span>{items.length} {items.length === 1 ? 'ITEM' : 'ITENS'}</span></div>
        {items.length === 0 ? <div className="empty-cart"><span className="empty-cart-icon"><Menu size={24} /></span><h2>Um novo começo.</h2><p>Sua sacola ainda está vazia. Encontre algo que acompanhe seu próximo movimento.</p><Link className="button button-dark" to="/catalogo">EXPLORAR PEÇAS <ArrowRight size={16} /></Link></div> : (
          <div className="cart-layout"><div className="cart-items">{items.map((item) => <article className="cart-item" key={`${item.product.id}-${item.size}`}><Link to={`/produto/${item.product.id}`} className="cart-item-image"><img src={imageUrl(item.product.image, 420)} alt={item.product.name} /></Link><div className="cart-item-info"><div><Link to={`/produto/${item.product.id}`} className="cart-item-name">{item.product.name}</Link><span>{item.product.category}</span><span>Cor: {item.product.color}</span><span>Tamanho: {item.size}</span></div><div className="cart-item-bottom"><div className="quantity-control"><button aria-label="Diminuir quantidade" onClick={() => updateQuantity(item.product.id, item.size, -1)}><Minus size={13} /></button><span>{item.quantity}</span><button aria-label="Aumentar quantidade" onClick={() => updateQuantity(item.product.id, item.size, 1)}><Plus size={13} /></button></div><button className="remove-item" onClick={() => removeItem(item.product.id, item.size)}><Trash2 size={14} /> REMOVER</button></div></div><span className="cart-item-price">{money(item.product.price * item.quantity)}</span></article>)}</div>
            <aside className="order-summary"><span className="eyebrow">RESUMO DO PEDIDO</span><div className="summary-row"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="summary-row"><span>Entrega</span><span>{subtotal >= 399 ? 'Grátis' : 'Calculada depois'}</span></div><div className="summary-total"><span>Total</span><strong>{money(subtotal)}</strong></div><button className="button button-dark checkout-button" onClick={() => window.alert('Esta é uma demonstração visual. A finalização do pedido não está disponível.')}>CONTINUAR <ArrowRight size={16} /></button><p>Checkout demonstrativo. Nenhuma compra será realizada.</p></aside>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)

  const addToCart = (product: Product, size: string) => setCart((current) => {
    const existing = current.find((item) => item.product.id === product.id && item.size === size)
    if (existing) return current.map((item) => item.product.id === product.id && item.size === size ? { ...item, quantity: item.quantity + 1 } : item)
    return [...current, { product, size, quantity: 1 }]
  })
  const updateQuantity = (id: number, size: string, amount: number) => setCart((current) =>
    current.map((item) => item.product.id === id && item.size === size ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item),
  )
  const removeItem = (id: number, size: string) => setCart((current) => current.filter((item) => item.product.id !== id || item.size !== size))

  return (
    <div className="app-shell">
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalogo" element={<CatalogPage />} />
        <Route path="/produto/:id" element={<ProductPage addToCart={addToCart} />} />
        <Route path="/carrinho" element={<CartPage items={cart} updateQuantity={updateQuantity} removeItem={removeItem} />} />
        <Route path="*" element={<main className="not-found"><span>PÁGINA NÃO ENCONTRADA</span><Link to="/" className="button button-dark">VOLTAR AO INÍCIO <ArrowRight size={16} /></Link></main>} />
      </Routes>
    </div>
  )
}

export default App
