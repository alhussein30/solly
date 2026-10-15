import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Instagram, Link2, Minus, Plus, Search, Send, ShoppingBag, Sparkles, Zap } from "lucide-react";
import { categories, products } from "./catalog.js";

// Everything here is from @solly_egypt_ on Instagram (bio, logo, recent posts).
const WA = "201012205811";
const IG = "https://www.instagram.com/solly_egypt_/";
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

const ease = [0.22, 1, 0.36, 1];
const rise = (d = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.75, ease, delay: d },
});

function Wordmark({ light }) {
  return (
    <a href="#top" className={`wordmark ${light ? "light" : ""}`} dir="ltr">
      <ShoppingBag size={22} strokeWidth={2.2} />
      <span>SHEIN SOLLY</span>
    </a>
  );
}

function Loader({ onDone }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), matchMedia("(prefers-reduced-motion: reduce)").matches ? 300 : 1400);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
  }, [show]);
  return (
    <AnimatePresence onExitComplete={onDone}>
      {show && (
        <motion.div className="loader" exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.5 } }}>
          <motion.div
            className="loader-bag"
            initial={{ y: -40, rotate: -12, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
          >
            <ShoppingBag size={56} strokeWidth={1.8} />
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} dir="ltr">
            SHEIN SOLLY
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Hero({ ready }) {
  const show = (d) => ({ initial: { opacity: 0, y: 24 }, animate: ready ? { opacity: 1, y: 0 } : {}, transition: { duration: 0.8, ease, delay: d } });
  const card = (d, r) => ({
    initial: { opacity: 0, y: 60, rotate: 0 },
    animate: ready ? { opacity: 1, y: 0, rotate: r } : {},
    transition: { type: "spring", stiffness: 120, damping: 16, delay: d },
  });
  return (
    <section className="hero" id="top">
      <header className="top">
        <Wordmark light />
        <nav>
          <a href="#cats">الأقسام</a>
          <a href="#shop">المتجر</a>
          <a href="#order">بالأوردر</a>
          <a href="#reviews">آراء البنات</a>
        </nav>
        <a className="btn btn-white btn-sm" href={wa("هاي سولي 🩷")} target="_blank" rel="noreferrer">
          واتساب
        </a>
      </header>

      <div className="hero-grid">
        <div className="hero-copy">
          <motion.span className="chip" {...show(0.05)}>
            <Instagram size={15} /> 56.3 ألف متابعة على إنستجرام
          </motion.span>
          <motion.h1 {...show(0.12)}>
            قطع شي إن اللي بتحبيها..
            <br />
            <em>فوري أو بالأوردر</em>
          </motion.h1>
          <motion.p {...show(0.2)}>
            اختاري من القطع الموجودة عندنا فوري، أو ابعتيلنا لينك أي قطعة من شي إن واحنا نحجزهالك.
          </motion.p>
          <motion.div className="hero-actions" {...show(0.28)}>
            <a className="btn btn-white" href="#shop">
              <Zap size={18} /> شوفي الفوري
            </a>
            <a className="btn btn-outline" href="#order">
              <Link2 size={18} /> اطلبي بلينك
            </a>
          </motion.div>
        </div>

        <div className="collage" aria-hidden="true">
          <motion.figure className="polaroid p1" {...card(0.25, -6)}>
            <img src="./img/boots-black.webp" alt="" />
            <span className="sticker s-pink">فوري ⚡</span>
          </motion.figure>
          <motion.figure className="polaroid p2" {...card(0.4, 5)}>
            <img src="./img/blouse.webp" alt="" />
          </motion.figure>
          <motion.figure className="polaroid p3" {...card(0.55, -2)}>
            <img src="./img/sunglasses.webp" alt="" />
            <span className="sticker s-yellow">القطعة بـ 99 ج</span>
          </motion.figure>
        </div>
      </div>
      <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 90, 480 0, 720 30 S 1200 80, 1440 20 V80 H0 Z" fill="currentColor" />
      </svg>
    </section>
  );
}

function Paths() {
  return (
    <section className="section paths">
      <motion.div className="path path-fawry" {...rise()}>
        <span className="path-icon">
          <Zap size={26} />
        </span>
        <h2>فوري</h2>
        <p>قطع موجودة عندنا دلوقتي. شوفيها واطلبيها على طول.</p>
        <a href="#shop">شوفي القطع ←</a>
      </motion.div>
      <motion.div className="path path-order" {...rise(0.1)}>
        <span className="path-icon">
          <Link2 size={26} />
        </span>
        <h2>بالأوردر</h2>
        <p>عاجبك حاجة على شي إن؟ ابعتي اللينك والمقاس ونحجزهالك.</p>
        <a href="#order">ابعتي اللينك ←</a>
      </motion.div>
    </section>
  );
}

function Categories({ pick }) {
  return (
    <section className="section" id="cats">
      <motion.div className="head" {...rise()}>
        <span className="eyebrow">
          <ShoppingBag size={16} /> الأقسام
        </span>
        <h2>تسوّقي حسب القسم</h2>
      </motion.div>
      <div className="cats">
        {categories.map((c, i) => (
          <motion.button key={c.key} className="cat" onClick={() => pick(c.key)} {...rise(i * 0.06)}>
            <span className="cat-img">
              <img src={c.cover} alt="" loading="lazy" />
            </span>
            <strong>{c.label}</strong>
            <small>{products.filter((p) => p.cat === c.key).length} قطعة</small>
          </motion.button>
        ))}
      </div>
    </section>
  );
}

const PAGE = 12;

function Shop({ cat, setCat }) {
  const [onlyFawry, setOnlyFawry] = useState(false);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const list = products.filter(
    (p) => (cat === "all" || p.cat === cat) && (!onlyFawry || p.real) && (!q.trim() || p.name.includes(q.trim()))
  );
  const tabs = [{ key: "all", label: "الكل" }, ...categories];

  return (
    <section className="section" id="shop">
      <motion.div className="head" {...rise()}>
        <span className="eyebrow">
          <Zap size={16} /> المتجر
        </span>
        <h2>اختاري اللي عاجبك</h2>
        <p>القطع اللي عليها «فوري» موجودة عندنا دلوقتي، والباقي اسألي عليه أو اطلبيه بلينك.</p>
      </motion.div>

      <div className="shop-bar">
        <div className="tabs" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={cat === t.key}
              className={cat === t.key ? "on" : ""}
              onClick={() => {
                setCat(t.key);
                setShown(PAGE);
              }}
            >
              {cat === t.key && <motion.span layoutId="tab" className="tab-bg" transition={{ type: "spring", damping: 28, stiffness: 380 }} />}
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>
        <div className="shop-tools">
          <label className="search">
            <Search size={18} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="دوّري على قطعة…" aria-label="بحث في المنتجات" />
          </label>
          <button className={`toggle ${onlyFawry ? "on" : ""}`} aria-pressed={onlyFawry} onClick={() => setOnlyFawry((v) => !v)}>
            <Zap size={16} /> فوري بس
          </button>
        </div>
      </div>

      <motion.div className="grid" layout>
        <AnimatePresence mode="popLayout">
          {list.slice(0, shown).map((p) => (
            <motion.article
              key={p.name}
              className="product"
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease }}
            >
              <div className="product-img">
                <img src={p.img} alt={p.name} loading="lazy" />
                {p.real && <span className="sticker s-pink tag-fawry">فوري ⚡</span>}
                {p.price && <span className="sticker s-yellow">{p.price}</span>}
              </div>
              <h3>{p.name}</h3>
              <div className="product-foot">
                <span>{p.price || "اسألي على السعر"}</span>
                <a className="btn btn-berry btn-sm" href={wa(`هاي سولي 🩷 عايزة: ${p.name}`)} target="_blank" rel="noreferrer">
                  اطلبي
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <p className="empty">
          مش لاقية اللي بتدوري عليه؟ <a href="#order">ابعتي لينكه من شي إن</a>
        </p>
      )}
      {shown < list.length && (
        <button className="more" onClick={() => setShown((n) => n + PAGE)}>
          اعرضي أكتر ({list.length - shown})
        </button>
      )}
    </section>
  );
}

const emptyItem = () => ({ link: "", size: "", color: "" });

function OrderForm() {
  const [items, setItems] = useState([emptyItem()]);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  const set = (i, k) => (e) => setItems((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: e.target.value } : x)));

  const submit = (e) => {
    e.preventDefault();
    const filled = items.filter((x) => x.link.trim());
    if (!filled.length) return setErr("حطي لينك قطعة واحدة على الأقل.");
    if (filled.some((x) => !/^https?:\/\/\S+$/i.test(x.link.trim()))) return setErr("اللينك لازم يبدأ بـ https://");
    setErr("");
    const lines = filled.map((x, i) => `${i + 1}) ${x.link.trim()}${x.size ? `\n   المقاس: ${x.size}` : ""}${x.color ? `\n   اللون: ${x.color}` : ""}`);
    const text = [`هاي سولي 🩷 عايزة أحجز بالأوردر${name ? ` — ${name}` : ""}:`, "", ...lines].join("\n");
    window.open(wa(text), "_blank", "noopener");
  };

  return (
    <section className="section" id="order">
      <div className="order">
        <motion.div className="order-copy" {...rise()}>
          <span className="eyebrow light">
            <Link2 size={16} /> بالأوردر
          </span>
          <h2>شفتي حاجة على شي إن؟</h2>
          <p>حطي لينك القطعة والمقاس واللون، ودوسي إرسال. الطلب هيتفتح على واتساب جاهز، وسولي ترد عليكي بالتفاصيل.</p>
          <ol>
            <li>افتحي القطعة على تطبيق شي إن وانسخي اللينك</li>
            <li>الصقيه هنا مع المقاس واللون</li>
            <li>ابعتيه على واتساب بضغطة</li>
          </ol>
        </motion.div>

        <motion.form className="order-form" onSubmit={submit} noValidate {...rise(0.1)}>
          <AnimatePresence initial={false}>
            {items.map((x, i) => (
              <motion.fieldset
                key={i}
                className="item"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <legend>القطعة {i + 1}</legend>
                <input
                  type="url"
                  dir="ltr"
                  inputMode="url"
                  placeholder="https://..."
                  value={x.link}
                  onChange={set(i, "link")}
                  aria-label={`لينك القطعة ${i + 1}`}
                />
                <div className="row">
                  <input placeholder="المقاس" value={x.size} onChange={set(i, "size")} aria-label="المقاس" />
                  <input placeholder="اللون" value={x.color} onChange={set(i, "color")} aria-label="اللون" />
                  {items.length > 1 && (
                    <button type="button" className="icon-btn" aria-label="حذف القطعة" onClick={() => setItems((xs) => xs.filter((_, j) => j !== i))}>
                      <Minus size={18} />
                    </button>
                  )}
                </div>
              </motion.fieldset>
            ))}
          </AnimatePresence>
          <button type="button" className="add" onClick={() => setItems((xs) => [...xs, emptyItem()])}>
            <Plus size={18} /> ضيفي قطعة تانية
          </button>
          <input className="name" placeholder="اسمك (اختياري)" value={name} onChange={(e) => setName(e.target.value)} aria-label="اسمك" />
          {err && (
            <p className="err" role="alert">
              {err}
            </p>
          )}
          <button type="submit" className="btn btn-berry btn-block">
            <Send size={18} /> ابعتي الطلب على واتساب
          </button>
        </motion.form>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section" id="reviews">
      <motion.div className="reviews" {...rise()}>
        <Sparkles size={30} className="reviews-icon" />
        <h2>آراء البنات</h2>
        <p>صور ورسايل البنات اللي اشتروا من سولي متجمعة في هايلايت «رفيو» و«فيد باك» على إنستجرام.</p>
        <a className="btn btn-berry" href={IG} target="_blank" rel="noreferrer">
          <Instagram size={18} /> شوفي الرفيوهات
        </a>
      </motion.div>
    </section>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [cat, setCat] = useState("all");
  const pick = (k) => {
    setCat(k);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setReady(true)} />
      <Hero ready={ready} />
      <main>
        <Paths />
        <Categories pick={pick} />
        <Shop cat={cat} setCat={setCat} />
        <OrderForm />
        <Reviews />
      </main>
      <footer className="footer">
        <Wordmark />
        <div className="footer-links">
          <a href={IG} target="_blank" rel="noreferrer">
            @solly_egypt_
          </a>
          <a href={wa("هاي سولي 🩷")} target="_blank" rel="noreferrer" dir="ltr">
            0101 220 5811
          </a>
        </div>
        <small>متجر مستقل لبيع منتجات شي إن في مصر، غير تابع لشركة SHEIN.</small>
      </footer>
      <motion.a
        className="wa-float"
        href={wa("هاي سولي 🩷")}
        target="_blank"
        rel="noreferrer"
        aria-label="واتساب"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 16 }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
          <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.56.94.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.24 9.42-9.44 9.42m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6-1.57a11.3 11.3 0 0 0 5.43 1.38c6.26 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.32-8.02" />
        </svg>
      </motion.a>
    </MotionConfig>
  );
}
