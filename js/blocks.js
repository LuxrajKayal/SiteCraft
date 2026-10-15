/* ==========================================================================
   SiteCraft Studio — Component Block Library & Starter Templates
   (js/blocks.js)
   ========================================================================== */

window.BLOCK_LIBRARY = {
  popupMenu: {
    title: "Pop-up Menu Bar",
    icon: "📂",
    category: "popup",
    html: `
      <nav class="sc-popup-nav" style="background:#0f172a;color:#ffffff;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;position:relative;font-family:Inter,sans-serif;">
        <div style="font-weight:800;font-size:18px;letter-spacing:-0.02em;">⚡ BrandMenu</div>
        <div style="display:flex;align-items:center;gap:20px;">
          <a href="#features" style="color:#cbd5e1;text-decoration:none;font-size:14px;">Features</a>
          <div class="sc-dropdown-wrapper" style="position:relative;display:inline-block;">
            <button type="button" onclick="const m=this.nextElementSibling; m.style.display=(m.style.display==='block'?'none':'block');" style="background:#6366f1;color:#ffffff;border:none;padding:9px 16px;border-radius:8px;font-weight:600;font-size:13px;cursor:pointer;">
              Pop-up Menu ▾
            </button>
            <div class="sc-popup-dropdown" style="display:none;position:absolute;right:0;top:44px;min-width:210px;background:#1e293b;color:#f8fafc;border:1px solid #334155;border-radius:10px;padding:8px;box-shadow:0 16px 36px rgba(0,0,0,0.45);z-index:50;">
              <a href="#product" style="display:block;padding:9px 12px;color:#f8fafc;text-decoration:none;border-radius:6px;font-size:13px;">🚀 Product Tour</a>
              <a href="#pricing" style="display:block;padding:9px 12px;color:#f8fafc;text-decoration:none;border-radius:6px;font-size:13px;">💎 Pricing Plans</a>
              <a href="#docs" style="display:block;padding:9px 12px;color:#f8fafc;text-decoration:none;border-radius:6px;font-size:13px;">📘 Documentation</a>
              <hr style="border:none;border-top:1px solid #334155;margin:6px 0;">
              <a href="#contact" style="display:block;padding:9px 12px;color:#fbbf24;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600;">✨ Book a Demo</a>
            </div>
          </div>
        </div>
      </nav>
    `
  },

  popupModal: {
    title: "Pop-up Modal",
    icon: "🪟",
    category: "popup",
    html: `
      <section style="padding:48px 32px;text-align:center;background:#f8fafc;border-bottom:1px solid #e2e8f0;">
        <h3 style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:10px;">Interactive Pop-up Modal Component</h3>
        <p style="color:#475569;font-size:15px;max-width:540px;margin:0 auto 20px;">Click the button below to trigger the customizable pop-up dialog box. Double-click any text inside the modal to customize it.</p>
        <button type="button" onclick="const d=this.parentElement.querySelector('.sc-modal-backdrop'); d.style.display=(d.style.display==='none'?'flex':'none');" style="background:#4f46e5;color:#ffffff;border:none;padding:12px 24px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 8px 20px rgba(79,70,229,0.3);">
          Open Pop-up Modal ✨
        </button>
        <div class="sc-modal-backdrop" style="display:flex;margin-top:24px;align-items:center;justify-content:center;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:14px;max-width:460px;width:100%;padding:28px;box-shadow:0 20px 45px rgba(15,23,42,0.16);text-align:left;position:relative;">
            <span style="display:inline-block;background:#eef2ff;color:#4f46e5;font-size:11px;font-weight:700;padding:4px 10px;border-radius:999px;margin-bottom:10px;">LIMITED OFFER POP-UP</span>
            <h4 style="font-size:20px;font-weight:800;color:#0f172a;margin-bottom:8px;">Get 40% Off Pro Plan Today!</h4>
            <p style="font-size:14px;color:#475569;line-height:1.6;margin-bottom:18px;">Subscribe to our newsletter and unlock all premium templates, custom domains, and instant code exports.</p>
            <div style="display:flex;gap:10px;">
              <button type="button" onclick="alert('Claimed! Welcome aboard 🎉')" style="flex:1;background:#10b981;color:#ffffff;border:none;padding:10px 16px;border-radius:8px;font-weight:700;cursor:pointer;">Claim Discount</button>
              <button type="button" onclick="this.closest('.sc-modal-backdrop').style.display='none';" style="background:#e2e8f0;color:#1e293b;border:none;padding:10px 16px;border-radius:8px;font-weight:600;cursor:pointer;">Close</button>
            </div>
          </div>
        </div>
      </section>
    `
  },

  navbar: {
    title: "Navbar",
    icon: "🧭",
    category: "core",
    html: `
      <header style="display:flex;align-items:center;justify-content:space-between;padding:20px 40px;background:#ffffff;border-bottom:1px solid #e2e8f0;">
        <div style="font-size:20px;font-weight:800;color:#0f172a;">SiteCraft<span style="color:#6366f1;">.io</span></div>
        <nav style="display:flex;gap:24px;align-items:center;">
          <a href="#features" style="color:#475569;text-decoration:none;font-weight:500;font-size:14px;">Features</a>
          <a href="#pricing" style="color:#475569;text-decoration:none;font-weight:500;font-size:14px;">Pricing</a>
          <a href="#contact" style="color:#475569;text-decoration:none;font-weight:500;font-size:14px;">Contact</a>
          <a href="#start" style="background:#6366f1;color:#ffffff;padding:9px 18px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Get Started</a>
        </nav>
      </header>
    `
  },

  hero: {
    title: "Hero Section",
    icon: "🚀",
    category: "core",
    html: `
      <section style="padding:84px 40px;text-align:center;background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);color:#ffffff;">
        <span style="display:inline-block;background:rgba(99,102,241,0.25);color:#a5b4fc;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:700;margin-bottom:18px;border:1px solid rgba(165,180,252,0.3);">NO-CODE VISUAL WEB BUILDER</span>
        <h1 style="font-size:48px;font-weight:800;max-width:780px;margin:0 auto 18px;line-height:1.15;letter-spacing:-0.02em;">Design & Launch Any Website Without Writing Code</h1>
        <p style="font-size:18px;color:#cbd5e1;max-width:620px;margin:0 auto 32px;line-height:1.6;">Drag and drop blocks, customize colors and fonts visually, or open the live Pop-up Inspector to tweak HTML, CSS, and JavaScript in real time.</p>
        <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
          <a href="#pricing" style="background:#6366f1;color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:16px;box-shadow:0 10px 25px rgba(99,102,241,0.4);">Start Building Free</a>
          <a href="#features" style="background:rgba(255,255,255,0.1);color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:16px;border:1px solid rgba(255,255,255,0.2);">Explore Features</a>
        </div>
      </section>
    `
  },

  features: {
    title: "Feature Grid",
    icon: "✨",
    category: "core",
    html: `
      <section id="features" style="padding:72px 40px;background:#ffffff;color:#0f172a;">
        <div style="text-align:center;max-width:640px;margin:0 auto 48px;">
          <h2 style="font-size:34px;font-weight:800;margin-bottom:12px;">Everything You Need to Build Fast</h2>
          <p style="color:#64748b;font-size:16px;">Click any card, heading, or button to customize styles or inspect its underlying code.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:1040px;margin:0 auto;">
          <div style="padding:28px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
            <div style="font-size:28px;margin-bottom:12px;">🎨</div>
            <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Visual Drag & Drop</h3>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;">Add pre-designed responsive sections and reorder them effortlessly on the visual canvas.</p>
          </div>
          <div style="padding:28px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
            <div style="font-size:28px;margin-bottom:12px;">⚡</div>
            <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Floating Pop-up Menu</h3>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;">Click or right-click any element to tweak colors, typography, and spacing from an instant floating toolbar.</p>
          </div>
          <div style="padding:28px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
            <div style="font-size:28px;margin-bottom:12px;">💻</div>
            <h3 style="font-size:19px;font-weight:700;margin-bottom:8px;">Live HTML/CSS/JS Inspector</h3>
            <p style="color:#475569;font-size:14.5px;line-height:1.6;">Inspect and live-edit the exact HTML, CSS, and JS of any selected element or export a clean standalone file.</p>
          </div>
        </div>
      </section>
    `
  },

  pricing: {
    title: "Pricing Cards",
    icon: "💎",
    category: "core",
    html: `
      <section id="pricing" style="padding:72px 40px;background:#f8fafc;color:#0f172a;">
        <div style="text-align:center;max-width:600px;margin:0 auto 44px;">
          <h2 style="font-size:34px;font-weight:800;margin-bottom:10px;">Simple, Transparent Pricing</h2>
          <p style="color:#64748b;font-size:16px;">Start free and upgrade as your project grows.</p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:880px;margin:0 auto;">
          <div style="background:#ffffff;padding:32px;border-radius:14px;border:1px solid #e2e8f0;">
            <h3 style="font-size:20px;font-weight:700;margin-bottom:6px;">Starter</h3>
            <div style="font-size:38px;font-weight:800;margin:14px 0;">$0<span style="font-size:15px;color:#64748b;font-weight:500;">/mo</span></div>
            <p style="color:#64748b;font-size:14px;margin-bottom:20px;">Ideal for personal sites and quick prototypes.</p>
            <button type="button" style="width:100%;padding:12px;border-radius:8px;border:1px solid #6366f1;background:transparent;color:#6366f1;font-weight:700;cursor:pointer;">Get Started</button>
          </div>
          <div style="background:#0f172a;color:#ffffff;padding:32px;border-radius:14px;border:2px solid #6366f1;box-shadow:0 20px 40px rgba(99,102,241,0.2);">
            <h3 style="font-size:20px;font-weight:700;margin-bottom:6px;color:#a5b4fc;">Pro Creator</h3>
            <div style="font-size:38px;font-weight:800;margin:14px 0;">$19<span style="font-size:15px;color:#94a3b8;font-weight:500;">/mo</span></div>
            <p style="color:#cbd5e1;font-size:14px;margin-bottom:20px;">Unlimited pages, custom domains, and full code export.</p>
            <button type="button" style="width:100%;padding:12px;border-radius:8px;border:none;background:#6366f1;color:#ffffff;font-weight:700;cursor:pointer;">Start Free Trial</button>
          </div>
        </div>
      </section>
    `
  },

  imageCard: {
    title: "Image Showcase",
    icon: "🖼️",
    category: "core",
    html: `
      <section style="padding:64px 40px;background:#ffffff;display:flex;align-items:center;gap:40px;flex-wrap:wrap;max-width:1040px;margin:0 auto;">
        <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" alt="Workspace" style="flex:1;min-width:280px;max-width:480px;border-radius:14px;box-shadow:0 15px 35px rgba(0,0,0,0.12);object-fit:cover;" />
        <div style="flex:1;min-width:280px;">
          <h2 style="font-size:30px;font-weight:800;color:#0f172a;margin-bottom:14px;">Built for Creators & Developers Alike</h2>
          <p style="color:#475569;font-size:16px;line-height:1.65;margin-bottom:22px;">Start visually without writing a single line of code, then open the Pop-up Inspector anytime to fine-tune semantic HTML5, modern CSS, and interactive JavaScript.</p>
          <a href="#contact" style="display:inline-block;background:#0f172a;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">Learn More →</a>
        </div>
      </section>
    `
  },

  contact: {
    title: "Contact Form",
    icon: "✉️",
    category: "core",
    html: `
      <section id="contact" style="padding:72px 40px;background:#f8fafc;color:#0f172a;">
        <div style="max-width:520px;margin:0 auto;background:#ffffff;padding:36px;border-radius:14px;border:1px solid #e2e8f0;box-shadow:0 10px 25px rgba(0,0,0,0.04);">
          <h2 style="font-size:26px;font-weight:800;margin-bottom:8px;">Get in Touch</h2>
          <p style="color:#64748b;font-size:14px;margin-bottom:22px;">Have questions? Send us a message and we'll respond promptly.</p>
          <form onsubmit="event.preventDefault(); alert('Thank you! Your message has been sent.');" style="display:flex;flex-direction:column;gap:14px;">
            <input type="text" placeholder="Your Name" style="padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;" />
            <input type="email" placeholder="you@example.com" style="padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;" />
            <textarea rows="4" placeholder="How can we help?" style="padding:12px 14px;border:1px solid #cbd5e1;border-radius:8px;font-size:14px;"></textarea>
            <button type="submit" style="background:#6366f1;color:#ffffff;border:none;padding:13px;border-radius:8px;font-weight:700;font-size:15px;cursor:pointer;">Send Message</button>
          </form>
        </div>
      </section>
    `
  },

  heading: {
    title: "Heading",
    icon: "🔤",
    category: "core",
    html: `
      <div style="padding:28px 40px;text-align:center;">
        <h2 style="font-size:32px;font-weight:800;color:#0f172a;">Double-Click to Edit This Heading</h2>
      </div>
    `
  },

  paragraph: {
    title: "Paragraph",
    icon: "📝",
    category: "core",
    html: `
      <div style="padding:18px 40px;max-width:760px;margin:0 auto;">
        <p style="font-size:16px;line-height:1.7;color:#334155;">Double-click this paragraph to edit the text directly on the canvas, or use the floating pop-up menu above to adjust colors, font size, alignment, and custom interactions.</p>
      </div>
    `
  },

  button: {
    title: "Action Button",
    icon: "🔘",
    category: "core",
    html: `
      <div style="padding:24px 40px;text-align:center;">
        <button type="button" style="background:#6366f1;color:#ffffff;border:none;padding:13px 28px;border-radius:8px;font-size:15px;font-weight:700;cursor:pointer;">Click Me</button>
      </div>
    `
  },

  divider: {
    title: "Divider Line",
    icon: "➖",
    category: "core",
    html: `
      <div style="padding:20px 40px;">
        <hr style="border:none;border-top:2px solid #e2e8f0;" />
      </div>
    `
  },

  footer: {
    title: "Footer",
    icon: "⚓",
    category: "core",
    html: `
      <footer style="padding:40px;background:#0f172a;color:#94a3b8;text-align:center;font-size:14px;">
        <p style="color:#ffffff;font-weight:700;margin-bottom:6px;">SiteCraft Studio</p>
        <p>© 2026 SiteCraft Studio. Built visually with zero coding required.</p>
      </footer>
    `
  }
};

window.STARTER_TEMPLATES = {
  landing: ["popupMenu", "hero", "features", "popupModal", "pricing", "contact", "footer"],
  portfolio: ["navbar", "hero", "imageCard", "features", "contact", "footer"],
  blank: []
};
